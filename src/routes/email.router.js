import { Router } from 'express'
import { signup, getbill } from '../controllers/email.controller.js'

const router = Router()

router.post('/user/signup', signup)
router.post('/cart/billing', getbill)

export default router