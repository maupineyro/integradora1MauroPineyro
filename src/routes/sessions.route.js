import { Router } from "express";
import UserManagerMongo from "../dao/managers/mongoDB/UserManagerMongo.js";
import passport from "passport";

const sessionRouter = Router();
const userManager = new UserManagerMongo;

//Register
sessionRouter.post('/register', passport.authenticate('register', {failureRedirect: '/RegisterFailed'}), async (req,res)=>{
    res.send ('Usuario registrado') 
})

sessionRouter.get('/RegisterFailed', async (req,res)=>{
    res.send('Falla al registrar usuario')
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

//logout get
sessionRouter.get('/logout', async (req,res)=>{
    req.session.destroy(err =>{
    if (err) return res.send({status: 'error', message: err})   
    })
    res.redirect('/login')
})

export default sessionRouter;