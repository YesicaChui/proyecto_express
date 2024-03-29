import { ProductService } from '../repositories/index.js'
import logger from '../logger.js'
import { sendGenericEmail } from './email.controller.js'
export const getAllProductsController = async (req, res) => {
  const { limit, page, query, sort } = req.query
  const result = await ProductService.getAll(limit, page, query, sort)
  res.send(result)
}

export const getProductByIdController = async (req, res) => {
  const { pid } = req.params
  const product = await ProductService.getById(pid)
  if (product === "Not found") {
    res.send({ error: "Producto no existe" })
  } else {
    res.send(product)
  }
}

export const createProductController = async (req, res) => {
  logger.log('debug', `ingreso a createController`)
  let { title, description, price, thumbnails, code, stock/* , status, category */ } = req.body
  if (!title || !description || !price || !thumbnails || !code || !stock /* || !status || !category */) {
    logger.log('debug', `intento de creacion de un producto con datos incompletos`)
    return res.status(400).send({ status: "error", error: "Datos incompletos" })
    /*     const product = req.body
        CustomError.createError({
          name: 'Product creation error',
          cause: createProductErrorInfo(product),
          message: 'Error typing to create a product',
          code: EErros.INVALID_TYPES_ERROR
        })   */




  }
  const product = req.body
  product.owner = req.user.email
  await ProductService.create(product/* , status, category */)
  req.io.emit('dataProduct', await ProductService.getAll())
  res.send({ status: "success", message: "Product Created" })
}

export const udpateProductController = async (req, res) => {
  let { pid } = req.params
  if (req.session.user.role === 'premium') {
    const product = await ProductService.getById(pid)
    if (product.owner !== req.session.user.email) {
      return res.status(403).json({ status: 'error', error: 'Not Authorized' })
    }
  }
  const mensaje = await ProductService.update(pid, req.body)
  if (mensaje === "No se ha encontrado un objeto con el id especificado.") {
    return res.status(404).send({ status: "error", message: "Producto no encontrado" })
  }
  req.io.emit('dataProduct', await ProductService.getAll())
  res.send({ status: "success", message: "Producto actualizado" })
}

export const deleteProductController = async (req, res) => {
  let { pid } = req.params
  if (req.session.user.role === 'premium') {
    const product = await ProductService.getById(pid)
    if (product.owner !== req.session.user.email) {
      return res.status(403).json({ status: 'error', error: 'Not Authorized' })
    }
  }

  const deletedProduct = await ProductService.delete(pid)
  if (deletedProduct === "No se ha encontrado un objeto con el id especificado.") {
    return res.status(404).send({ status: "error", message: "Producto no encontrado" })
  }
  // Envía un correo electrónico al propietario del producto si es un usuario premium
  if (req.session.user.role === 'premium') {
    const ownerEmail = deletedProduct.owner;
    const productName = deletedProduct.title; // Supongo que el nombre del producto está en el campo 'title'
    const emailSubject = 'Producto Eliminado';
    const emailBody = `El producto "${productName}" ha sido eliminado.`;
    console.log("se envio el correo")
    // Utiliza tu función de envío de correo electrónico aquí
    await sendGenericEmail(ownerEmail, emailSubject, emailBody);
  }
  console.log("producgto eliminado")
  req.io.emit('dataProduct', await ProductService.getAll())
  res.send({ status: "success", message: "Producto eliminado" })
}