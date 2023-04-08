import fs from 'fs'

export class ProductManager {
  constructor(path) {
    this.products = []
    this.idCounter = 0
    this.path = path
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    // que todos los campos sean obligatorios
    if (!title || !description || !price || !thumbnail || !code || !stock) return
    // Validar que no se repita el campo “code” 
    for (const product of this.products) {
      if (product.code === code) return
    }
    // id autoincrementable
    this.idCounter++
    const id = this.idCounter
    // inseertando producto a products
    this.products.push({ id, title, description, price, thumbnail, code, stock })
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, '\t'))
  }
  getProducts() {
    const contenido = fs.readFileSync(this.path, 'utf-8')
    this.products = JSON.parse(contenido)
    const ids = this.products.map(objeto => objeto.id);
    const mayorId = Math.max(...ids)
    this.idCounter = mayorId
    return this.products
  }
  getProductById(id) {
    const contenido = fs.readFileSync(this.path, 'utf-8')
    this.products = JSON.parse(contenido)
    const ids = this.products.map(objeto => objeto.id);
    const mayorId = Math.max(...ids)
    this.idCounter = mayorId
    for (const product of this.products) {
      if (product.id === id) {
        return product
      }
    }
    return "Not found"
  }

  updateProduct(id, campos) {
    // verificando que no me envie el id en campos
    if(campos.id) return
    const contenido = fs.readFileSync(this.path, 'utf-8')
    this.products = JSON.parse(contenido)
    const ids = this.products.map(objeto => objeto.id);
    const mayorId = Math.max(...ids)
    this.idCounter = mayorId

    const indice = this.products.findIndex(objeto => objeto.id === id);

    if (indice !== -1) {
      this.products[indice] = {
        ...this.products[indice],
        ...campos
      }
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, '\t'))
      return "El objeto se ha actualizado correctamente."
    } else {
      return "No se ha encontrado un objeto con el id especificado."
    }
  }

  deleteProduct(id){
    const contenido = fs.readFileSync(this.path, 'utf-8')
    this.products = JSON.parse(contenido)
    const ids = this.products.map(objeto => objeto.id);
    const mayorId = Math.max(...ids)
    this.idCounter = mayorId
    const indice = this.products.findIndex(objeto => objeto.id === id);

    if (indice !== -1) {
      this.products.splice(indice,1)
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, '\t'))
      return "El objeto se ha eliminado correctamente."
    } else {
      return "No se ha encontrado un objeto con el id especificado."
    }
  }
}
// instanciamos la clase
/* const productManager = new ProductManager('./productManager.json')
productManager.addProduct("camisa roja","marca joh holden", 250,"ruta en firebase","CA-01", 5)
productManager.addProduct("pantalon","marca bambita", 70,"ruta en firebase2","PA-01", 3)
productManager.addProduct("camisa","marca sayon", 50,"ruta en firebase2","CA-01", 4)
productManager.addProduct("zapato","zapato adidas",200,"ruta en firebase2","ZA-01",3)
console.log(productManager.getProducts())
console.log(productManager.getProductById(2))
console.log(productManager.getProductById(6)) 

console.log(productManager.updateProduct(2,	{  
  "title": "pantalon grande",
  "description": "pantalon rojo",
  "price": 250,
  "thumbnail": "ruta en firebase2",
  "code": "ZA-01",
  "stock": 2
}))
console.log(productManager.getProducts())
console.log(productManager.deleteProduct(2))

console.log(productManager.getProducts()) */