
import CustomError from "../services/errors/customError.js";
import EErrors from "../services/errors/errorsEnum.js";
import { generateUserErrorInfo } from "../services/errors/errorMessages.js";
//import UserService from "../services/users.service.js";
import { usersService } from "../services/factory.js";



export const getAllUsers = async (req, res)=>{
    
    try {
        let users = await usersService.getUsers();
        res.send({message: "success", payload:users});
    } catch (error) {
        console.error(error);
        res.status(500).send ({error:error ,message:"no se pudo obtener los usuarios"})
    }
}

export const saveUser = async (req, res)=>{
    try {
        console.log (req.body)
        const {first_name, last_name, email, age} = req.body //revisar para adaptar a lo hecho en passport register
        if (!first_name || !email){
            CustomError.createError({
                name: "user creation error",
                cause: generateUserErrorInfo ({first_name, last_name, email, age}),
                message: "error al crear user",
                code: EErrors.INVALID_TYPES_ERROR
            })
        }
        //completar los pasos para guardar el user en db, volver a ver clase 32 ( 1h32min) para adaptar la parte final.

    } catch (error) {
         console.error(error);
        res.status(500).send ({error: error.code , message: error.message})
        
    }
}

export const changeMembership = async (req, res) =>{
 const uid = req.params.uid
 const userDb = await usersService.getUserById(uid)

 if (!userDb) {
    res.status(404).send('El usuario no existe');
    return;
  }

 try {
    let newRole = '';
    userDb.role === 'user' ? newRole= 'premium' : newRole = 'user'
    
    await usersService.updateUser({_id:uid},{role:newRole});
    
    const result = await usersService.getUserById(uid);
    console.log("el user modificado es:", result)
    return res.status(200).send('El rol del usuario se ha actualizado correctamente');
 } catch (error) {
    console.log (error)
 }
}