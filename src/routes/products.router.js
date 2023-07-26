import { Router } from 'express'
import { ProductManagerMongoDB } from '../dao/ProductManagerMongoDB.js';
const productManager = new ProductManagerMongoDB()
const router = Router();


router.get('/', async (req, res) => {
  const { limit, page, query, sort } = req.query
  const result = await productManager.getProducts({ limit, page, query, sort })
  res.send(result)
})

router.get('/:pid', async (req, res) => {
  const { pid } = req.params
  console.log(req.params)
  const product = await productManager.getProductById(pid)
  if (product === "Not found") {
    res.send({ error: "Producto no existe" })
  } else {
    res.send(product)
  }
})

router.post('/', async (req, res) => {
  let { title, description, price, thumbnails, code, stock/* , status, category */ } = req.body
  if (!title || !description || !price || !thumbnails || !code || !stock /* || !status || !category */) {
    return res.status(400).send({ status: "error", error: "Datos incompletos" })
  }
  await productManager.addProduct(title, description, price, thumbnails, code, stock/* , status, category */)
  req.io.emit('dataProduct', await productManager.getProducts())
  res.send({ status: "success", message: "Product Created" })
})

router.put('/:pid', async (req, res) => {
  let { pid } = req.params
  const mensaje = await productManager.updateProduct(pid, req.body)
  if (mensaje === "No se ha encontrado un objeto con el id especificado.") {
    return res.status(404).send({ status: "error", message: "Producto no encontrado" })
  }
  req.io.emit('dataProduct', await productManager.getProducts())
  res.send({ status: "success", message: "Producto actualizado" })
})

router.delete('/:pid', async (req, res) => {
  let { pid } = req.params
  const mensaje = await productManager.deleteProduct(pid)
  if (mensaje === "No se ha encontrado un objeto con el id especificado.") {
    return res.status(404).send({ status: "error", message: "Producto no encontrado" })
  }
  req.io.emit('dataProduct', await productManager.getProducts())
  res.send({ status: "success", message: "Producto eliminado" })
})
return router
