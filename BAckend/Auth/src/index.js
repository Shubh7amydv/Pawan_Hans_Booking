require('dotenv').config();

const express=require('express');

const bodyParser=require('body-parser');

const apiroutes=require('./routes/index')

const { PORT, JWT_KEY }=require("./config/serverConfig")
// const UserRepository=require("./repository/user-repository");
// const UserService=require("./services/user-services");




const prepareAndStartServer = ()=>{

    const app=express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api', apiroutes );

    app.listen(PORT,async ()=>{
        console.log(`Server started at port : ${ PORT }`)

        // code to check for user repo metho getbyId
        
        // const repo=new UserRepository();
        // const response= await repo.getById(6);
        // console.log(response);


        // To check create token of service ayer

        // const service=new UserService();
        // const response= await service.createToken({email:"MamtaYadav@gmail.com ", id:6});
        // console.log("new token is ",response);


        // to check verify Token

        // const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ik1hbXRhWWFkYXZAZ21haWwuY29tICIsImlkIjo2LCJpYXQiOjE3Njk4ODUwMTgsImV4cCI6MTc2OTg4ODYxOH0.-DMBdEbEiDmMkMViiWLs-F7C6-KOHwVlZEeLaKZ9eEo';
        // const check=await service.verifyToken(token);
        // console.log(check);





    })
}

prepareAndStartServer();
  