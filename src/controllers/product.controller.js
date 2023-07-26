import { ProductService } from '../repositories/index.js'
export const getAllProductsController = async (req, res) => {
  const { limit, page, query, sort } = req.query
  console.log("refactorizado")
  const result = await  ProductService.getAll(limit, page, query, sort)
  res.send(result)
}

export const getProductByIdController = async (req, res) => {
  const { pid } = req.params
  console.log(req.params)
  const product = await ProductService.getById(pid)
  if (product === "Not found") {
    res.send({ error: "Producto no existe" })
  } else {
    res.send(product)
  }
}

export const createProductController = async (req, res) => {
  
  let { title, description, price, thumbnails, code, stock/* , status, category */ } = req.body
  if (!title || !description || !price || !thumbnails || !code || !stock /* || !status || !category */) {
    return res.status(400).send({ status: "error", error: "Datos incompletos" })
  }
  await  ProductService.create(title, description, price, thumbnails, code, stock/* , status, category */)
  req.io.emit('dataProduct', await  ProductService.getAll())
  res.send({ status: "success", message: "Product Created" })
}

export const udpateProductController = async (req, res) => {
  let { pid } = req.params
  const mensaje = await ProductService.update(pid, req.body)
  if (mensaje === "No se ha encontrado un objeto con el id especificado.") {
    return res.status(404).send({ status: "error", message: "Producto no encontrado" })
  }
  req.io.emit('dataProduct', await ProductService.getAll())
  res.send({ status: "success", message: "Producto actualizado" })
}

export const deleteProductController = async (req, res) => {
  let { pid } = req.params
  const mensaje = await ProductService.delete(pid)
  if (mensaje === "No se ha encontrado un objeto con el id especificado.") {
    return res.status(404).send({ status: "error", message: "Producto no encontrado" })
  }
  req.io.emit('dataProduct', await ProductService.getAll())
  res.send({ status: "success", message: "Producto eliminado" })
}