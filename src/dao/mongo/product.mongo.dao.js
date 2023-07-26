import { ProductManagerMongoDB } from '../mongoManagers/ProductManagerMongoDB.js';
const productManager = new ProductManagerMongoDB()
export default class Product {
    constructor() {}
    getAll = async(limit, page, query, sort) => await productManager.getProducts({ limit, page, query, sort })
    getById = async(id) =>  await productManager.getProductById(id)
    create = async(title, description, price, thumbnails, code, stock) =>await productManager.addProduct(title, description, price, thumbnails, code, stock/* , status, category */)
    update = async(id, data) =>  await productManager.updateProduct(id, data)
    delete = async(id) => await productManager.deleteProduct(id)
}