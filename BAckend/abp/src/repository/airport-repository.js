const { Airport }=require('../models/index');

const { Op } = require('sequelize');

class AirportRepository {
 
    async createAirport(data) {
        try {
            const airport= await Airport.create(data);
            return airport;
        } catch (error) {
            console.log("something went wrong in repository layer");
            throw(error);
        }
    };

    async getAirport(data) {
        try {
            const airport=await Airport.findByPk(data);
            return airport;
        } catch (error) {
            console.log("some error oocured at repo");
        }
    }
   


}

module.exports=AirportRepository;

