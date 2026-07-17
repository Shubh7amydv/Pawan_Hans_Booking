const { Flight } = require("../models/index");
const { Op } = require("sequelize");

class FlightRepository {

    #createFilter(data) {
        let filter = {};
        if (data.departureAirportId) {
            filter.departureAirportId = data.departureAirportId;
        }
        if (data.arrivalAirportId) {
            filter.arrivalAirportId = data.arrivalAirportId;
        }
        if (data.minPrice && data.maxPrice) {
            filter.price = {
                [Op.between]: [data.minPrice, data.maxPrice]
            };
        } else if (data.minPrice) {
            filter.price = {
                [Op.gte]: data.minPrice
            };
        } else if (data.maxPrice) {
            filter.price = {
                [Op.lte]: data.maxPrice
            };
        }
        return filter;
    }

    async createFlight(data) {
        try {
            const newflight=await Flight.create(data);
            return newflight;
            
        } catch (error) {
            console.log("REPOSITORY ERROR:", error.message);
            console.log(error.errors); // Sequelize validation details
            throw error;
        }
    };


    async getFlight(data){
        try {
            const flight=await Flight.findByPk(data);
            return flight;
            
        } catch (error) {
            console.log("REPOSITORY ERROR:", error.message);
            console.log(error.errors); // Sequelize validation details
            throw error;
        }
        
    };


    async updateFlight(flightId,data){
        try{
            await Flight.update(data,{
                where:{
                    id: flightId,
                }
            });
            return true;
        }

        catch(error){
            console.log("something went wrong in repo layer in updating");
            throw error;
        }
    };

    async getAllFlights(filter) {
        try {
            const filterObject = this.#createFilter(filter);
            const flights = await Flight.findAll({
                where: filterObject
            });
            return flights;
        } catch (error) {
            console.log("REPOSITORY ERROR:", error.message);
            throw error;
        }
    }

    async updateSeats(flightId, seats, decrement = true) {
        try {
            const flight = await Flight.findByPk(flightId);
            if (decrement) {
                await flight.decrement('totalSeats', { by: seats });
            } else {
                await flight.increment('totalSeats', { by: seats });
            }
            await flight.reload();
            return flight;
        } catch (error) {
            console.log("something went wrong in repo layer in updating seats");
            throw error;
        }
    }

}





module.exports=FlightRepository;