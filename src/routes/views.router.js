import express from 'express'
const router = express.Router()
import { ProductManagerMongoDB } from '../dao/ProductManagerMongoDB.js'
const productManager = new ProductManagerMongoDB()

router.get('/', async (req, res) => {
    const productos =await productManager.getProducts()
    res.render('index', { productos })
})

router.get('/realtimeproducts', async (req, res) => {
    const productos =await productManager.getProducts()
    res.render('productsocket', { productos })
})

export default router
