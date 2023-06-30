import { Router } from "express";
import UserManagerMongo from "../dao/managers/mongoDB/UserManagerMongo.js";

const sessionRouter = Router();
const userManager = new UserManagerMongo;

sessionRouter.get ('/register', async (req,res)=>{
    res.render('register', {})
})

sessionRouter.post('/register', async (req,res)=>{
    try {
        const {email, password} = req.body;
        console.log (email, password)
        
        if(!email || !password) return res.send ({status:'error', message:'todos los campos son requeridos'});
        const theUserExists = await userManager.getUserByEmail(email) 
        if(theUserExists) return res.send({status:'error', message:"el email se encuentra registrado, use otro por favor"})
        const user = {// instancio la estructura de usuario
            email,
            password
        }
        const registeredUser = await userManager.addUser(user);
        
        return registeredUser;
        

    } catch (error) {
        console.log(error)
    }
})

export default sessionRouter;