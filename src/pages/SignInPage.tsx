import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utilities/AuthContext';

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    const success = await login(email, password);
    if (success) {
      const storedUser = localStorage.getItem('sparkvybzent_user');
      const userObj = storedUser ? JSON.parse(storedUser) : null;
      if (userObj && (userObj.role === 'ADMIN' || userObj.role === 'admin')) {
        navigate('/admin');
      } else {
        navigate(from, { replace: true });
      }
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0d14', color: '#fff', fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>
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
          <h1 className="svb-title text-3xl font-bold">Sign In</h1>
          <p className="svb-label text-gray-300 mt-2">Welcome back to SparkVybzEnt</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="svb-label block text-sm font-medium mb-1">Email Address</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Enter your email" style={{ background: '#222', color: '#fff', fontFamily: 'DM Sans, sans-serif' }} />
          </div>
          <div>
            <label htmlFor="password" className="svb-label block text-sm font-medium mb-1">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Enter your password" style={{ background: '#222', color: '#fff', fontFamily: 'DM Sans, sans-serif' }} />
          </div>
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          <button type="submit" disabled={isLoading} className="svb-btn w-full font-semibold py-3 px-4 rounded-md transition duration-300">
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="svb-label">
            Don't have an account?{' '}
            <Link to="/signup" className="svb-link font-medium">Sign up</Link>
          </p>
        </div>
        <div className="mt-4 text-center">
          <Link to="/" className="svb-link">Back to Home</Link>
        </div>
        <div className="mt-6 p-4 rounded-md" style={{ background: '#222', color: '#60c8f0' }}>
          <p><b>Demo Credentials:</b></p>
          <p>User: john@example.com / password</p>
          <p>Admin: admin@sparkvybzent.com / password</p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;