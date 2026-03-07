import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utilities/AuthContext';

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { name, email, password, confirmPassword } = formData;
    if (!name || !email || !password || !confirmPassword || !formData.phone) {
      setError('All fields are required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const [firstName, ...lastParts] = name.trim().split(' ');
    const lastName = lastParts.join(' ') || '';

    const success = await signup({
      email,
      password,
      firstName,
      lastName,
      phone: formData.phone,
    });

    if (success) {
      navigate('/');
    } else {
      setError('Failed to create account');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12" style={{ background: '#0a0d14', color: '#fff', fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400&display=swap');
        .svb-title { font-family: 'Playfair Display', serif; color: #22c55e; }
        .svb-label { font-family: 'DM Sans', sans-serif; color: #fff; }
        .svb-link { color: #22c55e; font-family: 'DM Sans', sans-serif; }
        .svb-link:hover { color: #f0c040; }
        .svb-btn { font-family: 'DM Sans', sans-serif; background: #22c55e; color: #fff; }
        .svb-btn:hover { background: #f0c040; color: #0a0d14; }
      `}</style>
      <div className="max-w-md w-full rounded-lg shadow-md p-8" style={{ background: '#111827' }}>
        <div className="text-center mb-8">
          <h1 className="svb-title text-3xl font-bold">Sign Up</h1>
          <p className="svb-label text-gray-300 mt-2">Join SparkVybzEnt today</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="svb-label block text-sm font-medium mb-1">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Enter your full name" style={{ background: '#222', color: '#fff', fontFamily: 'DM Sans, sans-serif' }} />
          </div>
          <div>
            <label htmlFor="email" className="svb-label block text-sm font-medium mb-1">Email Address</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Enter your email" style={{ background: '#222', color: '#fff', fontFamily: 'DM Sans, sans-serif' }} />
          </div>
          <div>
            <label htmlFor="phone" className="svb-label block text-sm font-medium mb-1">Phone</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="e.g. 1234567890" style={{ background: '#222', color: '#fff', fontFamily: 'DM Sans, sans-serif' }} />
          </div>
          <div>
            <label htmlFor="password" className="svb-label block text-sm font-medium mb-1">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Create a password" style={{ background: '#222', color: '#fff', fontFamily: 'DM Sans, sans-serif' }} />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="svb-label block text-sm font-medium mb-1">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Confirm your password" style={{ background: '#222', color: '#fff', fontFamily: 'DM Sans, sans-serif' }} />
          </div>
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          <button type="submit" disabled={isLoading} className="svb-btn w-full font-semibold py-3 px-4 rounded-md transition duration-300">
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="svb-label">
            Already have an account?{' '}
            <Link to="/signin" className="svb-link font-medium">Sign in</Link>
          </p>
        </div>
        <div className="mt-4 text-center">
          <Link to="/" className="svb-link">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;