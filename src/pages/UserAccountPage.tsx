import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utilities/AuthContext';
import { useTickets, Ticket } from '../utilities/ticketService';

const UserAccountPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { getUserTickets } = useTickets();

  // Demo data for presentation
  const demoUser = {
    name: 'Demo User',
    email: 'demo@example.com'
  };

  const currentUser = user || demoUser;
  const tickets = getUserTickets(); // Now gets real tickets from localStorage
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">My Account</h1>
          <p className="text-gray-600">Welcome, {currentUser.name}</p>
          <nav className="mt-4">
            <Link to="/" className="text-green-600 hover:text-green-800">Home</Link>
            {user && (
              <button onClick={logout} className="ml-4 text-red-600 hover:text-red-800">
                Sign Out
              </button>
            )}
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Account Menu</h2>
              <nav className="space-y-2">
                <a href="#tickets" className="block text-green-600 font-medium">My Tickets</a>
                <a href="#profile" className="block text-gray-600 hover:text-green-600">Profile Settings</a>
                <a href="#preferences" className="block text-gray-600 hover:text-green-600">Preferences</a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* My Tickets */}
            <section id="tickets" className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">My Tickets</h2>
              <div className="space-y-4">
                {tickets.length > 0 ? tickets.map(ticket => (
                  <div key={ticket.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{ticket.eventTitle}</h3>
                      <span className={`px-2 py-1 rounded text-sm font-medium ${
                        ticket.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{new Date(ticket.eventDate).toLocaleDateString()}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Type: {ticket.ticketType} | Quantity: {ticket.quantity}</span>
                      <span className="text-green-600 font-semibold">KSH {ticket.totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You haven't purchased any tickets yet.</p>
                    <Link to="/events" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md">
                      Browse Events
                    </Link>
                  </div>
                )}
              </div>
            </section>

            {/* Profile Settings Placeholder */}
            <section id="profile" className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Profile Settings</h2>
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Profile settings functionality coming soon...</p>
                <p className="text-gray-400 text-sm mt-2">Update your personal information and preferences</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccountPage;