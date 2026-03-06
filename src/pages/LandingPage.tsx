import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utilities/AuthContext';

const LandingPage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-600">SparkVybzEnt</h1>
          <nav className="flex items-center space-x-4">
            <Link to="/events" className="text-gray-600 hover:text-green-600">Events</Link>
            {user ? (
              <>
                <Link to="/account" className="text-gray-600 hover:text-green-600">My Account</Link>
                {user.role === 'ADMIN' && (
                  <Link to="/admin" className="text-green-600 hover:text-green-800 font-medium">Admin</Link>
                )}
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="text-gray-600 hover:text-green-600">Sign In</Link>
                <Link to="/signup" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">Sign Up</Link>
              </>
            )}
          </nav>
        </div>
      </header>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to SparkVybzEnt</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Kenya's premier event management and ticketing platform. Discover amazing events, book tickets, and create unforgettable experiences.
          </p>
          <div className="space-x-4">
            <Link
              to="/events"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              Browse Events
            </Link>
            <Link
              to="/signup"
              className="border-2 border-white text-white hover:bg-white hover:text-green-800 font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mock featured events */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop" alt="Nairobi Music Festival" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Nairobi Music Festival</h3>
                <p className="text-gray-600 mb-4">Experience the best of Kenyan music and culture</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-semibold">KSH 2,500</span>
                  <span className="text-sm text-gray-500">Dec 15, 2023</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop" alt="Tech Conference Nairobi" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Tech Conference Nairobi</h3>
                <p className="text-gray-600 mb-4">Innovate, Connect, Transform</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-semibold">KSH 5,000</span>
                  <span className="text-sm text-gray-500">Jan 20, 2024</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop" alt="Comedy Night" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Comedy Night</h3>
                <p className="text-gray-600 mb-4">Laugh out loud with Kenya's best comedians</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-semibold">KSH 1,500</span>
                  <span className="text-sm text-gray-500">Nov 30, 2023</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              to="/events"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 SparkVybzEnt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;