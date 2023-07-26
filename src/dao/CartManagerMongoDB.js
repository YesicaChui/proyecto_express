import cartModel from "./models/cart.model.js";

export class CartManagerMongoDB {
  constructor () {

   // this.carts = JSON.parse(contenido)
    this.carts =[]
  }

  async addCart() {
    const products = []
 /*   
    fs.writeFileSync(this.path, JSON.stringify(this.carts, null, '\t'))
 */  
    const cartGenerated = new cartModel({ products })
    return await cartGenerated.save()
  }

  async getCartById(id) {
    const cart = await cartModel.findOne({ _id:id }).lean().exec()
    if(!cart) return "Not found"
    return cart
  }

  async addProductCart(cid, pid) {
    // que todos los campos sean obligatorios
    if (!cid || !pid) return "error"
    // Validar que no se repita el campo “code” 
    const cart = await cartModel.findOne({ _id: cid }).lean().exec()
    if(!cart) return "Not found"
    const productIndex = cart.products.findIndex((product) => product.product.toString() === pid);
    if (productIndex === -1) {
      cart.products.push({
        product: pid,
        quantity: 1,
      });
    } else {
      cart.products[productIndex].quantity += 1;
    }
  
    return await cartModel.findByIdAndUpdate({ _id: cid }, { products: cart.products }, { returnDocument: 'after' }).exec();
   }

   async removeProductCart(cid, pid) {
    if (!cid || !pid) return;
    const cart = await cartModel.findOne({ _id: cid });
    if (!cart) return "Not Found";
    const productIndex = cart.products.findIndex(
      (product) => product.product === pid
    );
    if (productIndex === -1) {
      return "Not Found";
    } else {
      cart.products.splice(productIndex, 1);
      await cartModel.updateOne({ _id: cid }, { products: cart.products }).exec();
      return cart;
    }
  }

  async updateCart(cid, products) {
    if (!cid) return;
    const cart = await cartModel.findOne({ _id: cid });
    if (!cart) return "Not Found";
    cart.products = products;
    await cartModel.updateOne({ _id: cid }, { products: cart.products }).exec();
    return cart;
  }


  async updateProductQuantity(cid, pid, quantity) {
    if (!cid || !pid) return;
    const cart = await cartModel.findOne({ _id: cid });
    if (!cart) return "Not Found";
    const productIndex = cart.products.findIndex(
      (product) => product.product === pid
    );
    if (productIndex === -1) {
      return "Not Found";
    } else {
      cart.products[productIndex].quantity = quantity;
      await cartModel.updateOne({ _id: cid }, { products: cart.products }).exec();
      return cart;
    }
  }

  async deleteCart(cid) {
    if (!cid) return;
    const result = await cartModel.deleteOne({ _id: cid });
    if (result.deletedCount === 0) return "Not Found";
    return result;
  }

  async getCartById(id) {
    const cart = await cartModel.findOne({ _id:id })
                                  .populate('products.product')
                                  .lean()
                                  .exec();
    if (!cart) return "Not found";
    return cart;
  }
}