const { FlightRepository,AirplaneRepository }=require('../repository/index')

const { compareTime }=require('../utils/helper')

class flightservice {

    constructor(){
        this.airplaneRepository= new AirplaneRepository();
        this.FlightRepository= new FlightRepository();
    }

    async createFlight(data) {
        try {

            if(!compareTime(data.arrivalTime,data.departureTime)){
                throw { error : 'give valid inputs'};
            }
            const airplane = await this.airplaneRepository.getAirplane(data.airplaneId);

            const flight = await this.FlightRepository.createFlight({...data,totalSeats: airplane.capacity});

            return flight;
        } 
        catch (error) {
            console.log("something went wrong in service layer");
            throw error;
        }
}

    async getFlight(data){
       try {

            const flight = await this.FlightRepository.getFlight(data);
            return flight;
        } 
        catch (error) {
            console.log("something went wrong in service layer");
            throw error;
        }
    }


    async updateFlight(flightId,data){
        try {

            const response = await this.FlightRepository.updateFlight(flightId,data);
            return response;
        } 
        catch (error) {
            console.log("something went wrong in service layer");
            throw error;
        }
        
    };

    async getAllFlightData(data){
        try {
            const flights = await this.FlightRepository.getAllFlights(data);
            return flights;
        } 
        catch (error) {
            console.log("something went wrong in service layer");
            throw error;
        }
    }

    async updateSeats(flightId, seats, decrement = true){
        try {
            const response = await this.FlightRepository.updateSeats(flightId, seats, decrement);
            return response;
        } 
        catch (error) {
            console.log("something went wrong in service layer");
            throw error;
        }
    }
}

module.exports=flightservice ;




/***
 * flightNumber
 * airplaneId
 * departureAirportId
 * arrivalTime:
 * departureTime
 * price
 * totalSeats -> from airplane
*/