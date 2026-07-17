const { BookingRepository } = require('../Repository/index');
const axios = require('axios');
const db = require('../models/index');
const { FLIGHT_SERVICE_PATH } = require('../config/serverconfig');
const serviceError = require('../utils/errors/service-error');
const { StatusCodes } = require('http-status-codes');

class BookingService {

    constructor(){
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data){
        const transaction = await db.sequelize.transaction();
        try {
            console.log("SERVICE DATA:", data);
            const flightId = data.flightId;
            const getflightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flight/${flightId}`;

            const response = await axios.get(getflightRequestUrl);
            const flightData = response.data.data; 

            if(data.noOfSeats > flightData.totalSeats){
                throw new serviceError(
                    'something went wrong in booking process',
                    'insufficient seats in the flight',
                    StatusCodes.BAD_REQUEST
                );
            }

            const totalCost = flightData.price * data.noOfSeats;
            const bookingPayload = { ...data, totalCost, status: 'InProcess' };
            
            const booking = await this.bookingRepository.create(bookingPayload, transaction);
            
            const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flight/${flightId}/seats`;
            await axios.patch(updateFlightRequestURL, { seats: data.noOfSeats });
            
            await transaction.commit();
            return booking;
        } catch (error) {
            await transaction.rollback();
            console.log("something went wrong at service layer in createBooking");
            throw error;
        }
    }

    async makePayment(data){
        const transaction = await db.sequelize.transaction();
        try {
            const bookingDetails = await this.bookingRepository.get(data.bookingId, transaction);
            if(bookingDetails.status === 'Cancelled'){
                throw new serviceError('The booking has expired', 'Booking cancelled', StatusCodes.BAD_REQUEST);
            }

            // Check if booking is older than 5 minutes
            const bookingTime = new Date(bookingDetails.createdAt);
            const currentTime = new Date();
            if(currentTime - bookingTime > 300000) {
                await this.cancelBooking(data.bookingId, transaction);
                throw new serviceError('The booking has expired', 'Booking time limit exceeded', StatusCodes.BAD_REQUEST);
            }

            if(bookingDetails.totalCost !== data.totalCost){
                throw new serviceError('The amount of the payment does not match', 'Cost mismatch', StatusCodes.BAD_REQUEST);
            }

            // Mark booking as Booked
            const response = await this.bookingRepository.update(data.bookingId, { status: "Booked" }, transaction);
            await transaction.commit();
            return response;
        } catch (error) {
            await transaction.rollback();
            console.log("something went wrong at service layer in makePayment");
            throw error;
        }
    }

    async cancelBooking(bookingId, passedTransaction = null){
        const transaction = passedTransaction || await db.sequelize.transaction();
        try {
            const bookingDetails = await this.bookingRepository.get(bookingId, transaction);
            if(bookingDetails.status === 'Cancelled') {
                if(!passedTransaction) await transaction.commit();
                return true;
            }

            // Put seats back to Flight
            const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flight/${bookingDetails.flightId}/seats`;
            await axios.patch(updateFlightRequestURL, { seats: bookingDetails.noOfSeats, dec: false });

            // Update status to Cancelled
            const response = await this.bookingRepository.update(bookingId, { status: 'Cancelled' }, transaction);
            if(!passedTransaction) await transaction.commit();
            return response;
        } catch (error) {
            if(!passedTransaction) await transaction.rollback();
            console.log("something went wrong at service layer in cancelBooking");
            throw error;
        }
    }
}

module.exports = BookingService;