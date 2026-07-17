
require('dotenv').config();
const express = require('express');


const bodyParser = require('body-parser');

const {PORT} = require('./Config/serverConfig'); 

const {sendBasicEmail} = require('./services/email-service');

const cron = require('node-cron');

const setupAndStartServer = () =>
{
    const app = express();  
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.listen(PORT, async () =>
    {
        console.log(`Server is running on port ${PORT}`);

        // sendBasicEmail(
        //     'support@airline.com', 
        //     'user@example.com', 
        //     'Welcome to Airline Management System', 
        //     'Thank you for registering with us. We are excited to have you on board!');
        
        cron.schedule('*/2 * * * *', async () => {
            console.log('running a task every two minutes')
        });
    });
}   

setupAndStartServer();