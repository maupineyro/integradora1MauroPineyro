import { Router } from "express";
import { productController } from "../controllers/products.controller.js";

const mockRouter = Router();

mockRouter.get('/', (req, res) => {
  productController.getMockingProducts(req, res);})


export default mockRouter;