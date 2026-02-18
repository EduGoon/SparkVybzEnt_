import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utilities/AuthContext';
import { useTickets } from '../utilities/ticketService';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  category: string;
  price: number;
  image: string;
  description: string;
  venue: string;
}

const mockEvent: Event = {
  id: 1,
  title: 'Nairobi Music Festival',
  date: '2023-12-15',
  location: 'Nairobi',
  category: 'Music',
  price: 2500,
  image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
  description: 'Experience the best of Kenyan music and culture at the Nairobi Music Festival. Featuring top artists from across the country, this event promises an unforgettable night of rhythm, melody, and celebration. Join us for a spectacular showcase of talent that represents the vibrant music scene of Kenya.',
  venue: 'Sarit Centre, Westlands'
};

const EventDetailsPage: React.FC = () => {
  // const { id } = useParams<{ id: string }>(); // Not used in demo - using mock event
  const [selectedTickets, setSelectedTickets] = useState<{ [key: string]: number }>({});
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const { user } = useAuth();
  const { addTicket } = useTickets();

  // In a real app, fetch event by id
  const event = mockEvent; // Assume we have the event

  const ticketTypes = [
    { type: 'General Admission', price: event.price, available: 500 },
    { type: 'VIP', price: event.price * 2, available: 100 },
    { type: 'Premium', price: event.price * 1.5, available: 200 },
  ];

  const handleTicketChange = (type: string, quantity: number) => {
    setSelectedTickets(prev => ({ ...prev, [type]: quantity }));
  };

  const totalPrice = Object.entries(selectedTickets).reduce((sum, [type, qty]) => {
    const ticketType = ticketTypes.find(t => t.type === type);
    return sum + (ticketType ? ticketType.price * qty : 0);
  }, 0);

  const handlePurchase = () => {
    // Allow purchasing in demo mode (no user check needed)

    // Add tickets to user's account (or demo account)
    Object.entries(selectedTickets).forEach(([type, qty]) => {
      if (qty > 0) {
        const ticketType = ticketTypes.find(t => t.type === type);
        if (ticketType) {
          addTicket({
            eventId: event.id,
            eventTitle: event.title,
            eventDate: event.date,
            ticketType: type,
            quantity: qty,
            totalPrice: ticketType.price * qty,
            status: 'confirmed'
          });
        }
      }
    });

    setPurchaseSuccess(true);
    setSelectedTickets({});
  };

  if (purchaseSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Purchase Successful!</h2>
          <p className="text-gray-600 mb-6">Your tickets have been added to your account.</p>
          <div className="space-y-3">
            <Link
              to="/account"
              className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-md transition duration-300"
            >
              View My Tickets
            </Link>
            <Link
              to="/events"
              className="block w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-4 rounded-md transition duration-300"
            >
              Browse More Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <nav className="mb-4">
            <Link to="/events" className="text-green-600 hover:text-green-800">&larr; Back to Events</Link>
          </nav>
        </div>
      </header>

      {/* Event Banner */}
      <section className="relative">
        <img src={event.image} alt={event.title} className="w-full h-64 md:h-96 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
          <div className="container mx-auto px-4 py-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
            <div className="flex flex-wrap gap-4 text-lg">
              <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>{event.venue}, {event.location}</span>
              <span className="bg-yellow-500 text-black px-2 py-1 rounded">{event.category}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">About This Event</h2>
              <p className="text-gray-700 leading-relaxed mb-8">{event.description}</p>

              <h3 className="text-xl font-semibold mb-4 text-gray-800">Venue Information</h3>
              <p className="text-gray-600">{event.venue}</p>
              <p className="text-gray-600">{event.location}, Kenya</p>
            </div>

            {/* Ticket Selection */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">Get Tickets</h3>
              {ticketTypes.map(ticket => (
                <div key={ticket.type} className="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{ticket.type}</span>
                    <span className="text-green-600 font-semibold">KSH {ticket.price.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{ticket.available} tickets available</p>
                  <div className="flex items-center gap-2">
                    <label className="text-sm">Quantity:</label>
                    <select
                      value={selectedTickets[ticket.type] || 0}
                      onChange={(e) => handleTicketChange(ticket.type, parseInt(e.target.value))}
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      {[...Array(11).keys()].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}

              {totalPrice > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-xl font-bold text-green-600">KSH {totalPrice.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={handlePurchase}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
                  >
                    {user ? 'Buy Tickets' : 'Sign In to Buy Tickets'}
                  </button>
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