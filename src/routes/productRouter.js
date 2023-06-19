import { Router } from "express";
import ProductManagerMongo from "../dao/managers/mongoDBmanager/ProductManagerMongo.js";
import productModel from "../dao/models/products.model.js";

const productManager = new ProductManagerMongo;
const productRouter = Router();

productRouter.post ('/', async (req,res) => {
    let newPr = req.body;
    let product = new productModel (newPr)
    product.save()
    .then(pr => {
        res.status(201).send ({
            msg:'producto guardado',
            data: pr
        })
    })
    .catch (err => console.log(err))
    
})

export default productRouter