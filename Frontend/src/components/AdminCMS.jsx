import React, { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Trash, Plane, MapPin, Building, Globe, DollarSign, Calendar, RefreshCw } from 'lucide-react';

const AdminCMS = ({ user }) => {
  const [activeSubTab, setActiveSubTab] = useState('flights');
  const [cities, setCities] = useState([]);
  const [airports, setAirports] = useState([]);
  const [flights, setFlights] = useState([]);
  
  // Loading & Error States
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Form States - Cities
  const [cityName, setCityName] = useState('');

  // Form States - Airports
  const [airportName, setAirportName] = useState('');
  const [airportAddress, setAirportAddress] = useState('');
  const [airportCityId, setAirportCityId] = useState('');

  // Form States - Flights
  const [flightNumber, setFlightNumber] = useState('');
  const [flightAirplaneId, setFlightAirplaneId] = useState('1');
  const [flightDepAirportId, setFlightDepAirportId] = useState('');
  const [flightArrAirportId, setFlightArrAirportId] = useState('');
  const [flightDepTime, setFlightDepTime] = useState('');
  const [flightArrTime, setFlightArrTime] = useState('');
  const [flightPrice, setFlightPrice] = useState('');
  const [flightGate, setFlightGate] = useState('Gate 1');

  // Load database entities
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [citiesRes, airportsRes, flightsRes] = await Promise.all([
        api.get('/api/v1/city'),
        api.get('/api/v1/airport'),
        api.get('/api/v1/flight')
      ]);

      if (citiesRes.data?.success) setCities(citiesRes.data.data);
      if (airportsRes.data?.success) setAirports(airportsRes.data.data);
      if (flightsRes.data?.success) setFlights(flightsRes.data.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch CMS entities from services.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showNotification = (msg, isSuccess = true) => {
    if (isSuccess) {
      setSuccess(msg);
      setError(null);
    } else {
      setError(msg);
      setSuccess(null);
    }
    setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 4000);
  };

  // Add City
  const handleAddCity = async (e) => {
    e.preventDefault();
    if (!cityName.trim()) return;
    setActionLoading(true);
    try {
      const res = await api.post('/api/v1/city', { name: cityName });
      if (res.data?.success) {
        showNotification('City created successfully!');
        setCityName('');
        loadData();
      } else {
        showNotification(res.data?.message || 'Failed to create city', false);
      }
    } catch (err) {
      console.error(err);
      showNotification(err.response?.data?.message || 'Error occurred while creating city', false);
    } finally {
      setActionLoading(false);
    }
  };

  // Delete City
  const handleDeleteCity = async (cityId) => {
    if (!window.confirm('Are you sure you want to delete this city? This may cascade delete related airports!')) return;
    setActionLoading(true);
    try {
      const res = await api.delete(`/api/v1/city/${cityId}`);
      if (res.data?.success) {
        showNotification('City deleted successfully!');
        loadData();
      } else {
        showNotification(res.data?.message || 'Failed to delete city', false);
      }
    } catch (err) {
      console.error(err);
      showNotification(err.response?.data?.message || 'Error deleting city', false);
    } finally {
      setActionLoading(false);
    }
  };

  // Add Airport
  const handleAddAirport = async (e) => {
    e.preventDefault();
    if (!airportName.trim() || !airportCityId) return;
    setActionLoading(true);
    try {
      const res = await api.post('/api/v1/airport', {
        name: airportName,
        address: airportAddress,
        cityId: airportCityId
      });
      if (res.data?.success) {
        showNotification('Airport created successfully!');
        setAirportName('');
        setAirportAddress('');
        setAirportCityId('');
        loadData();
      } else {
        showNotification(res.data?.message || 'Failed to create airport', false);
      }
    } catch (err) {
      console.error(err);
      showNotification(err.response?.data?.message || 'Error creating airport', false);
    } finally {
      setActionLoading(false);
    }
  };

  // Add Flight
  const handleAddFlight = async (e) => {
    e.preventDefault();
    if (!flightNumber || !flightDepAirportId || !flightArrAirportId || !flightDepTime || !flightArrTime || !flightPrice) {
      showNotification('Please fill out all required flight fields.', false);
      return;
    }

    if (flightDepAirportId === flightArrAirportId) {
      showNotification('Departure and Arrival airports must be different.', false);
      return;
    }

    setActionLoading(true);
    try {
      const res = await api.post('/api/v1/flight', {
        flightNumber,
        airplaneId: Number(flightAirplaneId),
        departureAirportId: Number(flightDepAirportId),
        arrivalAirportId: Number(flightArrAirportId),
        departureTime: new Date(flightDepTime).toISOString(),
        arrivalTime: new Date(flightArrTime).toISOString(),
        price: Number(flightPrice),
        boardingGate: flightGate
      });
      if (res.data?.success) {
        showNotification('Flight scheduled successfully!');
        setFlightNumber('');
        setFlightDepTime('');
        setFlightArrTime('');
        setFlightPrice('');
        loadData();
      } else {
        showNotification(res.data?.message || 'Failed to create flight', false);
      }
    } catch (err) {
      console.error(err);
      showNotification(err.response?.data?.message || 'Error scheduling flight', false);
    } finally {
      setActionLoading(false);
    }
  };

  const getCityName = (id) => cities.find(c => c.id === id)?.name || `ID: ${id}`;
  const getAirportName = (id) => airports.find(a => a.id === id)?.name || `ID: ${id}`;

  return (
    <div style={{ maxWidth: '1200px', width: '90%', margin: '0 auto 40px' }}>
      
      {/* Tab Selector */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <button 
          onClick={() => setActiveSubTab('flights')} 
          className={`btn ${activeSubTab === 'flights' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <Plane size={16} /> Manage Flights
        </button>
        <button 
          onClick={() => setActiveSubTab('airports')} 
          className={`btn ${activeSubTab === 'airports' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <MapPin size={16} /> Manage Airports
        </button>
        <button 
          onClick={() => setActiveSubTab('cities')} 
          className={`btn ${activeSubTab === 'cities' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <Building size={16} /> Manage Cities
        </button>
      </div>

      {/* Notifications */}
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

      {success && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid var(--success)',
          color: '#34d399',
          padding: '16px',
          borderRadius: '12px',
          marginBottom: '24px'
        }}>
          {success}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <RefreshCw className="animate-spin" size={32} style={{ color: 'var(--accent-brass)' }} />
          <p className="mono" style={{ marginTop: '12px', color: 'var(--text-secondary)' }}>Loading CMS Entities...</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
          
          {/* LEFT SIDE: Creation Form */}
          <div className="panel" style={{ padding: '28px', height: 'fit-content' }}>
            
            {activeSubTab === 'cities' && (
              <form onSubmit={handleAddCity}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: "'Fraunces', serif", marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Building size={18} color="var(--accent-brass)" /> Add New City
                </h3>
                <div className="input-group" style={{ marginBottom: '20px' }}>
                  <label>City Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Mumbai" 
                    className="input-field"
                    value={cityName}
                    onChange={e => setCityName(e.target.value)}
                  />
                </div>
                <button type="submit" disabled={actionLoading} className="btn btn-primary" style={{ width: '100%' }}>
                  <Plus size={16} /> {actionLoading ? 'Creating...' : 'Create City'}
                </button>
              </form>
            )}

            {activeSubTab === 'airports' && (
              <form onSubmit={handleAddAirport}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: "'Fraunces', serif", marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={18} color="var(--accent-brass)" /> Add New Airport
                </h3>
                <div className="input-group" style={{ marginBottom: '16px' }}>
                  <label>Airport Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Chhatrapati Shivaji Airport" 
                    className="input-field"
                    value={airportName}
                    onChange={e => setAirportName(e.target.value)}
                  />
                </div>
                <div className="input-group" style={{ marginBottom: '16px' }}>
                  <label>Address / Location</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Vile Parle East, Mumbai" 
                    className="input-field"
                    value={airportAddress}
                    onChange={e => setAirportAddress(e.target.value)}
                  />
                </div>
                <div className="input-group" style={{ marginBottom: '20px' }}>
                  <label>City Location</label>
                  <select 
                    required
                    className="input-field"
                    value={airportCityId}
                    onChange={e => setAirportCityId(e.target.value)}
                  >
                    <option value="">Choose city location...</option>
                    {cities.map(c => (
                      <option key={c.id} value={c.id}>{c.name} (ID: {c.id})</option>
                    ))}
                  </select>
                </div>
                <button type="submit" disabled={actionLoading} className="btn btn-primary" style={{ width: '100%' }}>
                  <Plus size={16} /> {actionLoading ? 'Creating...' : 'Create Airport'}
                </button>
              </form>
            )}

            {activeSubTab === 'flights' && (
              <form onSubmit={handleAddFlight}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: "'Fraunces', serif", marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Plane size={18} color="var(--accent-brass)" /> Schedule Flight
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div className="input-group">
                    <label>Flight Code</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. PN302" 
                      className="input-field"
                      value={flightNumber}
                      onChange={e => setFlightNumber(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Airplane</label>
                    <select 
                      className="input-field"
                      value={flightAirplaneId}
                      onChange={e => setFlightAirplaneId(e.target.value)}
                    >
                      <option value="1">Airbus A320 (ID: 1)</option>
                      <option value="2">Boeing 737 (ID: 2)</option>
                    </select>
                  </div>
                </div>

                <div className="input-group" style={{ marginBottom: '16px' }}>
                  <label>Departure Airport</label>
                  <select 
                    required 
                    className="input-field"
                    value={flightDepAirportId}
                    onChange={e => setFlightDepAirportId(e.target.value)}
                  >
                    <option value="">From...</option>
                    {airports.map(a => (
                      <option key={a.id} value={a.id}>{a.name} (ID: {a.id})</option>
                    ))}
                  </select>
                </div>

                <div className="input-group" style={{ marginBottom: '16px' }}>
                  <label>Arrival Airport</label>
                  <select 
                    required 
                    className="input-field"
                    value={flightArrAirportId}
                    onChange={e => setFlightArrAirportId(e.target.value)}
                  >
                    <option value="">To...</option>
                    {airports.map(a => (
                      <option key={a.id} value={a.id}>{a.name} (ID: {a.id})</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div className="input-group">
                    <label>Departure Time</label>
                    <input 
                      type="datetime-local" 
                      required 
                      className="input-field"
                      value={flightDepTime}
                      onChange={e => setFlightDepTime(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Arrival Time</label>
                    <input 
                      type="datetime-local" 
                      required 
                      className="input-field"
                      value={flightArrTime}
                      onChange={e => setFlightArrTime(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div className="input-group">
                    <label>Price (₹)</label>
                    <input 
                      type="number" 
                      required 
                      placeholder="e.g. 250" 
                      className="input-field"
                      value={flightPrice}
                      onChange={e => setFlightPrice(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Gate</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Gate C4" 
                      className="input-field"
                      value={flightGate}
                      onChange={e => setFlightGate(e.target.value)}
                    />
                  </div>
                </div>

                <button type="submit" disabled={actionLoading} className="btn btn-primary" style={{ width: '100%' }}>
                  <Plus size={16} /> {actionLoading ? 'Scheduling...' : 'Schedule Flight'}
                </button>
              </form>
            )}

          </div>

          {/* RIGHT SIDE: Table List */}
          <div className="panel" style={{ padding: '28px', maxHeight: '600px', overflowY: 'auto' }}>
            
            {activeSubTab === 'cities' && (
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: "'Fraunces', serif", marginBottom: '20px' }}>Registered Cities</h3>
                {cities.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>No cities created yet.</p>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr className="mono" style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        <th style={{ padding: '12px 8px' }}>ID</th>
                        <th style={{ padding: '12px 8px' }}>City Name</th>
                        <th style={{ padding: '12px 8px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cities.map(city => (
                        <tr key={city.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <td className="mono" style={{ padding: '12px 8px', fontWeight: 700 }}>{city.id}</td>
                          <td style={{ padding: '12px 8px' }}>{city.name}</td>
                          <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                            <button 
                              onClick={() => handleDeleteCity(city.id)} 
                              className="btn btn-danger" 
                              style={{ padding: '6px', borderRadius: '4px' }}
                              disabled={actionLoading}
                            >
                              <Trash size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {activeSubTab === 'airports' && (
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: "'Fraunces', serif", marginBottom: '20px' }}>Registered Airports</h3>
                {airports.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>No airports created yet.</p>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr className="mono" style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        <th style={{ padding: '12px 8px' }}>ID</th>
                        <th style={{ padding: '12px 8px' }}>Airport Name</th>
                        <th style={{ padding: '12px 8px' }}>City Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {airports.map(airport => (
                        <tr key={airport.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <td className="mono" style={{ padding: '12px 8px', fontWeight: 700 }}>{airport.id}</td>
                          <td style={{ padding: '12px 8px' }}>
                            <div style={{ fontWeight: 600 }}>{airport.name}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{airport.address || 'No Location Details'}</div>
                          </td>
                          <td style={{ padding: '12px 8px' }}>
                            <span className="badge badge-info">{getCityName(airport.cityId)} (ID: {airport.cityId})</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {activeSubTab === 'flights' && (
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: "'Fraunces', serif", marginBottom: '20px' }}>Scheduled Flights</h3>
                {flights.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>No flights scheduled yet.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {flights.map(flight => (
                      <div key={flight.id} style={{
                        padding: '16px',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'rgba(255,255,255,0.01)'
                      }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className="badge badge-info">{flight.flightNumber}</span>
                            <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>PLANE: {flight.airplaneId}</span>
                          </div>
                          <div style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '6px' }}>
                            {getAirportName(flight.departureAirportId)} ➔ {getAirportName(flight.arrivalAirportId)}
                          </div>
                          <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                            DEP: {new Date(flight.departureTime).toLocaleString()}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div className="mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-rust)' }}>
                            ₹{flight.price}
                          </div>
                          <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                            SEATS: {flight.totalSeats}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};

export default AdminCMS;
