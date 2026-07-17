const  UserRepository=require('../repository/user-repository');

const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const {JWT_KEY}=require('../config/serverConfig');

class UserService{
    constructor(){
        this.userRepository= new UserRepository();
    }

    createUser(data){
        try {
            return this.userRepository.createUser(data);
        } catch (error) {
            console.log("Error while creating user in UserService");
            throw error;
        }
    }
    createToken(user){
        try {
            const result =jwt.sign(user,JWT_KEY,{expiresIn:'1h'});
            return result;
        } catch (error) {
            console.log("Something  went wrong in token creation");
            throw error;
        }
    }


    verifyToken(token){
        try {
            const response=jwt.verify(token,JWT_KEY);
            return response;
            
        } catch (error) {
            console.log("Error went wrong in token validation");
            throw error;  
        }
    }

    checkpassword(userInputPlainPassword,encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("Error went wrong in password matcher");
            throw error;  
            
        }
    }

    async signIn(email, plainPassword){
        try {
            // Fetch the user using email
            const user= await this.userRepository.getByEmail(email);
            
            // Compare incoming plane password with encrypted password 
            const passwordMatch=this.checkpassword(plainPassword,user.password);
            if(!passwordMatch){
                console.log("Password doesnt match");
                throw{error:'incorrect password'};
            }

            // If match->>> create a token and send it 
             const newJWT=this.createToken({email:user.email, id:user.id});
             return newJWT;
            
        } catch (error) {
            console.log("Something went wrong in sign in process");
            throw error;  
            
        }
    }

    async isAuthenticated(token){
        try {
            // Get the token and verify wheter it is a valid token or not 
            const response=this.verifyToken(token);

            // if token is invalid return "invalid Token"
            if(!response){
                throw { error: "Invlid Token"}
            }

            // If token is valid and user doesnt exist ?? then what 
            const user=await this.userRepository.getById(response.id);
            if(!user){
                throw {error:"NO user with the corresponding data exist "}
            }

            return user.id;
                
        } catch (error) {
            throw {error:"Something went wrong in auth process"};
        
        }
    }
        
}

module.exports=UserService;
















// classes and constructor ==> pascal case
// function,varibales,methods,object properties===> camelc case
// Dont import like below---- 
// const  { UserRepository }=require('../repository/user-repository');