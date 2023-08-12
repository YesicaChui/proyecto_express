import {Router} from 'express'

const router = Router();
import { 
  createCartController, 
  getProductsFromCartController, 
  addProductToCartController, 
  deleteProductFromCartController, 
  updateCartController,
  updateProductQtyFromCartController,
  clearCartController,
  purchase
} from '../controllers/cart.controller.js'
import { authTokenUser } from '../utils.js';
//aqui las rutas de carts
router.post('/',createCartController)

router.get('/:cid', getProductsFromCartController);

router.put('/:cid', updateCartController);

router.delete('/:cid', clearCartController);

router.post('/:cid/product/:pid',authTokenUser, addProductToCartController)

router.delete('/:cid/products/:pid', deleteProductFromCartController);


router.put('/:cid/products/:pid', updateProductQtyFromCartController);


router.post('/:cid/purchase', authTokenUser, purchase)

export default router;