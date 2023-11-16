//debe mostrar la ruta http://www.localhost:8080/chat

import {Router} from 'express';
import { isUser } from '../middlewares/auth.js';
const chatRouter = Router();

chatRouter.get('/',isUser, (req,res) =>{
    res.render('chat', {})
})

export default chatRouter