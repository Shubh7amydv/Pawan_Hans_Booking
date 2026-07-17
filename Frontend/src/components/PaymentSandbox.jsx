import React, { useState } from 'react';
import api from '../api';
import { CreditCard, DollarSign, Send, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';

const PaymentSandbox = ({ booking, user, onPaymentComplete }) => {
  const [recipientEmail, setRecipientEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentResult, setPaymentResult] = useState(null);
  
  // Card state inputs for dummy card design
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post(
        '/api/v1/payments',
        {
          bookingId: booking.id,
          totalCost: booking.totalCost,
          recipientEmail: recipientEmail
        },
        {
          headers: {
            'x-access-token': user.token,
            'x-idempotency-key': `pay-${booking.id}-${Date.now()}`
          }
        }
      );

      if (response.data && response.data.success) {
        setPaymentResult(response.data.data);
      } else {
        setError(response.data.message || 'Payment processing failed');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.response?.data?.error || 'Payment failed. Ensure Booking Service (Port 3003) is online.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', width: '90%', margin: '0 auto 40px' }}>
      <div className="glass" style={{ padding: '40px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' }}>
        
        {!paymentResult ? (
          <>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard size={24} style={{ color: 'var(--accent-indigo)' }} />
              Payment Sandbox
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Complete the payment to trigger the confirmation email through RabbitMQ queue integration.
            </p>

            {/* Billing details info box */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-color)',
              padding: '16px 20px',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>PAYING FOR BOOKING ID</div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>#{booking.id}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>AMOUNT DUE</div>
                <div style={{ fontWeight: 800, fontSize: '1.4rem', color: 'var(--accent-pink)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <DollarSign size={18} /> {booking.totalCost}
                </div>
              </div>
            </div>

            {error && (
              <div style={{
                background: 'rgba(244, 63, 94, 0.1)',
                border: '1px solid var(--error)',
                color: '#fca5a5',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                marginBottom: '16px'
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div className="input-group">
                <label>Recipient Email for Confirmation Ticket</label>
                <div style={{ position: 'relative' }}>
                  <Send size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    required
                    className="input-field"
                    placeholder="name@gmail.com"
                    value={recipientEmail}
                    onChange={e => setRecipientEmail(e.target.value)}
                    style={{ paddingLeft: '44px' }}
                  />
                </div>
              </div>

              {/* Dummy Credit Card Details */}
              <div className="input-group">
                <label>Card Number</label>
                <input
                  type="text"
                  required
                  maxLength="19"
                  className="input-field"
                  placeholder="4111 2222 3333 4444"
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="input-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    required
                    maxLength="5"
                    placeholder="MM/YY"
                    className="input-field"
                    value={cardExpiry}
                    onChange={e => setCardExpiry(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>CVV</label>
                  <input
                    type="password"
                    required
                    maxLength="3"
                    placeholder="•••"
                    className="input-field"
                    value={cardCvv}
                    onChange={e => setCardCvv(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', height: '48px', marginTop: '12px' }}>
                {loading ? <RefreshCw className="animate-spin" size={18} /> : `Pay $${booking.totalCost}`}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle2 size={64} style={{ color: 'var(--success)', marginBottom: '16px' }} />
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>Payment Complete!</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '24px' }}>
              Booking is now marked as **Booked**.
            </p>

            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-color)',
              padding: '20px',
              borderRadius: '12px',
              textAlign: 'left',
              marginBottom: '32px'
            }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                📧 **RabbitMQ Integration Notification:**
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                A confirmation ticket was published to the queue with key `REMINDER_SERVICE`.
                The Reminder Service (Port 3005) will process the ticket and deliver the confirmation mail to **{recipientEmail}** within 1 minute.
              </p>
            </div>

            <button 
              onClick={onPaymentComplete}
              className="btn btn-primary"
              style={{ width: '100%', height: '48px' }}
            >
              Search New Flights
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default PaymentSandbox;
