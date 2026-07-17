const { CityRepository }=require('../repository/index')

class CityService{

    // constructor 
    constructor (){
        this.cityRepository=new CityRepository();
    }

    // behaviour 1 create the city 
    async createCity (data){
        try {
            const city=await this.cityRepository.createCity(data);
            return city;
            
        } catch (error) {
            console.log("some error occured at service layer ");
            throw(error);
        }
    }


    //behaviour 2 .. delete the city 
    async deleteCity(cityId) {
        try {
            const response=await this.cityRepository.deleteCity(cityId);
            return response;
            
        } catch (error) {
             console.log("some error occured at service layer ");
             throw(error);
        }
    }
    

    //behaviour 3 .. update the city 
    async updateCity (cityId,data) {
        try {
            const city= await this.cityRepository.updateCity(cityId,data);
            return city;
        } catch (error) {
             console.log("some error occured at service layer ");
             throw(error);
        }
    }
    

    // behaviour 4 ... get the city 
    async getCity (cityId) {
       try {
            const city= await this.cityRepository.getCity(cityId);
            return city;
        } catch (error) {
             console.log("some error occured at service layer ")
             throw(error);
        }
    }

    //behaviour 5... get all the cities 
    async getAllCities(filter){        // if you want all cities what should be input
        try {
            const cities=await this.cityRepository.getAllCities({name : filter.name});
            return cities;
        } catch (error) {
            console.log("some error occured at service layer ")
            throw(error);
        }
    }           

}


module.exports=CityService;