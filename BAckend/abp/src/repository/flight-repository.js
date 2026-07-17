const {Flight}=require("../models/index");

class FlightRepository {

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
        }

        catch(error){
            console.log("something went wrong in repo layer in updating");
            throw error;
        }
    };

}





module.exports=FlightRepository;