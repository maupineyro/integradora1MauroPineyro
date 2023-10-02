import { Router } from "express";
import passport from "passport";
import { accountLogged } from "../middlewares/auth.js";
import UserDto from "../dto/user.dto.js";
import { sendEmail } from "../controllers/emails.controller.js";
import { changeMembership } from "../controllers/users.controller.js";

const sessionRouter = Router();


//Register
sessionRouter.post('/register', passport.authenticate('register', {failureRedirect: '/api/sessions/failRegister'}), (req,res)=>{
    
    res.redirect('/login')
})

sessionRouter.get('/failRegister', async (req, res)=>{
    res.send('Falla al registrar usuario')
})

//login post

sessionRouter.post('/login', passport.authenticate('login',{failureRedirect:'/api/sessions/failLogin'}), async (req,res) => {
   if (!req.user){
    return res.json({error:'fail to login'})
   }
   req.session.user = {
    _id: req.user._id,
    first_name: req.user.first_name,
    last_name:req.user.last_name,
    email:req.user.email,
    age: req.user.age,
    cart:req.user.cart._id,
    role: req.user.role
   }
   console.log(req.session.user)
   let userlogged = req.session.user
   //res.render('profile', { user: userlogged });
   res.redirect('/profile')

   //return res.json({msg:'ok', payload:req.user})
   
   //res.redirect('/home')
})

sessionRouter.get('/failLogin', accountLogged, async (req,res)=>{
   // return res.json({error: 'fail to login'})
  
})

//github  http://localhost:8080/api/sessions/github
sessionRouter.get('/github', passport.authenticate('github', {scope: ['user:email']}));

sessionRouter.get('/githubcallback',passport.authenticate('github',{failureRedirect:'/login'}), async (req,res)=>{
    req.session.user = req.user;
    res.redirect('/home')
})

sessionRouter.get('/current', async (req,res)=>{
    if(req.session.user){
        let sessionDto = new UserDto(req.session.user)
        return res.send((sessionDto));
    }
    return res.send({msg:"No hay sesión activa", payload:(req.session)})
    
})

sessionRouter.get('/premium/:uid', changeMembership);


sessionRouter.get('/recoverpassword', async (req,res)=>{
     res.render('recoverpassword', {})
})

sessionRouter.post('/mailing', sendEmail);


//logout get
sessionRouter.get('/logout', (req,res)=>{
     req.session.destroy(err =>{
    if (err) return res.send({status: 'error', message: err})   
    })
    res.redirect('/login')
})

export default sessionRouter;