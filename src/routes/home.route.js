// esta ruta debe mostrar todos los productos al momento en http://localhost:8080/home

import {Router} from 'express';

import { productController } from '../controllers/products.controller.js';

const homeRouter = Router();


homeRouter.get ('/', productController.getAll)

export default homeRouter 
