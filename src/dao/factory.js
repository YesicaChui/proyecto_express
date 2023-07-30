import config from "../config/config.js";

export let Product
export let Cart
export let User
export let Ticket
switch (config.persistence) {
    case 'MONGO':
        const { default: ProductMongoDAO } = await import('./mongo/product.mongo.dao.js')
        Product = ProductMongoDAO
        const { default: CartMongoDAO } = await import('./mongo/cart.mongo.dao.js')
        Cart = CartMongoDAO
        const { default: UserMongoDAO } = await import('./mongo/user.mongo.dao.js')
        User = UserMongoDAO
        const { default: TicketMongoDAO } = await import('./mongo/ticket.mongo.dao.js')
        Ticket = TicketMongoDAO
        break;
    default:
        break;
}