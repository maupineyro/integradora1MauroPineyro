import { Router } from "express";
import UserManagerMongo from "../dao/managers/mongoDB/UserManagerMongo.js";
import passport from "passport";

const sessionRouter = Router();
const userManager = new UserManagerMongo;

//Register
sessionRouter.post('/register', passport.authenticate('register', {failureRedirect: '/api/sessions/failRegister'}), (req,res)=>{
    res.send ('Usuario registrado') 
})

sessionRouter.get('/failRegister', async (req, res)=>{
    res.send('Falla al registrar usuario')
})

//login post

sessionRouter.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/failLogin'}), async (req,res) => {
   if (!req.user){
    return res.json({error:'fail to login'})
   }
   req.session.user = {
    _id: req.user._id,
    name: req.user.name,
    lastname:req.user.lastname,
    email:req.user.email,
    role: req.user.role
   }
   console.log(req.session.user)
   let userlogged = req.session.user
   //res.render('profile', { user: userlogged });
   res.redirect('/profile')

   //return res.json({msg:'ok', payload:req.user})
   
   //res.redirect('/home')
})

sessionRouter.get('/failLogin', async (req,res)=>{
    return res.json({error: 'fail to login'})
})

//github  http://localhost:8080/api/sessions/github
sessionRouter.get('/github', passport.authenticate('github', {scope: ['user:email']}));

sessionRouter.get('/githubcallback',passport.authenticate('github',{failureRedirect:'/login'}), async (req,res)=>{
    req.session.user = req.user;
    res.redirect('/home')
})

sessionRouter.get('/showsession', async (req,res)=>{
    return res.send(JSON.stringify(req.session));
})


//logout get
sessionRouter.get('/logout', async (req,res)=>{
    req.session.destroy(err =>{
    if (err) return res.send({status: 'error', message: err})   
    })
    res.redirect('/login')
})

export default sessionRouter;