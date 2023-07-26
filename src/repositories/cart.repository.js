export default class CartRepository {
  constructor(dao) {
      this.dao = dao
  }

  addCart = async() => await this.dao.addCart()
  getCartById = async(id) =>  await this.dao.getCartById(id)
  addProductCart = async(id,pid) =>await this.dao.addProductCart(id,pid)
  removeProductCart = async(id, pid) =>  await this.dao.removeProductCart(id, pid)
  updateCart = async(id, data) =>  await this.dao.updateCart(id, data)
  updateProductQuantity = async(id, pid, quantity) =>  await this.dao.updateProductQuantity(id, pid, quantity)
  deleteCart = async(id) => await this.dao.deleteCart(id)

}