
const express=require('express');
const bodyParser=require('body-parser');

const { PORT } =require ('./config/serverconfig');
const apiroutes=require('./routes/index')

const db =require('./models/index');
const { Airplane }= require('./models/index');


const setupAndStartServer= async () =>{
    const app=express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api', apiroutes );
    
    app.listen(PORT, async ()=>{
        console.log(`Server started at ${PORT}`);  

        if(process.env.SYNC_DB){
            db.sequelize.sync({alter : true});
        }
        // await Airplane.create({
        //     modelNumber:'kanatara te ri te '
        // })


    });
}

setupAndStartServer();

