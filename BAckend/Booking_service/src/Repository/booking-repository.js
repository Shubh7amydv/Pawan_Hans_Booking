
const { Booking }=require('../models/index');

const { ValidationError,AppError }=require('../utils/errors/index');

const { StatusCodes } = require('http-status-codes');

class BookingRepository{
    
    async create(data){
        try {
            const  booking=await Booking.create(data);
            return booking;
        } catch (error) {
            // if(error.name=='SequelizeValidationError'){
            //     throw new ValidationError(error);
            // }
            // throw new AppError(
            //     'Repository Error',
            //     'cannot create the Booking',
            //     'There was some issue creating the booking',
            //      StatusCodes.INTERNAL_SERVER_ERROR
            console.log("something went wrong in bookin repo",error);
            throw error;
            
            

        }
    }

    async update (bookingId,data){
        try {
            const booking = await Booking.findByPk(bookingId);

            if (data.status) {
                booking.status = data.status;
            }

            await booking.save();
            return booking;

        } catch (error) {
            console.log("something went wrong in updating the Booking ");
            throw error;
        }
    }
    
}


module.exports=BookingRepository;
