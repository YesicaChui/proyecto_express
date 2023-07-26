
import { getProductsFromCart } from "./cart.controller.js"
import { ProductManagerMongoDB } from '../dao/ProductManagerMongoDB.js'

const productManager = new ProductManagerMongoDB()
export const viewProductsController = async (req, res) => {
  const { limit, page, query, sort } = req.query
  const productos =await productManager.getProducts({ limit, page, query, sort })
  //const productos = mproductos.payload.map(p => p.toObject())   
  res.render('index', {  productos,profile:req.session.user  })
}

export const viewRealTimeProductsController = async (req, res) => {
  const { limit, page, query, sort } = req.query
  const productos =await productManager.getProducts({ limit, page, query, sort })
  res.render('productsocket', { productos})
}

export const viewProductsFromCartController = async(req, res) => {
  const result = await getProductsFromCart(req, res)
  if (result.statusCode === 200) {
      res.render('productsFromCart', { cart: result.response.payload })
  } else {
      res.status(result.statusCode).json({ status: 'error', error: result.response.error })
  }
}