// Central API configuration — reads from VITE_API_BASE_URL environment variable.
// In development (.env): VITE_API_BASE_URL=http://localhost:8000
// In production (Render dashboard): VITE_API_BASE_URL=https://your-gateway.onrender.com

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
