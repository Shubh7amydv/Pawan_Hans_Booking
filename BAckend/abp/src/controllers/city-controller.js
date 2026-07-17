const { CityService } = require('../services/index'); // importing the cityservice 

const cityService= new CityService(); // making it into a object to use it 

const create = async (req,res) => {
    try {
        const city= await cityService.createCity(req.body);
        return res.status(201).json({
            data:city,
            success:true,
            message:"successfully created a city ",
            err:{}
        });
        
    } catch (error) {
        console.log("error");
        return res.status(500).json({
            data:{},
            success:false,
            message:"Cannot create a city ",
            err:error
        });
    }
}


// DELETE -> /city/:id
const destroy =async (req,res) =>{
    try {
        const response= await cityService.deleteCity(req.params.id);
        return res.status(200).json({
            data:response,
            success: true,
            message:"Succesfully deleetd the city ",
            err:{}
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"cannot delete the city ",
            err: error
        })
    }
}

// For updating you will get url with PATCH -> /city/:id -> req.body
const update = async (req,res) => {
    try {
        const response= await cityService.updateCity(req.params.id,req.body);
        return res.status(201).json({
            data:response,
            success:true,
            message:"suucessfuly updated the details",
            err:{}
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"cannot update the details",
            err:error
        });
    }
}


// Get desired city.  -> GET -> /city/:id. 
const get= async (req,res) => {
   try{ 
      const city= await cityService.getCity(req.params.id);
      return res.status(201).json({
            data:city,
            success:true,
            message:"Succesfully find the city",
            err:{}
        });
    }

    catch (error){
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"cannot get the city",
            err:error
        });
    }
}

// To get all the cities in database
const getAll= async (req,res) =>{
    try {
        const cities=await cityService.getAllCities(req.query);
        return res.status(200).json({
            data:cities,
            success:true,
            message:"Succesfully fetched all the city",
            err:{}
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"cannot get the city",
            err:error
        });
        
    }
}




module.exports = {
    create,
    destroy,
    get,
    update,
    getAll
}