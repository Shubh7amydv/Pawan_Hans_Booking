const express = require('express');
const proxy = require('express-http-proxy');
const { checkAuth } = require('../../middlewares/auth-middleware');
const { 
    AUTH_SERVICE_PATH, 
    BOOKING_SERVICE_PATH, 
    FLIGHT_SERVICE_PATH 
} = require('../../config/serverconfig');

const router = express.Router();

// Auth Service routes (unprotected)
router.use('/signup', proxy(AUTH_SERVICE_PATH, {
    proxyReqPathResolver: (req) => '/api/v1/signup'
}));
router.use('/signin', proxy(AUTH_SERVICE_PATH, {
    proxyReqPathResolver: (req) => '/api/v1/signin'
}));

// Flight / ABP Service routes (unprotected search / read)
router.use('/flight', proxy(FLIGHT_SERVICE_PATH, {
    proxyReqPathResolver: (req) => {
        const parts = req.url.split('?');
        const query = parts[1] ? '?' + parts[1] : '';
        return '/api/v1/flight' + parts[0] + query;
    }
}));
router.use('/city', proxy(FLIGHT_SERVICE_PATH, {
    proxyReqPathResolver: (req) => {
        const parts = req.url.split('?');
        const query = parts[1] ? '?' + parts[1] : '';
        return '/api/v1/city' + parts[0] + query;
    }
}));

// Booking Service routes (protected by checkAuth)
router.use('/bookings', checkAuth, proxy(BOOKING_SERVICE_PATH, {
    proxyReqPathResolver: (req) => '/api/v1/bookings'
}));
router.use('/payments', checkAuth, proxy(BOOKING_SERVICE_PATH, {
    proxyReqPathResolver: (req) => '/api/v1/payments'
}));

module.exports = router;
