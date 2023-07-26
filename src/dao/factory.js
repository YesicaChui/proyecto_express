import config from "../config/config.js";

export let Product
export let Cart

switch (config.persistence) {
    case 'MONGO':
        const { default: ProductMongoDAO } = await import('./mongo/product.mongo.dao.js')
        Product = ProductMongoDAO
        const { default: CartMongoDAO } = await import('./mongo/cart.mongo.dao.js')
        Cart = CartMongoDAO
        break;
    default:
        break;
}