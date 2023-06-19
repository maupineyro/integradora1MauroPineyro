import { Router } from "express";
import ProductManagerMongo from "../dao/managers/mongoDBmanager/ProductManagerMongo.js";
import productModel from "../dao/models/products.model.js";

const productManager = new ProductManagerMongo;
const productRouter = Router();

productRouter.post ('/', async (req,res) => {
    let newPr = req.body;
    let saveProduct = await productManager.addProducts(newPr)
})

export default productRouter