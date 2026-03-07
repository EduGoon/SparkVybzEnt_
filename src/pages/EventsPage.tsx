import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../utilities/types';
import * as eventService from '../services/eventService';

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [dateFilter, setDateFilter] = useState<string>('');

  useEffect(() => {
    const load = async () => {
      try {
        const resp = await eventService.listEvents();
        setEvents(resp.data);
        setFilteredEvents(resp.data);
      } catch (err) {
        console.error('Failed to load events', err);
      }
    };
    load();
  }, []);

  const categories = ['All', ...Array.from(new Set(events.map(e => e.category)))];

  const handleCategoryFilter = (category: string) => {
    setCategoryFilter(category);
    filterEvents(category, dateFilter);
  };

  const handleDateFilter = (date: string) => {
    setDateFilter(date);
    filterEvents(categoryFilter, date);
  };

  const filterEvents = (category: string, date: string) => {
    let filtered = events;
    if (category !== 'All') {
      filtered = filtered.filter(e => e.category === category);
    }
    if (date) {
      filtered = filtered.filter(e => {
        const eventDate = e.startTime ?? e.date ?? '';
        return eventDate >= date;
      });
    }
    setFilteredEvents(filtered);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0d14', color: '#fff', fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400&display=swap');
        * { box-sizing: border-box; }
        .gold { color: #f0c040; }
        .green { color: #22c55e; }
        .page-title { font-size: 32px; font-family: 'Playfair Display', serif; font-weight: 700; color: #22c55e; margin-bottom: 12px; }
        .filter-label { font-size: 14px; color: #fff; margin-bottom: 4px; }
        .filter-select, .filter-input { border-radius: 8px; border: 1px solid #222; padding: 10px 16px; font-size: 15px; background: #111827; color: #fff; font-family: 'DM Sans', sans-serif; }
        .event-card { background: #111827; border-radius: 14px; box-shadow: 0 6px 24px rgba(0,0,0,0.45); overflow: hidden; transition: box-shadow 0.25s; }
        .event-card:hover { box-shadow: 0 20px 50px rgba(0,0,0,0.65), 0 0 0 1.5px #22c55e; }
        .event-img { width: 100%; height: 200px; object-fit: cover; border-bottom: 1px solid #222; }
        .event-title { font-size: 22px; font-family: 'Playfair Display', serif; font-weight: 700; color: #f0c040; margin-bottom: 6px; }
        .event-venue { font-size: 15px; color: #22c55e; margin-bottom: 2px; }
        .event-date { font-size: 14px; color: #fff; margin-bottom: 8px; }
        .event-price { font-size: 16px; color: #22c55e; font-weight: 600; }
        .view-btn { background:#22c55e; color:#0a0d14; border:none; border-radius:8px; padding:10px 22px; font-size:15px; font-weight:600; cursor:pointer; transition:opacity 0.2s,transform 0.15s; font-family:'DM Sans',sans-serif; margin-left: 8px; }
        .view-btn:hover { opacity:0.85; transform:translateY(-1px); }
      `}</style>
      {/* Header */}
      <header style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(10,13,20,0.96)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1060, margin: '0 auto', padding: '0 24px', height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="page-title">Events</span>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link to="/" className="ghost-btn">Home</Link>
          </nav>
        </div>
      </header>
      {/* Filters */}
      <section style={{ background: '#111827', padding: '24px 0', borderBottom: '1px solid #222' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <label className="filter-label">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => handleCategoryFilter(e.target.value)}
                className="filter-select"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="filter-label">Date From</label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => handleDateFilter(e.target.value)}
                className="filter-input"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Events Grid */}
      <section style={{ padding: '40px 0' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {filteredEvents.map(event => {
              const firstPrice = event.ticketTypes?.[0]?.price;
              const eventStart = event.startTime ?? event.date;
              const venue = event.venue ?? event.location;
              return (
                <div key={event.id} className="event-card">
                  <img src={event.imageUrl} alt={event.title} className="event-img" />
                  <div style={{ padding: '18px' }}>
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-venue">{venue}</p>
                    <p className="event-date">
                      {eventStart
                        ? new Date(eventStart).toLocaleString(undefined, {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : 'Date TBD'}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                      {firstPrice != null && (
                        <span className="event-price">
                          KSH {firstPrice.toLocaleString()} {event.ticketTypes.length > 1 ? 'and up' : ''}
                        </span>
                      )}
                      <Link
                        to={`/events/${event.id}`}
                        className="view-btn"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {filteredEvents.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <p style={{ color: '#fff', fontSize: 16 }}>No events found matching your filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default EventsPage;