//debe manejar la ruta  (probar en thunderclient o postman)

import { Router } from "express";
import CartManagerMongo from "../dao/managers/mongoDB/CartManagerMongo.js";

const cartRouter = Router();
const cartManager = new CartManagerMongo;

//post
cartRouter.post ('/', async (req,res)=>{
try {
    const newCart = await cartManager.addCart(req.body);
    res.status(200).send(`carrito agregado a db: ${newCart}`)
} catch (error) {
    console.log (`sufriendo el error ${error}`);
    res.status(500).send(`error al crear carrito: ${error}`)
    
}
})

//get
cartRouter.get ('/', async (req,res)=>{
    try {
        const AllCarts = await cartManager.getCarts();
        res.status(200).send(AllCarts);
    } catch (error) {
        res.status(500).send(`se sufre este ${error}`)  
    }
   
})


//get cart by Id
cartRouter.get ('/:cid', async (req,res)=>{
    
})


export default cartRouter