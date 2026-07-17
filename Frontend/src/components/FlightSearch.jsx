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

  return (
    <div style={{ maxWidth: '1200px', width: '90%', margin: '0 auto 40px' }}>
      
      {/* Search Bar Panel */}
      <form onSubmit={handleSearch} className="glass" style={{
        padding: '32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
        alignItems: 'end',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
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

      {/* Errors display */}
      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid var(--error)',
          color: '#fca5a5',
          padding: '16px',
          borderRadius: '12px',
          marginBottom: '24px'
        }}>
          {error}
        </div>
      )}

      {/* Results Display */}
      <div>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '20px' }}>
          Available Flights ({flights.length})
        </h3>
        
        {flights.length === 0 ? (
          <div className="glass" style={{ padding: '60px 40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            No flights found. Modify your filters or click Search Flights to list all flights.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {flights.map(flight => (
              <div key={flight.id} className="glass glass-interactive" style={{
                padding: '24px 32px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                alignItems: 'center',
                gap: '24px'
              }}>
                <div>
                  <span className="badge badge-info" style={{ marginBottom: '8px' }}>{flight.flightNumber}</span>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                    {getAirportName(flight.departureAirportId).split(' (')[1]?.replace(')', '') || 'BLR'} 
                    <ArrowRight size={16} style={{ margin: '0 8px', verticalAlign: 'middle', color: 'var(--accent-indigo)' }} />
                    {getAirportName(flight.arrivalAirportId).split(' (')[1]?.replace(')', '') || 'DEL'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Flight ID: {flight.id} • Plane: {flight.airplaneId}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>DEPARTURE TIME</div>
                  <div style={{ fontWeight: 600 }}>{new Date(flight.departureTime).toLocaleString()}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>SEATS AVAILABLE</div>
                  <div style={{ fontWeight: 700, color: flight.totalSeats > 10 ? 'var(--success)' : 'var(--error)' }}>
                    {flight.totalSeats} seats
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>PRICE</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-pink)', display: 'flex', alignItems: 'center' }}>
                      <DollarSign size={18} /> {flight.price}
                    </div>
                  </div>

                  {user ? (
                    <button 
                      onClick={() => onSelectFlight(flight)}
                      className="btn btn-primary"
                    >
                      Book Ticket
                    </button>
                  ) : (
                    <button 
                      onClick={onOpenAuth}
                      className="btn btn-secondary"
                    >
                      Sign In to Book
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default FlightSearch;
