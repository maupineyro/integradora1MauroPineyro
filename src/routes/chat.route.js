//debe mostrar la ruta http://www.localhost:8080/chat

import {Router} from 'express';
const chatRouter = Router();

chatRouter.get('/', (req,res) =>{
    res.render('chat', {})
})

export default chatRouter