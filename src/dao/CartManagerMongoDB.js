import cartModel from "../models/cart.model.js";

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
    await cartGenerated.save()
  }

  async getCartById(id) {
    const cart = await cartModel.findOne({ _id:id }).lean().exec()
    if(!cart) return "Not found"
    return cart
  }

  async addProductCart(cid, pid) {
    // que todos los campos sean obligatorios
    if (!cid || !pid) return
    // Validar que no se repita el campo “code” 
    const cart = await cartModel.findOne({ _id: cid }).lean().exec()
    if(!cart) return "Not found"
    const productIndex = cart.products.findIndex((product) => product.product === pid);
    if (productIndex === -1) {
      cart.products.push({
        product: pid,
        quantity: 1,
      });
    } else {
      cart.products[productIndex].quantity += 1;
    }
  
    await cartModel.updateOne({ _id: cid }, { products: cart.products }).exec();
   }


}