import React from 'react';
import FeaturedEvents from './FeaturedEvents';
import { Link } from 'react-router-dom';
import { useAuth } from '../utilities/AuthContext';

const LandingPage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ minHeight: '100vh', background: '#0a0d14', color: '#fff', fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400&display=swap');
        * { box-sizing: border-box; }
        .gold { color: #f0c040; }
        .green { color: #22c55e; }
        .hero-title { font-size: 48px; font-family: 'Playfair Display', serif; font-weight: 700; line-height: 1.1; color: #f0c040; margin-bottom: 18px; }
        .hero-sub { font-size: 20px; color: #fff; font-family: 'DM Sans', sans-serif; margin-bottom: 32px; }
        .action-btn { background:#22c55e; color:#0a0d14; border:none; border-radius:12px; padding:14px 32px; font-size:17px; font-weight:600; cursor:pointer; transition:opacity 0.2s,transform 0.15s; font-family:'DM Sans',sans-serif; margin-right: 18px; }
        .action-btn:hover { opacity:0.85; transform:translateY(-1px); }
        .ghost-btn { background:rgba(255,255,255,0.06); color:rgba(255,255,255,0.7); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:14px 32px; font-size:17px; font-weight:600; cursor:pointer; transition:all 0.2s; font-family:'DM Sans',sans-serif; }
        .ghost-btn:hover { background:rgba(255,255,255,0.1); color:#fff; }
      `}</style>
      {/* Header */}
      <header style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(10,13,20,0.96)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1060, margin: '0 auto', padding: '0 24px', height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: '#f0c040', fontFamily: "'Playfair Display', serif", letterSpacing: -0.3 }}>✦ SparkVybzEnt</span>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link to="/events" className="ghost-btn" style={{ padding: '6px 16px', fontSize: '14px', borderRadius: '8px' }}>Events</Link>
            {user ? (
              <>
                <Link to="/account" className="ghost-btn" style={{ padding: '6px 16px', fontSize: '14px', borderRadius: '8px' }}>My Account</Link>
                {user.role === 'ADMIN' && (
                  <Link to="/admin" className="action-btn" style={{ background: '#22c55e', color: '#0a0d14', padding: '6px 16px', fontSize: '14px', borderRadius: '8px' }}>Admin</Link>
                )}
                <button onClick={logout} className="ghost-btn" style={{ color: '#ef4444', padding: '6px 16px', fontSize: '14px', borderRadius: '8px' }}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/signin" className="ghost-btn" style={{ padding: '6px 16px', fontSize: '14px', borderRadius: '8px' }}>Sign In</Link>
                <Link to="/signup" className="action-btn" style={{ padding: '6px 16px', fontSize: '14px', borderRadius: '8px' }}>Sign Up</Link>
              </>
            )}
          </nav>
        </div>
      </header>
      {/* Hero Section */}
      <section style={{ padding: '48px 0 32px', textAlign: 'center', background: 'linear-gradient(135deg,#1a1f2e,#111827)', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <svg width="100%" height="100%" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#fff" fillOpacity="0.07" d="M0,160L80,149.3C160,139,320,117,480,128C640,139,800,181,960,197.3C1120,213,1280,203,1360,197.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="hero-title">SparkVybzEnt</h1>
          <p className="hero-sub">Kenya's #1 platform for events, tickets, and unforgettable moments.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 24 }}>
            <Link to="/events" className="action-btn">Discover Events</Link>
            {!user && (
              <Link to="/signup" className="ghost-btn">Get Started</Link>
            )}
            {user && (
              <Link to="/account" className="ghost-btn" style={{ background: '#fff', color: '#22c55e' }}>Go to My Account</Link>
            )}
          </div>
        </div>
      </section>
      {/* Featured Events Section */}
      <section style={{ padding: '48px 0', background: '#111827' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#f0c040', textAlign: 'center', marginBottom: 24, fontFamily: "'Playfair Display', serif" }}>Featured Events</h2>
          <FeaturedEvents />
        </div>
      </section>
      {/* Footer */}
      <footer style={{ background: '#0a0d14', color: '#fff', padding: '18px 0', marginTop: 'auto', textAlign: 'center' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto', padding: '0 24px' }}>
          <p>&copy; {new Date().getFullYear()} SparkVybzEnt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;