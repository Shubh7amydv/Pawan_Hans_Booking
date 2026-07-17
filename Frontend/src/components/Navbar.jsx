import React from 'react';
import { Plane, LogIn, LogOut, User } from 'lucide-react';

const Navbar = ({ user, isAdmin, onOpenAuth, onLogout, activeTab, setActiveTab }) => {
  return (
    <nav className="glass" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 32px',
      margin: '24px auto',
      maxWidth: '1200px',
      width: '90%',
      position: 'sticky',
      top: '24px',
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--accent-indigo) 0%, var(--accent-purple) 100%)',
          padding: '8px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
        }}>
          <Plane size={22} color="white" style={{ transform: 'rotate(45deg)' }} />
        </div>
        <span style={{
          fontSize: '1.4rem',
          fontWeight: 800,
          background: 'linear-gradient(to right, #ffffff, #94a3b8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em'
        }}>
          Pushpak Viman
        </span>
      </div>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <button
          onClick={() => setActiveTab('search')}
          className="btn"
          style={{
            background: 'none',
            color: activeTab === 'search' ? 'var(--accent-indigo)' : 'var(--text-secondary)',
            fontWeight: activeTab === 'search' ? '700' : '500',
            transition: 'color 0.2s'
          }}
        >
          Search Flights
        </button>
        {user && (
          <button
            onClick={() => setActiveTab('payments')}
            className="btn"
            style={{
              background: 'none',
              color: activeTab === 'payments' ? 'var(--accent-indigo)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'payments' ? '700' : '500',
              transition: 'color 0.2s'
            }}
          >
            Payments Sandbox
          </button>
        )}
        {isAdmin && (
          <button
            onClick={() => setActiveTab('admin')}
            className="btn"
            style={{
              background: 'none',
              color: activeTab === 'admin' ? 'var(--accent-indigo)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'admin' ? '700' : '500',
              transition: 'color 0.2s'
            }}
          >
            Admin Portal
          </button>
        )}
      </div>


      <div>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
              <User size={16} />
              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{user.email}</span>
            </div>
            <button onClick={onLogout} className="btn btn-secondary" style={{ padding: '8px 16px' }}>
              <LogOut size={16} />
              Logout
            </button>
          </div>
        ) : (
          <button onClick={onOpenAuth} className="btn btn-primary">
            <LogIn size={16} />
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
