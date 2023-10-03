//debe tomar los req y devolver los res, usando el cartService.

//import { cartService } from "../services/carts.service.js";
import { cartsService } from "../services/factory.js";

class CartController {
// 
    async add (req, res){
        try {
            const newCart = await cartsService.addCart(req.body);
            res.status(200).send(`carrito agregado a db: ${newCart}`)
        } catch (error) {
            console.log (`sufriendo el error ${error}`);
            res.status(500).send(`error al crear carrito: ${error}`)
        }
    }
//
    async getAll (req, res){
        try {
            const AllCarts = await cartsService.getCarts();
            res.status(200).send(AllCarts);
        } catch (error) {
            res.status(500).send(`se sufre este ${error}`)  
        }
    }
//
    async getCart (req, res) {
        try {
            let cid = req.params.cid;
            const singleCart = await cartsService.getCartById(cid);
            if (!singleCart) return "carrito no encontrado";
            //res.status(200).send(singleCart);
            res.status(200).render('cart',{cart: singleCart});
        } catch (error) {
            res.status(500).send(`se sufre este ${error}`)   
        }
    }
//
    async productToCart  (req, res){
        try {
            let cid = req.params.cid;
            let pid = req.params.pid;
            const productAddedToCart = await cartsService.addProductToCart(cid, pid);
            res.status(200).send(productAddedToCart);
        } catch (error) {
        res.status(500).send(`se sufre este ${error}`)   
        } 
    }
// 
    async deleteProduct (req, res){
        try {
            let cid = req.params.cid;
            let pid = req.params.pid;
            const deleteAProductFromCart = await cartsService.deleteSingleProduct(cid, pid);
            res.status(200).send(deleteAProductFromCart);
        } catch (error) {
            console.log(error)
        }
    }    
//
    async deleteAll (req, res){
        try {
            let cid = req.params.cid;
            const deleteProducts = await cartsService.deleteAllProductsFromCart(cid);
            res.status(200).send(deleteProducts)
        } catch (error) {
            console.log(error)
        }
    }
//
    async updateCart (req, res) {
        try {
            let cid = req.params.cid;
            let { products } =req.body;
            const updatedCart = await cartsService.updateCartById(cid, products);
            res.status(200).send(updatedCart);
        } catch (error) {
        console.log(error)
        }    
    }   
//  
    async updateQty (req, res){
        try {
            let cid = req.params.cid;
            let pid = req.params.pid;
            let quantity = req.body.quantity;
            const updatedQuantity = await cartsService.updateQuantity(cid, pid, quantity);
            res.status(200).send(updatedQuantity)
        } catch (error) {
            console.log(error)
        }
    }
}

export const cartController = new CartController;