import { Product,Cart } from '../dao/factory.js'

import ProductRepository from './product.repository.js'
import CartRepository from './cart.repository.js'

export const ProductService = new ProductRepository(new Product())
export const CartService = new CartRepository(new Cart())