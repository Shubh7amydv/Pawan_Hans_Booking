import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthCard from './components/AuthCard';
import FlightSearch from './components/FlightSearch';
import BookingCard from './components/BookingCard';
import PaymentSandbox from './components/PaymentSandbox';
import AdminCMS from './components/AdminCMS';
import api from './api';
import { Plane, Star, ShieldCheck, Mail, Server } from 'lucide-react';

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState('search');
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [activeBooking, setActiveBooking] = useState(null);

  const checkAdminStatus = async (token) => {
    try {
      const authRes = await api.get('/api/v1/isAuthenticated', {
        headers: { 'x-access-token': token }
      });
      if (authRes.data && authRes.data.success) {
        const userId = authRes.data.data;
        const adminRes = await api.post('/api/v1/isAdmin', { id: userId });
        if (adminRes.data && adminRes.data.success) {
          setIsAdmin(adminRes.data.data);
        }
      }
    } catch (err) {
      console.error('Error verifying admin status:', err);
      setIsAdmin(false);
    }
  };

  // Restore user session from localStorage on startup
  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');
    if (token && email) {
      setUser({ token, email });
      checkAdminStatus(token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setUser(null);
    setIsAdmin(false);
    setActiveBooking(null);
    setSelectedFlight(null);
    setActiveTab('search');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar 
        user={user} 
        isAdmin={isAdmin}
        onOpenAuth={() => setShowAuthModal(true)} 
        onLogout={handleLogout} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Body */}
      <main style={{ flex: 1, padding: '20px 0' }}>
        
        {/* Header Hero Section (Only visible on search tab) */}
        {activeTab === 'search' && !selectedFlight && (
          <div style={{ textAlign: 'left', padding: '60px 0 40px', maxWidth: '1200px', width: '90%', margin: '0 auto' }}>
            <h1 style={{ 
              fontSize: '3.5rem', 
              fontWeight: 800, 
              lineHeight: 1.15,
              marginBottom: '16px',
              letterSpacing: '-0.025em',
              fontFamily: "'Fraunces', serif",
              color: 'var(--text-primary)'
            }}>
              Search and Book Your Pushpak Viman
            </h1>
            
            <p style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '1.15rem', 
              lineHeight: 1.6,
              marginBottom: '24px',
              maxWidth: '750px'
            }}>
              Test Auth RBAC, safe transactional booking seat updates, and RabbitMQ message enqueuing through a single, cohesive frontend dashboard.
            </p>
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

        {activeTab === 'admin' && (
          <AdminCMS user={user} />
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
          onLoginSuccess={(userData) => {
            setUser(userData);
            checkAdminStatus(userData.token);
          }}
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
