//debe usar al controller y relacionarse al main server

import { Router } from "express";
import { productController } from "../controllers/products.controller.js";
import { handleDeleteProductPolicies } from "../middlewares/handleRoleAccess.js";
import { adminOrPremiumPolicies } from "../middlewares/handleRoleAccess.js";

const productRouter = Router();



//Product Endpoints
productRouter.get('/', productController.getAll ) //get

productRouter.get('/:pid', productController.getProduct) //get by ID

productRouter.post ('/',adminOrPremiumPolicies ,productController.add ) //post

productRouter.delete ('/:pid',handleDeleteProductPolicies, productController.delete ) //delete ny ID

productRouter.put ('/:pid', productController.update ) //update


export default productRouter