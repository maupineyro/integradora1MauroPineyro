import userModel from "../../models/users.model.js";

class UserManagerMongo {

    //Agregar usuario
    addUser = async (user)=>{
        try {
            const NewUser = await userModel.create(user);
            return NewUser;
        } catch (error) {
            console.log(error)
        }
    }

    //Obtener usuarios
    getUsers = async () =>{
        try {
           const AllUsers = await userModel.find({});
           return AllUsers;
        } catch (error) {
            console.log(error)
        }
    }

    //Obtener usuario por ID, (uid = user id)
    
    getUserById = async (uid) =>{
        try {
         const UserById = await userModel.findById({_id: uid});
        } catch (error) {
            
        }
    }

}// cierra la clase UserManag...