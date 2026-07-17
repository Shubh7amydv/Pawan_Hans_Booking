const { AirportRepository } = require('../repository');

class AirportService {
  constructor() {
    this.airportRepository = new AirportRepository();
  }

  async createAirport(data) {
    try {
      const airport = await this.airportRepository.createAirport(data);
      return airport;
    } catch (error) {
      console.error("Service layer error:", error);
      throw error;
    }
  }

  async getAirport(data){
      try {
        const airport=await this.airportRepository.getAirport(data);
        return airport;
      } catch (error) {
          console.log("some error occured at service layer");
      }
  }

}

module.exports = AirportService;
