//debe usar al controller y relacionarse al main server

import { Router } from "express";
import { productController } from "../controllers/products.controller.js";
const productRouter = Router();

//Rutas de producto
productRouter.get('/', productController.getAll ) //get

productRouter.get('/:pid', productController.getProduct) //get by ID

productRouter.post ('/',productController.add ) //post

productRouter.delete ('/:pid', productController.delete ) //delete ny ID

productRouter.put ('/:pid', productController.update ) //update


export default productRouter