const express=require('express');

const router=express.Router();

const  BookingControllers =require('../../Controllers/booking-controllers');

router.post('/bookings', BookingControllers.create);

module.exports=router;
