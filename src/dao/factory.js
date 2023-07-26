import config from "../config/config.js";

export let Product
export let Cart
export let User

switch (config.persistence) {
    case 'MONGO':
        const { default: ProductMongoDAO } = await import('./mongo/product.mongo.dao.js')
        Product = ProductMongoDAO
        const { default: CartMongoDAO } = await import('./mongo/cart.mongo.dao.js')
        Cart = CartMongoDAO
        const { default: UserMongoDAO } = await import('./mongo/user.mongo.dao.js')
        User = UserMongoDAO
        break;
    default:
        break;
}