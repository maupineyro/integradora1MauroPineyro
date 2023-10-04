//debe manejar la ruta de cart (probar en thunderclient o postman)

import { Router } from "express";
import { cartController } from "../controllers/carts.controller.js";
import { CartPolicies } from "../middlewares/handleRoleAccess.js";

const cartRouter = Router();

//Cart Endpoints

cartRouter.post ('/', cartController.add) //add

cartRouter.get ('/', cartController.getAll) //get carts

cartRouter.get ('/:cid',cartController.getCart) //get cart by Id

cartRouter.post ('/:cid/products/:pid',CartPolicies, cartController.productToCart) //post (product en carrito)

cartRouter.delete ('/:cid/products/:pid', cartController.deleteProduct) //delete un producto del carrito según su Id

cartRouter.delete('/:cid', cartController.deleteAll) //delete todos los productos del carrito seleccionado

cartRouter.put('/:cid', cartController.updateCart) //update carrito

cartRouter.put('/:cid/products/:pid', cartController.updateQty) //update cantidad de un producto en el cart

export default cartRouter