import express from 'express'
const router = express.Router()
import { ProductManager } from "../ProductManager.js";
const productManager = new ProductManager('./src/productos.json')

router.get('/', (req, res) => {
    const productos=productManager.getProducts()
    res.render('index', {productos})
})

export default router