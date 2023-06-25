// esta ruta debe mostrar todos los productos en tiempo real en http://localhost:8080/realtimeproducts , debe trabajar con socket.io

import {Router} from 'express';
import ProductManagerMongo from '../dao/managers/mongoDB/ProductManagerMongo.js';

const realTimeRouter = Router();
const productManager = new ProductManagerMongo;


realTimeRouter.get ('/', async (req, res) =>{
    
    try {
        
        res.render ('realtimeproducts', 
        { documentTitle: "Ecommerce - Realtime",
        
    })
        
    } catch (error) {
        console.log(error)
    } //cierra el try-catch

     
    
})

export default realTimeRouter