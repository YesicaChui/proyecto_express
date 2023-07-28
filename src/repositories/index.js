import { Product,Cart,User,Ticket } from '../dao/factory.js'

import ProductRepository from './product.repository.js'
import CartRepository from './cart.repository.js'
import UserRepository from './user.repository.js'
import TicketRepository from './ticket.repository.js'

export const ProductService = new ProductRepository(new Product())
export const CartService = new CartRepository(new Cart())
export const UserService = new UserRepository(new User())
export const TicketService = new TicketRepository(new Ticket())