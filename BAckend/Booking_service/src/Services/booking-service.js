const {BookingRepository}= require('../Repository/index');
const axios=require('axios');
const { FLIGHT_SERVICE_PATH }=require('../config/serverconfig');
const serviceError = require('../utils/errors/service-error');


class BookingService {

    constructor(){
        this.bookingRepository=new BookingRepository();
    }
    async createBooking(data){
       try {

        console.log("SERVICE DATA:", data);

        
        const flightId= data.flightId
        const getflightRequestUrl=`${FLIGHT_SERVICE_PATH}/api/v1/flight/${flightId}`;

        const response=await axios.get(getflightRequestUrl);

        const flightData=response.data.data; 
        const priceOfFlight=flightData.price;


        if(data.noOfSeats>flightData.totalSeats){
            throw new serviceError (
                'something went wrong in booking process',
                'insufficients seats in the flight'
            )
        }

        const totalCost=priceOfFlight * data.noOfSeats;
        const bookingPayload={...data, totalCost};
        const booking= await this.bookingRepository.create(bookingPayload);
        const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flight/${flightId}`;

        console.log(updateFlightRequestURL);
        console.log("flightData:", flightData);
        console.log("booking.noOfSeats:", booking.noOfSeats);
        console.log( "calculated seats:",flightData?.totalSeats - booking?.noOfSeats);



        await axios.patch(updateFlightRequestURL, {totalSeats: flightData.totalSeats - booking.noOfSeats});
        const finalBooking=await this.bookingRepository.update(booking.id, { status: "Booked" });

        return finalBooking;
 
    
       } catch (error) {
            // throw new serviceError();
            console.log("something went wrong at service layer");
            throw error;

       }
    }
}

module.exports=BookingService;