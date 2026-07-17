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

module.exports={
    create,
    get,
    update
}




// "flightNumber":
//   "airplaneId":
//   "departureAirportId":
//    "arrivalAirportId":
//   "arrivalTime":
//   "departureTime":
//   "price":
//   "totalSeats" :
