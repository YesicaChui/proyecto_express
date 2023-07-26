import { CartManagerMongoDB } from '../mongoManagers/CartManagerMongoDB.js';
const cartManager = new CartManagerMongoDB()
export default class Product {
    constructor() {}
    addCart = async() => await cartManager.addCart()
    getCartById = async(id) =>  await cartManager.getCartById(id)
    addProductCart = async(id,pid) =>await cartManager.addProductCart(id,pid)
    removeProductCart = async(id, pid) =>  await cartManager.removeProductCart(id, pid)
    updateCart = async(id, data) =>  await cartManager.updateCart(id, data)
    updateProductQuantity = async(id, pid, quantity) =>  await cartManager.updateProductQuantity(id, pid, quantity)
    deleteCart = async(id) => await cartManager.deleteCart(id)
}