import CustomError from "../services/errors/customError.js";
import EErrors from "../services/errors/errorsEnum.js";
import { generateUserErrorInfo } from "../services/errors/errorMessages.js";

export const getUsers = async (req, res)=>{
    const users = []; // cambiar luego x dbUsers
    try {
        res.send({message: "success", payload:users})
    } catch (error) {
        console.error(error);
        res.status(500).send ({error:error ,message:"no se pudo obtener los usuarios"})
    }
}

export const saveUsers = async (req, res)=>{
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