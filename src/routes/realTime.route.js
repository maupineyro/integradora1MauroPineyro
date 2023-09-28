// esta ruta debe mostrar todos los productos en tiempo real en http://localhost:8080/realtimeproducts , debe trabajar con socket.io

import {Router} from 'express';
import { isAdminOrPremium } from '../middlewares/auth.js';


const realTimeRouter = Router();



realTimeRouter.get ('/',isAdminOrPremium, async (req, res) =>{
    
    try {
        
        res.render ('realtimeproducts', 
        { documentTitle: "Ecommerce - Realtime",
        
    })
        
    } catch (error) {
        console.log(error)
    } //cierra el try-catch

     
    
})

export default realTimeRouter