import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthCard from './components/AuthCard';
import FlightSearch from './components/FlightSearch';
import BookingCard from './components/BookingCard';
import PaymentSandbox from './components/PaymentSandbox';
import { Plane, Star, ShieldCheck, Mail, Server } from 'lucide-react';

function App() {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState('search');
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [activeBooking, setActiveBooking] = useState(null);

  // Restore user session from localStorage on startup
  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');
    if (token && email) {
      setUser({ token, email });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setUser(null);
    setActiveBooking(null);
    setSelectedFlight(null);
    setActiveTab('search');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar 
        user={user} 
        onOpenAuth={() => setShowAuthModal(true)} 
        onLogout={handleLogout} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Body */}
      <main style={{ flex: 1, padding: '20px 0' }}>
        
        {/* Header Hero Section (Only visible on search tab) */}
        {activeTab === 'search' && !selectedFlight && (
          <div style={{ textAlign: 'center', padding: '60px 20px 40px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              background: 'rgba(99, 102, 241, 0.1)', 
              color: '#818cf8',
              padding: '6px 16px',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '20px'
            }}>
              <Star size={14} fill="#818cf8" />
              End-To-End Microservices Client
            </div>
            
            <h1 style={{ 
              fontSize: '3.5rem', 
              fontWeight: 800, 
              lineHeight: 1.15,
              marginBottom: '16px',
              letterSpacing: '-0.03em'
            }}>
              Search and Book Your{' '}
              <span style={{ 
                background: 'linear-gradient(to right, var(--accent-indigo), var(--accent-purple))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Pushpak Viman
              </span>
            </h1>
            
            <p style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '1.15rem', 
              lineHeight: 1.6,
              marginBottom: '32px'
            }}>
              Test Auth RBAC, safe transactional booking seat updates, and RabbitMQ message enqueuing through a single, cohesive frontend dashboard.
            </p>

            {/* Diagnostics indicators */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '16px',
              fontSize: '0.85rem',
              color: 'var(--text-muted)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Server size={14} color="var(--success)" /> Gateway: Port 8000
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Server size={14} color="var(--success)" /> Auth: Port 3001
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Server size={14} color="var(--success)" /> Booking: Port 3003
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Server size={14} color="var(--success)" /> Flight: Port 3004
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Server size={14} color="var(--success)" /> Reminder: Port 3005
              </div>
            </div>
          </div>
        )}

        {/* Tab view routing */}
        {activeTab === 'search' && (
          <FlightSearch 
            onSelectFlight={setSelectedFlight} 
            user={user} 
            onOpenAuth={() => setShowAuthModal(true)} 
          />
        )}

        {activeTab === 'payments' && (
          activeBooking ? (
            <PaymentSandbox 
              booking={activeBooking} 
              user={user} 
              onPaymentComplete={() => {
                setActiveBooking(null);
                setActiveTab('search');
              }}
            />
          ) : (
            <div style={{ maxWidth: '600px', width: '95%', margin: '40px auto', textAlign: 'center' }}>
              <div className="glass" style={{ padding: '60px 40px', color: 'var(--text-secondary)' }}>
                No active booking needs payment. Select a flight on the Search panel to create one.
              </div>
            </div>
          )
        )}

      </main>

      {/* Booking confirmation modal popup */}
      {selectedFlight && (
        <BookingCard 
          flight={selectedFlight} 
          user={user} 
          onBookingSuccess={(booking) => {
            setActiveBooking(booking);
            setSelectedFlight(null);
            setActiveTab('payments');
          }}
          onClose={() => setSelectedFlight(null)}
        />
      )}

      {/* Auth Modal Popup */}
      {showAuthModal && (
        <AuthCard 
          onClose={() => setShowAuthModal(false)} 
          onLoginSuccess={(userData) => setUser(userData)}
        />
      )}

      {/* Footer */}
      <footer style={{ 
        textAlign: 'center', 
        padding: '32px 0', 
        borderTop: '1px solid var(--border-color)',
        color: 'var(--text-muted)',
        fontSize: '0.85rem'
      }}>
        © 2026 Pushpak Viman Booking System • Pair Programmed with Antigravity
      </footer>
    </div>
  );
}

export default App;
