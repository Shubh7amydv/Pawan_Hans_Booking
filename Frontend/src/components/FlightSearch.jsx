import React, { useState } from 'react';
import api from '../api';
import { Search, MapPin, Calendar, Users, DollarSign, ArrowRight, ShieldCheck } from 'lucide-react';

const FlightSearch = ({ onSelectFlight, user, onOpenAuth }) => {
  const [departureId, setDepartureId] = useState('');
  const [arrivalId, setArrivalId] = useState('');
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);

  // Seeded airports list for quick dropdown selection
  const airports = [
    { id: 29, code: 'BLR', name: 'Kempegowda Int. Airport (Bengaluru)' },
    { id: 30, code: 'IXE', name: 'Mangaluru Airport (Mangaluru)' },
    { id: 31, code: 'IXG', name: 'Belagavi Airport (Belagavi)' },
    { id: 32, code: 'DEL', name: 'Indira Gandhi Int. Airport (Delhi)' },
    { id: 35, code: 'VNS', name: 'Babatpur Airport (Varanasi)' }
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let queryParams = [];
    if (departureId) queryParams.push(`departureAirportId=${departureId}`);
    if (arrivalId) queryParams.push(`arrivalAirportId=${arrivalId}`);
    
    const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
    
    try {
      const response = await api.get(`/api/v1/flight${queryString}`);
      if (response.data && response.data.success) {
        setFlights(response.data.data);
      } else {
        setError('Failed to fetch flights');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to search flights. Check if the microservice on Port 3004 is active.');
    } finally {
      setLoading(false);
    }
  };

  const getAirportName = (id) => {
    const airport = airports.find(a => a.id === id);
    return airport ? `${airport.name} (${airport.code})` : `Airport ID: ${id}`;
  };

  const getAirportCode = (id) => {
    const airport = airports.find(a => a.id === id);
    return airport ? airport.code : `AP${id}`;
  };

  return (
    <div style={{ maxWidth: '1200px', width: '90%', margin: '0 auto 40px' }}>
      
      {/* Search Bar Panel */}
      <form onSubmit={handleSearch} className="panel" style={{
        padding: '32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
        alignItems: 'end',
        boxShadow: '0 8px 24px -12px rgba(0, 0, 0, 0.6)',
        marginBottom: '40px'
      }}>
        <div className="input-group">
          <label><MapPin size={14} style={{ marginRight: '4px' }} /> From</label>
          <select 
            className="input-field" 
            value={departureId} 
            onChange={e => setDepartureId(e.target.value)}
          >
            <option value="">Select departure airport</option>
            {airports.map(a => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label><MapPin size={14} style={{ marginRight: '4px' }} /> To</label>
          <select 
            className="input-field" 
            value={arrivalId} 
            onChange={e => setArrivalId(e.target.value)}
          >
            <option value="">Select destination airport</option>
            {airports.map(a => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary" style={{ height: '48px' }}>
          <Search size={18} />
          {loading ? 'Searching...' : 'Search Flights'}
        </button>
      </form>

      {error && (
        <div style={{
          background: 'rgba(193, 69, 58, 0.1)',
          border: '1px solid var(--error)',
          color: '#fca5a5',
          padding: '16px',
          borderRadius: '6px',
          marginBottom: '24px'
        }}>
          {error}
        </div>
      )}

      {/* Results Display */}
      <div>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: "'Fraunces', serif", marginBottom: '20px', letterSpacing: '-0.01em' }}>
          Available Flights ({flights.length})
        </h3>
        
        {flights.length === 0 ? (
          <div className="panel" style={{ padding: '60px 40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            No flights found. Modify your filters or click Search Flights to list all flights.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {flights.map(flight => {
              const dep = getAirportCode(flight.departureAirportId);
              const arr = getAirportCode(flight.arrivalAirportId);
              return (
                <div key={flight.id} className="ticket">
                  {/* Left Side: Route, Time, details */}
                  <div className="ticket-left">
                    <div className="ticket-cutout-top"></div>
                    <div className="ticket-cutout-bottom"></div>

                    {/* Route */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontFamily: "'Fraunces', serif", fontSize: '2rem', fontWeight: 800 }}>
                      <span style={{ color: 'var(--text-primary)' }}>{dep}</span>
                      <div style={{
                        flex: 1,
                        borderBottom: '2.5px dotted var(--border-color)',
                        position: 'relative',
                        margin: '0 8px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '2px'
                      }}>
                        <Plane size={16} color="var(--accent-brass)" style={{ position: 'absolute', transform: 'rotate(45deg)', background: 'var(--bg-card)', padding: '0 6px' }} />
                      </div>
                      <span style={{ color: 'var(--text-primary)' }}>{arr}</span>
                    </div>

                    {/* Meta info columns */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '24px', marginTop: '24px' }}>
                      <div className="input-group">
                        <label>FLIGHT</label>
                        <div className="mono" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-brass)' }}>
                          {flight.flightNumber}
                        </div>
                      </div>

                      <div className="input-group">
                        <label>DEPARTURE TIME</label>
                        <div className="mono" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                          {new Date(flight.departureTime).toLocaleString()}
                        </div>
                      </div>

                      <div className="input-group">
                        <label>SEATS LEFT</label>
                        <div className="mono" style={{ fontSize: '1rem', fontWeight: 700, color: flight.totalSeats > 10 ? 'var(--success)' : 'var(--error)' }}>
                          {flight.totalSeats}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Price Stamp and CTA Stub */}
                  <div className="ticket-right">
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>
                      TICKET FARE
                    </div>
                    <div className="mono" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-rust)', display: 'flex', alignItems: 'center', gap: '1px', marginBottom: '16px' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: 500, marginRight: '2px' }}>$</span>{flight.price}
                    </div>

                    {user ? (
                      <button 
                        onClick={() => onSelectFlight(flight)}
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '12px 16px' }}
                      >
                        Book Ticket
                      </button>
                    ) : (
                      <button 
                        onClick={onOpenAuth}
                        className="btn btn-secondary"
                        style={{ width: '100%', padding: '12px 16px', fontSize: '0.85rem' }}
                      >
                        Sign In to Book
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightSearch;
