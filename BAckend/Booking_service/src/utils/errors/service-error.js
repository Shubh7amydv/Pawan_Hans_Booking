const { StatusCodes } = require('http-status-codes');

class ServiceError extends Error {
    constructor(
        message,
        explanation,
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    ) {
        super(message); // ✅ REQUIRED

        this.name = 'ServiceError';
        this.explanation = explanation;
        this.statusCode = statusCode;
    }
}

module.exports = ServiceError;
