import { Router } from 'express'
const router = Router();
import {
  getAllProductsController,
  getProductByIdController,
  createProductController,
  udpateProductController,
  deleteProductController
} from '../controllers/product.controller.js'

router.get('/', getAllProductsController)

router.get('/:pid', getProductByIdController)

router.post('/', createProductController)

router.put('/:pid', udpateProductController)

router.delete('/:pid', deleteProductController)

export default router
