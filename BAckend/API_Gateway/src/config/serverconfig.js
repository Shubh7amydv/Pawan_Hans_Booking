const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT || 8000,
    AUTH_SERVICE_PATH: process.env.AUTH_SERVICE_PATH,
    BOOKING_SERVICE_PATH: process.env.BOOKING_SERVICE_PATH,
    FLIGHT_SERVICE_PATH: process.env.FLIGHT_SERVICE_PATH
};
