// esta ruta debe mostrar todos los productos en tiempo real en http://localhost:8080/realtimeproducts , debe trabajar con socket.io

import {Router} from 'express';

const realTimeRouter = Router();




realTimeRouter.get ('/', async (req, res) =>{
    
    
    res.render ('realtimeproducts', 
    { documentTitle: "Ecommerce - Realtime",
        
    })
})

export default realTimeRouter