const { BookingService }=require('../Services/index');

const bookingService=new BookingService();

const { StatusCodes } = require('http-status-codes');

const create=async (req,res)=>{
    try {
        const response=await bookingService.createBooking(req.body);
        console.log("From booking controller",response);
        return res.status(200).json({
            message:"suceesfully completely the booking",
            success:true,
            err:{},
            data:response
        })
    } catch (error) {
        console.log("from booking controller error place",error);
        return res.status(400).json({
            message:"Something went wrong in controllers",
            success:false,
            err:error,
            data:{}
        })
    }
}

module.exports={
    create
}
   