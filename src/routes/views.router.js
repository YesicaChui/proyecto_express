import express from 'express'
const router = express.Router()
import { ProductManagerMongoDB } from '../dao/ProductManagerMongoDB.js'
const productManager = new ProductManagerMongoDB()

const auth = (req,res, next)=>{
    console.log("en el auth")
    console.log(req.session.user)
    if(req.session.user) return next()
    return res.send('Error de authentication')
}

router.get('/', async (req, res) => {
    const { limit, page, query, sort } = req.query
    const productos =await productManager.getProducts({ limit, page, query, sort })
    //const productos = mproductos.payload.map(p => p.toObject())
   
    res.render('index', {  productos })
})

router.get('/realtimeproducts', async (req, res) => {
    const { limit, page, query, sort } = req.query
    const productos =await productManager.getProducts({ limit, page, query, sort })
    res.render('productsocket', { productos})
})

router.get('/products',auth, async (req, res) => {
    const { limit, page, query, sort } = req.query
    const productos =await productManager.getProducts({ limit, page, query, sort })
    //const productos = mproductos.payload.map(p => p.toObject())   
    res.render('index', {  productos,profile:req.session.user  })
})
export default router
