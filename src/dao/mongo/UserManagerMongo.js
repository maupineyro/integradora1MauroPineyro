import userModel from "./models/users.model.js";

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
    
    getUserById = async (id) =>{
        try {
         const UserById = await userModel.findById({_id: id});
        } catch (error) {
            
        }
    }

    getUserByEmail = async (email)=>{
        try {
            const UserByEmail = await userModel.findOne({email: email});
            return UserByEmail;
        } catch (error) {
            console.log(error)
        }
    }

    getUserByLoginFields = async (email, password)=>{
        try {
            const UserLoginFields = await userModel.findOne ({email:email, password:password});// ({propiedad:parámetro, propiedad: parámetro})
            return UserLoginFields;
        } catch (error) {
            console.log(error)
        }
    }

}// cierra la clase UserManag...

export default UserManagerMongo;