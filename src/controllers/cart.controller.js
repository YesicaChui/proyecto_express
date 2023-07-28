import { CartService, ProductService,TicketService } from '../repositories/index.js';
import { sendEmail } from './email.controller.js';
export const createCartController = async (req, res) => {
  const result = await CartService.addCart()
  console.log(result)
  res.send({ status: "success", message: "Cart Created", payload: result })
}

export const getProductsFromCart = async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await CartService.getCartById(cid);
    if (cart === "Not found") {
      return {
        statusCode: 404,
        response: { status: 'error', error: 'Not found' }
      }
    } else {
      return {
        statusCode: 200,
        response: { status: 'success', payload: cart }
      }
    }

  } catch (err) {
    return {
      statusCode: 500,
      response: { status: 'error', error: err.message }
    }
  }
}


export const getProductsFromCartController = async (req, res) => {
  const result = await getProductsFromCart(req, res)
  console.log("Refactor cart")
  res.status(result.statusCode).json(result.response)
}

export const addProductToCartController = async (req, res) => {
  const { cid, pid } = req.params
  const cart = await CartService.addProductCart(cid, pid)
  if (cart === "error") {
    return res.send({ status: "error", message: "incomplete data" })
  }
  if (cart === "Not Found") {
    return res.send({ status: "error", message: "Cart Not found" })
  }

  return res.send({ status: "success", message: "ProductCart agregado", payload: cart })
}

export const deleteProductFromCartController = async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await CartService.removeProductCart(cid, pid);
  if (cart === "Not Found") {
    return res.send({ status: "error", message: "Cart not found" });
  }
  res.send({ status: "success", message: "Product removed from cart" });
}

export const updateCartController = async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;
  const cart = await CartService.updateCart(cid, products);
  if (cart === "Not Found") {
    return res.send({ status: "error", message: "Cart not found" });
  }
  res.send({ status: "success", message: "Cart updated", cart });
}

export const updateProductQtyFromCartController = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const cart = await CartService.updateProductQuantity(cid, pid, quantity);
  if (cart === "Not Found") {
    return res.send({ status: "error", message: "Cart or Product not found" });
  }
  res.send({ status: "success", message: "Product quantity updated", cart });
}

export const clearCartController = async (req, res) => {
  try {
    const cid = req.params.cid;
    const result = await CartService.deleteCart(cid);
    if (result === "Not Found") {
      res.status(404).json({ message: "Cart not found" });
    } else {
      res.json({ message: "Cart deleted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const purchase = async (req, res) => {
  try {
    console.log("purchase", req.user)
    const cid = req.params.cid;
    const cart = await CartService.getCartById(cid);

    if (!cart || cart.products.length === 0) {
      return res.status(404).json({ message: "Cart not found or empty" });
    }

    // Crear un array para almacenar los productos que no pudieron ser comprados
    const productsNotPurchased = [];

    // Variable para almacenar el total de la compra
    let totalPurchaseAmount = 0;

    // Array para almacenar los productos comprados en el ticket
    const purchasedProducts = [];

    // Recorrer los productos del carrito para verificar el stock y realizar la compra
    for (const productItem of cart.products) {
      const product = await ProductService.getById(productItem.product);

      if (!product || product.stock < productItem.quantity) {
        // El producto no tiene suficiente stock para la cantidad indicada en el carrito
        // Agregar el producto al array de productos no comprados
        productsNotPurchased.push(productItem.product);
      } else {
        // Actualizar el stock del producto
        product.stock -= productItem.quantity;
        await ProductService.update(product._id, { stock: product.stock });

        // Calcular el precio total del producto en base a la cantidad
        const totalPrice = productItem.quantity * product.price;

        // Sumar el precio total del producto al total de la compra
        totalPurchaseAmount += totalPrice;

        // Agregar el producto al array de productos comprados en el ticket
        purchasedProducts.push({
          product: productItem.product,
          quantity: productItem.quantity,
          totalPrice: totalPrice,
        });
      }
    }
    const outOfStockIds = productsNotPurchased.map(p => p._id);
    if (purchasedProducts.length === 0) {
     return  res.json({ message: "Purchase completed", ticket:{}, outOfStockIds });
    }
    
    const updatedCart = {
      products: cart.products.filter(item => {
        const productId = item.product._id; 
        return outOfStockIds.includes(productId);
      })
    }

    await CartService.updateCart(cid, updatedCart); // Actualizar el carrito en la base de datos

    // Crear un nuevo ticket con los detalles de la compra
    const newTicket = {
      amount: totalPurchaseAmount,
      purchaser: req.user.email,
      products: purchasedProducts, 
    };

    // Guardar el nuevo ticket en la base de datos
    const ticket = await TicketService.create(newTicket)
    console.log(ticket)
    const dataEmail = await Promise.all(purchasedProducts.map(async el => {
      const product = await ProductService.getById(el.product);
      return {
        product: product.title,
        quantity: el.quantity,
        PU: el.totalPrice/el.quantity,
        totalPrice: el.totalPrice,
      };
    }));
    console.log("datos de email")
    console.log(dataEmail)
    const resultEmail=await sendEmail( req.user.email,dataEmail,`¡Ha llegado tu Comprobante de tu compra! Siendo un total de S/. ${totalPurchaseAmount}`)
    console.log(resultEmail)
    // Devolver la información del ticket generado
    res.json({ message: "Purchase completed", ticket, outOfStockIds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};