const nodemailer= require('nodemailer');

const { EMAIL_ID,PASSWORD }=require('./serverConfig');

const sender=nodemailer.createTransport({
    service: "gmail",
    auth :{
        user:EMAIL_ID,
        pass: PASSWORD

    }
})
 

module.exports=sender;