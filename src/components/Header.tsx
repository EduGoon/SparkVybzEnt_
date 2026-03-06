import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
  <header className="bg-white shadow-sm">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-green-600">
        SparkVybzEnt
      </Link>
      <div className="space-x-4">
        <Link to="/events" className="text-gray-600 hover:text-green-600">
          Events
        </Link>
      </div>
    </div>
  </header>
);

export default Header;
