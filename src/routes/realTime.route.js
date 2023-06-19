
import {Router} from 'express';
import ProductManagerMongo from '../dao/managers/mongoDBmanager/ProductManagerMongo.js';

const realTimeRouter = Router();
const productManagerMongo = new ProductManagerMongo;



realTimeRouter.get ('/', async (req, res) =>{
    
    
    res.render ('realtimeproducts', 
    { documentTitle: "WebSockets & Handlebars",
        
    })
})

export default realTimeRouter