import { Router } from "express";

const sessionRouter = Router();


sessionRouter.post('/register', async (req,res)=>{
    try {
        const {email, password} = req.body;
        const role = (email === 'adminCoder@coder.com' && password === admin2023) ? 'admin' : 'user';
        if(!email || !password) return res.send ({status:error, message:'todos los campos son requeridos'});

    } catch (error) {
        console.log(error)
    }
})

export default sessionRouter;