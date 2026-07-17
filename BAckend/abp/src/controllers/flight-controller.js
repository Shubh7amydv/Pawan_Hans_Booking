const { flightService}=require('../services/index');

const FlightService= new flightService();



const create= async (req,res) =>{
    try {

       const flight=await FlightService.createFlight(req.body);
       return res.status(201).json({
            data:flight,
            success:true,
            message:"successfully created a airport ",
            err:{}
        });

    
        
    } catch (error) {
        console.log("REQ BODY:", req.body);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Cannot create a flightt ",
            err:error
        })
    }
};


const get=async(req,res)=> {
    try {

       const flight=await FlightService.getFlight(req.params.id);
       return res.status(201).json({
            data:flight,
            success:true,
            message:"successfully got the airport ",
            err:{}
        });

    
        
    } catch (error) {
        console.log("REQ BODY:", req.body);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Cannot get a flightt ",
            err:error
        })
    }

};



const update=async(req,res)=>{
    try {

       const response=await FlightService.updateFlight(req.params.id,req.body);
       return res.status(201).json({
            data:response, 
            success:true,
            message:"successfully updated the flight ",
            err:{}
        });

    
        
    } catch (error) {
        console.log("REQ BODY:", req.body);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Cannot update the  a flightt ",
            err:error
        });
    }
};

const getAll = async (req, res) => {
    try {
        const flights = await FlightService.getAllFlightData(req.query);
        return res.status(200).json({
            data: flights,
            success: true,
            message: "successfully fetched the flights",
            err: {}
        });
    } catch (error) {
        console.log("Error in flight controller:", error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Cannot search flights",
            err: error
        });
    }
}

const updateSeats = async (req, res) => {
    try {
        const decrement = req.body.dec === undefined ? true : !!req.body.dec;
        const response = await FlightService.updateSeats(req.params.id, req.body.seats, decrement);
        return res.status(200).json({
            data: response,
            success: true,
            message: "successfully updated seats of the flight",
            err: {}
        });
    } catch (error) {
        console.log("Error in updateSeats controller:", error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Cannot update seats of the flight",
            err: error
        });
    }
}

module.exports={
    create,
    get,
    update,
    getAll,
    updateSeats
}




// "flightNumber":
//   "airplaneId":
//   "departureAirportId":
//    "arrivalAirportId":
//   "arrivalTime":
//   "departureTime":
//   "price":
//   "totalSeats" :
