import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  category: string;
  price: number;
  image: string;
}

const mockEvents: Event[] = [
  { id: 1, title: 'Nairobi Music Festival', date: '2023-12-15', location: 'Nairobi', category: 'Music', price: 2500, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop' },
  { id: 2, title: 'Tech Conference Nairobi', date: '2024-01-20', location: 'Nairobi', category: 'Technology', price: 5000, image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop' },
  { id: 3, title: 'Comedy Night', date: '2023-11-30', location: 'Mombasa', category: 'Comedy', price: 1500, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop' },
  { id: 4, title: 'Art Exhibition', date: '2023-12-05', location: 'Kisumu', category: 'Art', price: 1000, image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop' },
  { id: 5, title: 'Sports Tournament', date: '2024-02-10', location: 'Eldoret', category: 'Sports', price: 3000, image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop' },
  { id: 6, title: 'Food Festival', date: '2023-12-22', location: 'Nakuru', category: 'Food', price: 2000, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop' },
];

const EventsPage: React.FC = () => {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [dateFilter, setDateFilter] = useState<string>('');

  const categories = ['All', ...Array.from(new Set(mockEvents.map(e => e.category)))];

  const handleCategoryFilter = (category: string) => {
    setCategoryFilter(category);
    filterEvents(category, dateFilter);
  };

  const handleDateFilter = (date: string) => {
    setDateFilter(date);
    filterEvents(categoryFilter, date);
  };

  const filterEvents = (category: string, date: string) => {
    let filtered = mockEvents;
    if (category !== 'All') {
      filtered = filtered.filter(e => e.category === category);
    }
    if (date) {
      filtered = filtered.filter(e => e.date >= date);
    }
    setFilteredEvents(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Events</h1>
          <nav className="mt-4">
            <Link to="/" className="text-green-600 hover:text-green-800">Home</Link>
          </nav>
        </div>
      </header>

      {/* Filters */}
      <section className="bg-white py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => handleCategoryFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => handleDateFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{event.title}</h3>
                  <p className="text-gray-600 mb-2">{event.location}</p>
                  <p className="text-sm text-gray-500 mb-4">{new Date(event.date).toLocaleDateString()}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 font-semibold">KSH {event.price.toLocaleString()}</span>
                    <Link
                      to={`/events/${event.id}`}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No events found matching your filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default EventsPage;