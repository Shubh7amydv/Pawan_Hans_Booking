
const express=require('express');
const router=express.Router();
const {authRequestValidator}=require('../../middlewares/index');

const userControllers=require("../../controllers/user-controllers");

router.post('/signup',
    authRequestValidator.valdiateUserAuth,
     userControllers.createUser);

router.post('/signin',
    authRequestValidator.valdiateUserAuth,
    userControllers.signIn);


router.get('/isAuthenticated',userControllers.isAuthenticated)

module.exports=router;


