import { Router } from "express";
import { productController } from "../controllers/products.controller.js";

const mockRouter = Router();

mockRouter.get('/', productController.getMockingProducts())


export default mockRouter;