// esta ruta debe mostrar todos los productos al momento en http://localhost:8080/home

import {Router} from 'express';
import ProductManagerMongo from '../dao/managers/mongoDB/ProductManagerMongo.js';

const homeRouter = Router();
const productManager = new ProductManagerMongo;

//get
homeRouter.get ('/', async (req, res) =>{
try {
    const AllProducts = await productManager.getProducts();
    res.render ('home', { 
        documentTitle: "Ecommerce - Home",
        products: AllProducts
    })
} catch (error) {
    console.log(error);
}   
})

export default homeRouter 
