const { StatusCodes }=require('http-status-code');

class validationError extends Error{
    constructor(error) {
        super();
        let explantion=[];
        error.errors.forEach((err)=>{
            explantion.push(err.message);
        });
        
    
        this.name='validationError',
        this.message="not able to valdiate the data sent into request",
        this.explantion=explantion,
        this.statusCodes=statusCodes.BAD_REQUEST
    }
}

module.exports=validationError;