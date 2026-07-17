const valdiateUserAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: "Something went wrong",
            data: {},
            success: false,
            error: "Missing email or password"
        });
    }
    next();
}

const validateIsAdminRequest = (req, res, next) => {
    if(!req.body.id) {
        return res.status(400).json({
            message: "Something went wrong",
            data: {},
            success: false,
            error: "Missing user ID"
        });
    }
    next();
}

module.exports={
    valdiateUserAuth,
    validateIsAdminRequest
}