const express=require('express');
const router=express.Router();


const v1apiroute=require('./v1/index'); // import v1apiroute object 


router.use('/v1',v1apiroute);  // if route contains /v1 direct to v1apiroute


module.exports=router;   // export your router object 