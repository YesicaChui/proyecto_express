
import { getProductsFromCart } from "./cart.controller.js"
import { ProductService } from '../repositories/index.js'
export const viewProductsController = async (req, res) => {
  const { limit, page, query, sort } = req.query
  const productos =await ProductService.getAll(limit, page, query, sort )
  res.render('index', {  productos,profile:req.session.user  })
}

export const viewRealTimeProductsController = async (req, res) => {
  const { limit, page, query, sort } = req.query
  const productos =await ProductService.getAll( limit, page, query, sort )
  res.render('productsocket', { productos,profile:req.session.user})
}

export const viewProductsFromCartController = async(req, res) => {
  const result = await getProductsFromCart(req, res)
  if (result.statusCode === 200) {
      res.render('productsFromCart', { cart: result.response.payload })
  } else {
      res.status(result.statusCode).json({ status: 'error', error: result.response.error })
  }
}

export const viewUsersController = (req, res) => {
  console.log("renderizando user")
  if (req.session.user?.role === 'admin') {
      res.render('userAdmin',{})
  }else{
    return res.status(403).json({ status: 'error', error: 'Not Authorized' })
  }
}