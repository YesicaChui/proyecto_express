import { Product,Cart,User } from '../dao/factory.js'

import ProductRepository from './product.repository.js'
import CartRepository from './cart.repository.js'
import UserRepository from './user.repository.js'

export const ProductService = new ProductRepository(new Product())
export const CartService = new CartRepository(new Cart())
export const UserService = new UserRepository(new User())