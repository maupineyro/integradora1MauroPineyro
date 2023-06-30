//debe manejar la ruta  (probar en thunderclient o postman)

import { Router } from "express";
import CartManagerMongo from "../dao/managers/mongoDB/CartManagerMongo.js";

const cartRouter = Router();
const cartManager = new CartManagerMongo;

//post de carrito
cartRouter.post ('/', async (req,res)=>{
    try {
        const newCart = await cartManager.addCart(req.body);
        res.status(200).send(`carrito agregado a db: ${newCart}`)
    } catch (error) {
        console.log (`sufriendo el error ${error}`);
        res.status(500).send(`error al crear carrito: ${error}`)
    }
})

//post (product en carrito)
cartRouter.post ('/:cid/products/:pid', async (req,res)=>{
    
    try {
        let cid = req.params.cid;
        let pid = req.params.pid;
        const productAddedToCart = await cartManager.addProductToCart(cid,pid);

        res.status(200).send(productAddedToCart);
    } catch (error) {
        res.status(500).send(`se sufre este ${error}`)   
    } 
})

//get carts
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
    
    try {
        let cid = req.params.cid;
        const singleCart = await cartManager.getCartById(cid);
        if (!singleCart) return "carrito no encontrado";
        res.status(200).send(singleCart);
    } catch (error) {
        res.status(500).send(`se sufre este ${error}`)   
    }

    
})

//delete un producto del carrito según su Id
cartRouter.delete ('/:cid/products/:pid', async (req, res)=>{
    try {
        let cid = req.params.cid;
        let pid = req.params.pid;
        const deleteAProductFromCart = await cartManager.deleteSingleProduct(cid, pid);
        res.status(200).send(deleteAProductFromCart);
    } catch (error) {
        console.log(error)
    }
})


//delete todos los productos del carrito seleccionado
cartRouter.delete('/:cid',async (req, res)=>{
    try {
        let cid = req.params.cid;
        const deleteProducts = await cartManager.deleteAllProductsFromCart(cid);
        res.status(200).send(deleteProducts)
    } catch (error) {
        console.log(error)
    }
})

//update carrito
cartRouter.put('/:cid',async(req,res)=>{

})

cartRouter.put('/:cid/products/:pid',async(req,res)=>{

})


export default cartRouter