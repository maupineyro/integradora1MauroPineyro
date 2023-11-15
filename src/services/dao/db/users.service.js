import userModel from "./models/users.model.js";

export default class UserService {
//    
    addUsers = async (user) =>{
        try {
            const newUser = await userModel.save(user);
            return newUser;
        } catch (error) {
            console.log(error);
        }
       
        
    };
//
    getUsers = async () =>{
         try {
           const AllUsers = await userModel.find({});
           return AllUsers;
        } catch (error) {
            console.log(error)
        }
    }
//
    getUserById = async (id) => {
        try {
         const userById = await userModel.findById({_id: id});
         return userById;
        } catch (error) {
          console.log(error)  
        }
    }
//  
     getUserByEmail = async (email)=>{
        try {
            const UserByEmail = await userModel.findOne({email: email});
            return UserByEmail;
        } catch (error) {
            console.log(error)
        }
    }
//
    getUserByLoginFields = async (email, password)=>{
        try {
            const UserLoginFields = await userModel.findOne ({email:email, password:password});// ({propiedad:parámetro, propiedad: parámetro})
            return UserLoginFields;
        } catch (error) {
            console.log(error)
        }
    }
//
    currentUser = async (req) => {
        try {
            if (!req.session.user) {
            return null;
            }  
            return req.session.user;
        } catch (error) {
            console.log(error)
        }
    }    
    // Obtener el usuario logueado haciendo >> const user = await currentUser(req);

    // Obtener el rol del usuario logueado haciendo >> const role = user.role;
}// cierra la class

// 
