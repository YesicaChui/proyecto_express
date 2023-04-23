import { Router } from 'express'
import { ProductManager } from "../ProductManager.js";
const productManager = new ProductManager('./src/productos.json')
const router = Router();

export default function (io) {
  router.get('/', (req, res) => {
    const { limit } = req.query
    console.log(req.query)
    if (limit != undefined) {
      res.send(productManager.getProducts().slice(0, limit))
    } else {
      res.send(productManager.getProducts())
    }
  })

  router.get('/:pid', (req, res) => {
    const { pid } = req.params
    console.log(req.params)
    const product = productManager.getProductById(Number(pid))
    if (product === "Not found") {
      res.send({ error: "Producto no existe" })
    } else {
      res.send(product)
    }
  })

  router.post('/', (req, res) => {
    let { title, description, price, thumbnails, code, stock, status, category } = req.body
    if (!title || !description || !price || !thumbnails || !code || !stock || !status || !category) {
      return res.status(400).send({ status: "error", error: "Datos incompletos" })
    }
    productManager.addProduct(title, description, price, thumbnails, code, stock, status, category)
    io.emit('dataProduct',productManager.getProducts())
    res.send({ status: "success", message: "Product Created" })
  })

  router.put('/:pid', (req, res) => {
    let { pid } = req.params
    const mensaje = productManager.updateProduct(Number(pid), req.body)
    if (mensaje === "No se ha encontrado un objeto con el id especificado.") {
      return res.status(404).send({ status: "error", message: "Producto no encontrado" })
    }
    io.emit('dataProduct',productManager.getProducts())
    res.send({ status: "success", message: "Producto actualizado" })
  })

  router.delete('/:pid', (req, res) => {
    let { pid } = req.params
    const mensaje = productManager.deleteProduct(Number(pid))
    if (mensaje === "No se ha encontrado un objeto con el id especificado.") {
      return res.status(404).send({ status: "error", message: "Producto no encontrado" })
    }
    io.emit('dataProduct',productManager.getProducts())
    res.send({ status: "success", message: "Producto eliminado" })
  })
  return router
}