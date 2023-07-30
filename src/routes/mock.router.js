import { Router } from 'express'
import { generateProduct } from '../utils.js'

const router = Router()

router.get('/', async (req, res) => {
    const products = []
    for (let index = 0; index < 4; index++) {
      products.push(generateProduct())
    }
    res.json({ status: 'success', payload: products })
})

export  default router