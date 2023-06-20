//este se encarga de la ruta http://localhost:8080/api/products ; 
//debe mostrar el listado de productos como "objetos" y permitirme el manejo con thunderclient o postman

import { Router } from "express";
import ProductManagerMongo from "../dao/managers/mongoDB/ProductManagerMongo.js";


const productManager = new ProductManagerMongo;
const productRouter = Router();


//get
productRouter.get('/', async (req,res) =>{
try {
    const AllProducts = await productManager.getProducts();
    res.status(200).send(AllProducts);
} catch (error) {
    res.status(500).send(`se sufre este ${error}`)
    }
})

//get by ID
productRouter.get('/:pid',async (req,res)=>{
    let pid = req.params.pid;
    try {
        const singleProduct = await productManager.getProductById(pid);
        res.status(200).send(singleProduct);
    } catch (error) {
        res.status(500).send(`se sufre este ${error}`)
    }
})// testeo con http://localhost:8080/api/products/6490b9fa6d4469bf83beb3bc   y  http://localhost:8080/api/products/6490d3481d58e7fa78cac873

//post
productRouter.post ('/', async (req,res) => {
    try {
        let newPr = await productManager.addProducts(req.body);
        res.status(201).send({newPr}) 
        

  
    } catch (error) {
        res.status(500).send(`se sufre este ${error}`)
    }
   
})

//delete
productRouter.delete ('/:pid', async (req,res) => {
    let pid = req.params.pid;
    try {
        let deleted = await productManager.deleteProductById(pid)
        res.status(201).send(`el producto fue eliminado`) 
        
    } catch (error) {
        res.status(500).send(`se sufre este ${error}`)
    }
   
})


export default productRouter