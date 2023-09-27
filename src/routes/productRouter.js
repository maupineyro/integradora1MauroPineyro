//debe usar al controller y relacionarse al main server

import { Router } from "express";
import { productController } from "../controllers/products.controller.js";
import { handleRoleAccess } from "../middlewares/handleRoleAccess.js";
const productRouter = Router();

// Políticas de acceso permitidas
const allowedPolicies = ['PUBLIC', 'ADMIN', 'PREMIUM'];

//Product Endpoints
productRouter.get('/', productController.getAll ) //get

productRouter.get('/:pid', productController.getProduct) //get by ID

productRouter.post ('/',handleRoleAccess(['ADMIN', 'PREMIUM']),productController.add ) //post

productRouter.delete ('/:pid', productController.delete ) //delete ny ID

productRouter.put ('/:pid', productController.update ) //update


export default productRouter