import { Router } from "express";
import ProductManagerMongo from "../dao/managers/mongoDBmanager/ProductManagerMongo.js";
import productModel from "../dao/models/products.model.js";

const productManager = new ProductManagerMongo;
const productRouter = Router();

productRouter.get('/', async (req,res) =>{

})

productRouter.post ('/', async (req,res) => {
    try {
        let newPr = req.body;
        let saveProduct = await productManager.addProducts(newPr)
    } catch (error) {
        console.log(error)
    }
   
})

export default productRouter