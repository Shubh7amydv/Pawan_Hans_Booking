const express=require('express');
const app=express();
const bodyParser=require('body-parser');

const { PORT,FLIGHT_SERVICE_PATH }= require('./config/serverconfig')
const apiRoutes=require('./Routes/index')

const db=require('./models/index')

const setupAndStartServer=()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);
    
    app.listen(PORT,()=>{
        console.log(`Port started at ${PORT}`);

        if(process.env.DB_SYNC){
                db.sequelize.sync({alter:true});
        }

        console.log(FLIGHT_SERVICE_PATH); 

    })
}

setupAndStartServer();



