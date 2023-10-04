import userModel from "./models/users.model.js";


class UserService {
//    
    addUsers = async (user) =>{
        const newUser = new userModel(user).save();
        return newUser
    };
//
    getUsers = async () =>{

    }
//
    getSingleUser = async () => {

    }
//    



}

export default UserService