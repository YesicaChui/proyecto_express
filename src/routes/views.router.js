import express from 'express'
const router = express.Router()
import { ProductManagerMongoDB } from '../dao/ProductManagerMongoDB.js'
const productManager = new ProductManagerMongoDB()

router.get('/', async (req, res) => {
    const { limit, page, query, sort } = req.query
    const productos =await productManager.getProducts({ limit, page, query, sort })
    //const productos = mproductos.payload.map(p => p.toObject())
    res.render('index', {  productos  })
})

router.get('/realtimeproducts', async (req, res) => {
    const { limit, page, query, sort } = req.query
    const productos =await productManager.getProducts({ limit, page, query, sort })
    res.render('productsocket', { productos})
})

router.get('/products', async (req, res) => {
    const { limit, page, query, sort } = req.query
    const productos =await productManager.getProducts({ limit, page, query, sort })
    //const productos = mproductos.payload.map(p => p.toObject())
    res.render('index', {  productos  })
})
export default router
