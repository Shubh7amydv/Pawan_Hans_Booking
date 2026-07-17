const { BookingService } = require('../Services/index');
const { StatusCodes } = require('http-status-codes');
const { createChannel, publishMessage } = require('../utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('../config/serverconfig');

const bookingService = new BookingService();

const create = async (req, res) => {
    try {
        const response = await bookingService.createBooking(req.body);
        console.log("From booking controller", response);
        return res.status(StatusCodes.OK).json({
            message: "successfully completed the booking",
            success: true,
            err: {},
            data: response
        })
    } catch (error) {
        console.log("from booking controller error place", error);
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Something went wrong in controllers",
            success: false,
            err: error,
            data: {}
        })
    }
}

const makePayment = async (req, res) => {
    try {
        const response = await bookingService.makePayment({
            totalCost: req.body.totalCost,
            userId: req.body.userId,
            bookingId: req.body.bookingId
        });
        
        // After successful payment, publish confirmation email to queue
        try {
            const channel = await createChannel();
            const payload = {
                data: {
                    subject: 'Flight Booking Confirmed!',
                    content: `Your booking (ID: ${req.body.bookingId}) has been successfully confirmed. Thank you for flying with us!`,
                    recepientEmail: req.body.recipientEmail || 'shubhamyadav.work@gmail.com',
                    notificationTime: new Date()
                },
                service: 'SEND_MAIL'
            };
            await publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
        } catch (queueError) {
            console.log("Failed to publish message to RabbitMQ:", queueError);
        }

        return res.status(StatusCodes.OK).json({
            message: "successfully completed the payment and booking",
            success: true,
            err: {},
            data: response
        });
    } catch (error) {
        console.log("Error in makePayment controller:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong in payment controller",
            success: false,
            err: error,
            data: {}
        });
    }
}

module.exports = {
    create,
    makePayment
}