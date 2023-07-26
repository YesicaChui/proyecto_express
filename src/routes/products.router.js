import { Router } from 'express'
const router = Router();
import {
  getAllProductsController,
  getProductByIdController,
  createProductController,
  udpateProductController,
  deleteProductController
} from '../controllers/product.controller.js'
import { authTokenAdmin } from '../utils.js';

router.get('/', getAllProductsController)

router.get('/:pid', getProductByIdController)

router.post('/',authTokenAdmin, createProductController)

router.put('/:pid',authTokenAdmin, udpateProductController)

router.delete('/:pid',authTokenAdmin, deleteProductController)

export default router
