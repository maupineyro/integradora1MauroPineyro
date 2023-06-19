import express from 'express';
import {Router} from 'express';
import ProductManagerMongo from '../dao/managers/mongoDBmanager/ProductManagerMongo.js';

const realTimeRouter = Router();
const productManagerMongo = new ProductManagerMongo;



realTimeRouter.get ('/', async (req, res) =>{
    
    
    res.render ('realtimeproducts', 
    { documentTitle: "WebSockets & Handlebars",
        
    })
})

realTimeRouter.post ('/', async (req, res) =>{
    
    const newProductSaved = await productManagerMongo.addProducts()
    res.send ('producto guardado en DB')
})


export default realTimeRouter