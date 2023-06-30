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
        const role = (email === 'adminCoder@coder.com' && password === 'admin2023') ? 'admin' : 'user';
        const theUserExists = await userManager.getUserByEmail(email) 
        if(theUserExists) return res.send({status:'error', message:"el email se encuentra registrado, use otro por favor"})
        const user = {// instancio la estructura de usuario
            email: email,
            password:password,
            role: role
        }
        await userManager.addUser(user);
        res.status(200).send({status: 'success', message:'usuario agregado correctamente'});
        

    } catch (error) {
        console.log(error)
    }
})

export default sessionRouter;