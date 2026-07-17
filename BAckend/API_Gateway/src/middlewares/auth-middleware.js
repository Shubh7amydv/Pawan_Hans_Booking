const axios = require('axios');
const { AUTH_SERVICE_PATH } = require('../config/serverconfig');
const { StatusCodes } = require('http-status-codes');

const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Authentication token missing",
                success: false,
                err: { error: "No token provided" },
                data: {}
            });
        }
        
        // Call Auth service to check if token is valid
        const response = await axios.get(`${AUTH_SERVICE_PATH}/api/v1/isAuthenticated`, {
            headers: {
                'x-access-token': token
            }
        });
        
        if (response.data && response.data.success) {
            // Append the authenticated user ID to the request body
            req.body.userId = response.data.data;
            next();
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Unauthorized request",
                success: false,
                err: { error: "Invalid token" },
                data: {}
            });
        }
    } catch (error) {
        console.log("Error in API Gateway auth middleware:", error.message);
        const statusCode = error.response ? error.response.status : StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({
            message: "Authentication failed",
            success: false,
            err: error.response ? error.response.data.err : { error: "Internal server error" },
            data: {}
        });
    }
}

module.exports = {
    checkAuth
};
