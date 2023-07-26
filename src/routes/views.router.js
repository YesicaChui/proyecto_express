import express from 'express'
const router = express.Router()

import { auth } from '../middlewares/auth.middleware.js'
import { 
    viewProductsController,
    viewRealTimeProductsController,
    viewProductsFromCartController
} from '../controllers/view.controller.js'

router.get('/', auth, viewProductsController)

router.get('/realtimeproducts', viewRealTimeProductsController)

router.get('/products',auth, viewProductsController)

router.get('/:cid', viewProductsFromCartController)
export default router
