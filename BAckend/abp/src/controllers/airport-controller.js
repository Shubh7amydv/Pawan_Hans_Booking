const { airportService }=require('../services/index');

const AirportService= new airportService(); 

const create= async (req,res) =>{
       try {
        const airportData = {
            name: req.body.name,
            cityId: Number(req.body.cityId) // 🔥 convert explicitly
       };
        const airport= await AirportService.createAirport(airportData);
        return res.status(201).json({
            data:airport,
            success:true,
            message:"successfully created a airport ",
            err:{}
        });
        
    } catch (error) {
        console.error("CREATE AIRPORT ERROR:", error);

        return res.status(500).json({
            data:{},
            success:false,
            message:"Cannot create a airport ",
            err:error
        });
    }
}

const get=async (req,res) =>{
    try {
        const airport=await AirportService.getAirport(req.params.id);
        return res.status(201).json({
            data:airport,
            success:true,
            message:"created the airport",
            err:{}
        });
        
    } catch (error) {
        console.error("CREATE AIRPORT ERROR:", error);

        return res.status(500).json({
            data:{},
            success:false,
            message:"Cannot get a airport ",
            err:error
        });
    }
}

module.exports = {
    create,
    get
}



