import { Router } from "express";

const viewRouter = Router();

viewRouter.get('/', async (req,res)=>{
    res.redirect('/login')
})

viewRouter.get ('/register', async (req,res)=>{
    res.render('register', {})
})



viewRouter.get ('/login', async (req,res)=>{
    res.render('login', {})
})

viewRouter.get('/profile',async (req,res)  =>{
    let userlogged = await req.session.user
    res.render('profile',{user: userlogged})
})




export default viewRouter;