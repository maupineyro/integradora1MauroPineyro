import {Router} from 'express';
import ProductManagerMongo from '../dao/managers/mongoDBmanager/ProductManagerMongo.js';

const homeRouter = Router();
const productManager = new ProductManagerMongo;

//get
homeRouter.get ('/', async (req, res) =>{
try {
    const products = await productManager.getProducts();
    res.render ('home', { 
        documentTitle: "WebSockets & Handlebars",
        products: products
    })
} catch (error) {
    console.log(error);
}   
})

export default homeRouter