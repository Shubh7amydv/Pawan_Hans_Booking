const express=require('express');

const router=express.Router();

const  BookingControllers =require('../../Controllers/booking-controllers');

router.post('/bookings', BookingControllers.create);
router.post('/payments', BookingControllers.makePayment);

module.exports=router;
