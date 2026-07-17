const DemoService  = require('../services/demo-service');

const airportService = new DemoService();

const create = async (req, res) => {
    try {
        const response = await airportService.create(req.body);
        return res.status(201).json({
            message: 'Successfully created the airport',
            err: {},
            data: response,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            err: error,
            message: 'Cannot create a new airport'
        })
    }
}

const getAll = async (req, res) => {
    try {
        const response = await airportService.getAll();
        return res.status(200).json({
            message: 'Successfully fetched all airports',
            err: {},
            data: response,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            err: error,
            message: 'Cannot fetch airports'
        })
    }
}

module.exports = {
    create,
    getAll
}


