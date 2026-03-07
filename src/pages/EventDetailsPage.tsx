import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../utilities/AuthContext';
import * as ticketService from '../services/ticketService';
import * as eventService from '../services/eventService';
import { Event } from '../utilities/types';

const EventDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedTickets, setSelectedTickets] = useState<{ [key: string]: number }>({});
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const load = async () => {
      if (id) {
        try {
          const e = await eventService.getEvent(id);
          setEvent(e);
        } catch (err) {
          console.error('Failed to load event', err);
        }
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const ticketTypes = (event?.ticketTypes ?? []).map(tt => ({
    id: tt.id,
    type: tt.name,
    price: tt.price,
    available: tt.quantity - tt.sold,
  }));

  const handleTicketChange = (id: string, quantity: number) => {
    setSelectedTickets(prev => ({ ...prev, [id]: quantity }));
  };

  const totalPrice = Object.entries(selectedTickets).reduce((sum, [id, qty]) => {
    const ticketType = ticketTypes.find(t => t.id === id);
    return sum + (ticketType ? ticketType.price * qty : 0);
  }, 0);

  const handlePurchase = async () => {
    if (!user || !event) {
      return;
    }

    try {
      const requests = Object.entries(selectedTickets).map(([ticketTypeId, qty]) =>
        ticketService.purchaseTickets(event.id, ticketTypeId, qty)
      );
      await Promise.all(requests);
      setPurchaseSuccess(true);
      setSelectedTickets({});
    } catch (err) {
      console.error('Purchase failed', err);
      alert('Purchase failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading event...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Event not found.</div>
      </div>
    );
  }

  const eventStart = event.startTime ?? event.date;

  if (purchaseSuccess) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0d14', color: '#fff', fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400&display=swap');
          * { box-sizing: border-box; }
          .gold { color: #f0c040; }
          .green { color: #22c55e; }
          .success-icon { font-size: 38px; color: #22c55e; margin-bottom: 12px; }
          .success-title { font-size: 22px; font-family: 'Playfair Display', serif; font-weight: 700; color: #f0c040; margin-bottom: 8px; }
          .success-btn { background:#f0c040; color:#0a0d14; border:none; border-radius:8px; padding:10px 22px; font-size:15px; font-weight:600; cursor:pointer; transition:opacity 0.2s,transform 0.15s; font-family:'DM Sans',sans-serif; margin-bottom: 8px; }
          .success-btn:hover { opacity:0.85; transform:translateY(-1px); }
        `}</style>
        <div style={{ maxWidth: 420, margin: '0 auto', background: '#111827', borderRadius: 14, boxShadow: '0 6px 24px rgba(0,0,0,0.45)', padding: 32, textAlign: 'center' }}>
          <div className="success-icon">✓</div>
          <h2 className="success-title">Purchase Successful!</h2>
          <p style={{ color: '#fff', marginBottom: 18 }}>Your tickets have been added to your account.</p>
          <div>
            <Link to="/account" className="success-btn" style={{ display: 'block', marginBottom: 8 }}>View My Tickets</Link>
            <Link to="/events" className="ghost-btn" style={{ display: 'block' }}>Browse More Events</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0d14', color: '#fff', fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400&display=swap');
        * { box-sizing: border-box; }
        .gold { color: #f0c040; }
        .green { color: #22c55e; }
        .page-title { font-size: 28px; font-family: 'Playfair Display', serif; font-weight: 700; color: #22c55e; margin-bottom: 8px; }
        .event-banner { width: 100%; height: 260px; object-fit: cover; border-bottom: 1px solid #222; }
        .event-title { font-size: 26px; font-family: 'Playfair Display', serif; font-weight: 700; color: #f0c040; margin-bottom: 8px; }
        .event-meta { display: flex; flex-wrap: wrap; gap: 12px; font-size: 15px; color: #fff; margin-bottom: 8px; }
        .event-category { background: #22c55e; color: #0a0d14; border-radius: 6px; padding: 2px 10px; font-size: 14px; font-weight: 600; }
        .event-details { padding: 32px 0; }
        .event-section-title { font-size: 18px; font-family: 'Playfair Display', serif; font-weight: 700; color: #22c55e; margin-bottom: 8px; }
        .event-desc { color: #fff; margin-bottom: 18px; line-height: 1.6; }
        .event-location { color: #22c55e; margin-bottom: 6px; }
        .event-schedule { color: #fff; margin-bottom: 12px; }
        .ticket-card { background: #111827; border-radius: 12px; box-shadow: 0 6px 24px rgba(0,0,0,0.45); padding: 18px; margin-bottom: 18px; }
        .ticket-type { font-size: 15px; color: #f0c040; font-weight: 600; }
        .ticket-price { font-size: 15px; color: #22c55e; font-weight: 600; margin-left: 8px; }
        .ticket-available { font-size: 13px; color: #fff; margin-bottom: 6px; }
        .ticket-select { border-radius: 8px; border: 1px solid #222; padding: 6px 12px; font-size: 14px; background: #0a0d14; color: #fff; font-family: 'DM Sans', sans-serif; }
        .buy-btn { background:#22c55e; color:#0a0d14; border:none; border-radius:8px; padding:10px 22px; font-size:15px; font-weight:600; cursor:pointer; transition:opacity 0.2s,transform 0.15s; font-family:'DM Sans',sans-serif; margin-top: 12px; width: 100%; }
        .buy-btn:hover { opacity:0.85; transform:translateY(-1px); }
      `}</style>
      {/* Header */}
      <header style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(10,13,20,0.96)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1060, margin: '0 auto', padding: '0 24px', height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <nav>
            <Link to="/events" className="ghost-btn">&larr; Back to Events</Link>
          </nav>
        </div>
      </header>
      {/* Event Banner - Larger image with overlayed name and category */}
      <section className="event-banner-wrap" style={{ position: 'relative', marginBottom: 0 }}>
        <img
          src={event.imageUrl}
          alt={event.title}
          className="event-banner"
          style={{
            width: '100%',
            height: '340px', // bigger image
            objectFit: 'cover',
            borderBottom: '1px solid #222',
            borderRadius: '0 0 24px 24px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '340px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            padding: '32px 36px',
            background: 'linear-gradient(180deg, rgba(10,13,20,0.12) 0%, rgba(10,13,20,0.55) 80%)',
            zIndex: 2,
          }}
        >
          <h1
            style={{
              fontSize: '2.2rem',
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '8px',
              textShadow: '0 2px 12px rgba(0,0,0,0.45)',
            }}
          >
            {event.title}
          </h1>
          <span
            style={{
              background: '#22c55e',
              color: '#0a0d14',
              borderRadius: '8px',
              padding: '6px 18px',
              fontSize: '1.1rem',
              fontWeight: 600,
              boxShadow: '0 2px 8px rgba(34,197,94,0.15)',
              marginBottom: '16px',
              letterSpacing: '0.02em',
            }}
          >
            {event.category}
          </span>
        </div>
      </section>
      {/* Event Details */}
      <section className="event-details">
        <div style={{ maxWidth: 1060, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32 }}>
            {/* Main Content */}
            <div>
              <h2 className="event-section-title">About This Event</h2>
              <p className="event-desc">{event.description}</p>
              <h3 className="event-section-title">Location & Schedule</h3>
              <p className="event-location">{event.venue ?? event.location}</p>
              <p className="event-schedule">
                {event.startTime && (
                  <>Starts: {new Date(event.startTime).toLocaleString()}</>
                )}
                {event.endTime && (
                  <> • Ends: {new Date(event.endTime).toLocaleString()}</>
                )}
              </p>
            </div>
            {/* Ticket Selection */}
            <div>
              <h3 className="event-section-title">Get Tickets</h3>
              {ticketTypes.map(ticket => (
                <div key={ticket.id} className="ticket-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span className="ticket-type">{ticket.type}</span>
                    <span className="ticket-price">KSH {(ticket.price ?? 0).toLocaleString()}</span>
                  </div>
                  <p className="ticket-available">{ticket.available ?? 0} tickets available</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <label style={{ fontSize: 13 }}>Quantity:</label>
                    <select
                      value={selectedTickets[ticket.id] || 0}
                      onChange={(e) => handleTicketChange(ticket.id, parseInt(e.target.value))}
                      className="ticket-select"
                    >
                      {[...Array(11).keys()].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
              {totalPrice > 0 && (
                <div style={{ marginTop: 18, borderTop: '1px solid #222', paddingTop: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>Total:</span>
                    <span style={{ fontSize: 17, fontWeight: 700, color: '#22c55e' }}>KSH {(totalPrice ?? 0).toLocaleString()}</span>
                  </div>
                  <button
                    onClick={handlePurchase}
                    disabled={!user}
                    className="buy-btn"
                  >
                    {user ? 'Buy Tickets' : 'Sign In to Buy Tickets'}
                  </button>
                  {!user && (
                    <p style={{ fontSize: 13, color: '#fff', marginTop: 6 }}>Please sign in to purchase tickets.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetailsPage;