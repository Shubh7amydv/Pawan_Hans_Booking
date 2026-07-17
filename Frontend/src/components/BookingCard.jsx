import React, { useState } from 'react';
import api from '../api';
import { X, Calendar, DollarSign, Users, Ticket, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

const BookingCard = ({ flight, user, onBookingSuccess, onClose }) => {
  const [noOfSeats, setNoOfSeats] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookingResult, setBookingResult] = useState(null);

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post(
        '/api/v1/bookings',
        { flightId: flight.id, noOfSeats },
        {
          headers: {
            'x-access-token': user.token
          }
        }
      );

      if (response.data && response.data.success) {
        setBookingResult(response.data.data);
      } else {
        setError(response.data.message || 'Failed to create booking');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.response?.data?.error || 'Booking failed. Verify if Booking Service (Port 3003) is online.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(5, 8, 14, 0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 900
    }}>
      <div className="panel" style={{
        padding: '40px',
        width: '500px',
        maxWidth: '90%',
        position: 'relative',
        boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
        border: '1.5px solid var(--border-color)'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-secondary)'
          }}
        >
          <X size={20} />
        </button>

        {!bookingResult ? (
          <>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: "'Fraunces', serif", marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Ticket size={24} style={{ color: 'var(--accent-brass)' }} />
              Book Your Viman
            </h2>

            <div style={{
              background: 'var(--bg-secondary)',
              padding: '20px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              marginBottom: '24px'
            }}>
              <span className="badge badge-info" style={{ marginBottom: '8px' }}>{flight.flightNumber}</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>
                Flight ID: {flight.id} • Airplane ID: {flight.airplaneId}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={14} color="var(--accent-teal)" />
                <span className="mono">Departure: {new Date(flight.departureTime).toLocaleString()}</span>
              </div>
            </div>

            {error && (
              <div style={{
                background: 'rgba(193, 69, 58, 0.1)',
                border: '1px solid var(--error)',
                color: '#fca5a5',
                padding: '12px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                marginBottom: '16px'
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="input-group">
                <label><Users size={14} style={{ marginRight: '4px' }} /> Passenger Seats</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  required
                  className="input-field"
                  value={noOfSeats}
                  onChange={e => setNoOfSeats(parseInt(e.target.value))}
                />
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 0',
                borderTop: '1px solid var(--border-color)'
              }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Total Billing Amount</span>
                <span className="mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-rust)', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '4px' }}>₹</span>{flight.price * noOfSeats}
                </span>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', height: '48px' }}>
                {loading ? 'Booking...' : 'Confirm Reservation'}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle2 size={64} style={{ color: 'var(--success)', marginBottom: '16px' }} />
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: "'Fraunces', serif", marginBottom: '8px' }}>Booking Created!</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '24px' }}>
              Your reservation is currently <strong>InProcess</strong>. Proceed to the payment screen to confirm.
            </p>

            <div style={{
              background: 'var(--bg-secondary)',
              padding: '20px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              textAlign: 'left',
              marginBottom: '32px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Booking ID</span>
                <span className="mono" style={{ fontWeight: 700 }}>{bookingResult.id}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Flight Number</span>
                <span className="mono" style={{ fontWeight: 700 }}>{flight.flightNumber}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Total Cost</span>
                <span className="mono" style={{ fontWeight: 700, color: 'var(--accent-rust)' }}>₹{bookingResult.totalCost}</span>
              </div>
            </div>

            <button 
              onClick={() => onBookingSuccess(bookingResult)}
              className="btn btn-primary"
              style={{ width: '100%', height: '48px' }}
            >
              Proceed to Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
