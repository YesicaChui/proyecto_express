import fs from 'fs'

export class CartManager {
  constructor(path) {
    // this.products = []
    // this.idCounter = 0
    this.path = path
    const contenido = fs.readFileSync(this.path, 'utf-8')
    this.carts = JSON.parse(contenido)
    const ids = this.carts.map(objeto => objeto.id);    
    const mayorId = ids.length===0?0:Math.max(...ids)
    this.idCounter = mayorId
  }

  addCart() {
    this.idCounter++
    const id = this.idCounter
    const products = []
    this.carts.push({ id, products })
    fs.writeFileSync(this.path, JSON.stringify(this.carts, null, '\t'))
  }

  getCartById(id) {
    for (const cart of this.carts) {
      if (cart.id === id) {
        return cart
      }
    }
    return "Not found"
  }

  addProductCart(cid, pid) {
    // que todos los campos sean obligatorios
    if (!cid || !pid) return
    // Validar que no se repita el campo “code” 
    const indiceCart = this.carts.findIndex((cart) => cart.id === cid)
    if (indiceCart === -1) return "Not Found"
    const indiceProduct = this.carts[indiceCart].products.findIndex((product) => product.product === pid)
    if (indiceProduct === -1) {
      this.carts[indiceCart].products.push({
        product: pid,
        quantity: 1
      })
    } else {
      this.carts[indiceCart].products[indiceProduct].quantity = this.carts[indiceCart].products[indiceProduct].quantity + 1
    }

    fs.writeFileSync(this.path, JSON.stringify(this.carts, null, '\t'))
  }


}