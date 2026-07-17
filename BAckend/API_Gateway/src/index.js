const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { PORT } = require('./config/serverconfig');
const cors = require('cors');
const apiRoutes = require('./routes');

const setupAndStartServer = () => {
    const app = express();
    
    app.use(cors());
    app.use(morgan('combined'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use('/api', apiRoutes);
    
    app.listen(PORT, () => {
        console.log(`API Gateway started successfully on PORT ${PORT}`);
    });
}

setupAndStartServer();
