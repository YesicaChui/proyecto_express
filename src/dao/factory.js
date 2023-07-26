import config from "../config/config.js";

export let Product

switch (config.persistence) {
    case 'MONGO':
        const { default: ProductMongoDAO } = await import('./mongo/product.mongo.dao.js')
        Product = ProductMongoDAO
        break;
    default:
        break;
}