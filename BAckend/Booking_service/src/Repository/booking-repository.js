const { Booking } = require('../models/index');
const { ValidationError, AppError } = require('../utils/errors/index');
const { StatusCodes } = require('http-status-codes');

class BookingRepository {
    
    async create(data, transaction = null) {
        try {
            const booking = await Booking.create(data, { transaction: transaction });
            return booking;
        } catch (error) {
            console.log("something went wrong in booking repo create", error);
            throw error;
        }
    }

    async get(bookingId, transaction = null) {
        try {
            const booking = await Booking.findByPk(bookingId, { transaction: transaction });
            if(!booking) {
                throw new AppError('Repository Error', 'Cannot find booking', 'Booking not found', StatusCodes.NOT_FOUND);
            }
            return booking;
        } catch (error) {
            console.log("something went wrong in getting booking repo", error);
            throw error;
        }
    }

    async update(bookingId, data, transaction = null) {
        try {
            const booking = await Booking.findByPk(bookingId, { transaction: transaction });
            if (!booking) {
                throw new AppError('Repository Error', 'Cannot find booking to update', 'Booking not found', StatusCodes.NOT_FOUND);
            }
            if (data.status) {
                booking.status = data.status;
            }
            await booking.save({ transaction: transaction });
            return booking;
        } catch (error) {
            console.log("something went wrong in updating the Booking repo", error);
            throw error;
        }
    }
    
}

module.exports = BookingRepository;
