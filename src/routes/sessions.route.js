import { Router } from "express";
import UserManagerMongo from "../dao/managers/mongoDB/UserManagerMongo.js";

const sessionRouter = Router();
const userManager = new UserManagerMongo;

//Register post
sessionRouter.post('/register', async (req,res)=>{
    try {
        const {email, password} = req.body;
        if( !email || !password) return res.send({status:'error', message:"todos los campos son requeridos"})
        const role = (email === 'adminCoder@coder.com' && password === 'admin2023') ? 'admin' : 'user';
        const theUserExists = await userManager.getUserByEmail(email) 
        if(theUserExists) return res.send({status:'error', message:"el email se encuentra registrado, use otro por favor"})
        const user = {// instancio la estructura de usuario
            email: email,
            password:password,
            role: role
        }
        await userManager.addUser(user);
        //return res.status(200).send({status: 'success', message:'usuario agregado correctamente'});
        res.redirect ('/login');
    } catch (error) {
        res.status(400).send({status:'error', message:`${error}`})
    }
})

//login post

sessionRouter.post('/login', async (req,res) => {
    try {
        const {email, password} = req.body;
        const userRegisteredInDB = await userManager.getUserByLoginFields (email, password)
        if (!userRegisteredInDB) return res.send({status:'error', message:'Usuario no encontrado: email o password incorrectos'});
        //return res.json(userRegisteredInDB)
        req.session.user = {
            email: userRegisteredInDB.email,
            password: userRegisteredInDB.password,
            role: userRegisteredInDB.role
        }
        //console.log(req.session.user)
        res.redirect('/home')
        
    } catch (error) {
        res.status(400).send({status:'error', message:`${error}`})
    }
})


sessionRouter.get('/logout', async (req,res)=>{
    req.session.destroy(err =>{
    if (err) return res.send({status: 'error', message: err})   
    })
    res.redirect('/login')
})

export default sessionRouter;