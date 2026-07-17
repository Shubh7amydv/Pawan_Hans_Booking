

class AppError extends Error{
    constructor (
        name,
        message,
        explantion,
        statusCodes
    ){
        this.name=name,
        this.message=message,
        this.explantion=explantion,
        this.statusCodes=statusCodes
    }
}

module.exports=AppError;