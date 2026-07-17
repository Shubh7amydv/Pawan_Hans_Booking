const { User }=require('../models/index');

class UserRepository {

   async createUser(data){
        try {
            const user=await User.create(data);
            return user;
        } catch (error) {
            console.log("Error while creating user in UserRepository");
            throw error;
        }
   }

   // we are creating this method to get our user through userid but dont want other details like hashed password as it will be visible on frontend.So we have to select specifc attributes from tables, for this we will use attributes under findByPk
   async getById(userId){
    try {
        const user=await User.findByPk(userId,{
            attributes:["email","id","password"]
        });
        return user;
    } catch (error) {
        console.log("Error while getting user in UserRepository");
        throw error;
    }
   }


   async getByEmail(userEmail){
    try {
        const user=await User.findOne({
            where: {
                email:userEmail,
            }
        });
        return user;
    } catch (error) {
        console.log("Error while getting user in UserRepository");
        throw error;
    }

   }
   
}

module.exports=UserRepository;