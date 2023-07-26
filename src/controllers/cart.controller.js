import { CartManagerMongoDB } from '../dao/mongoManagers/CartManagerMongoDB.js';
const cartManager = new CartManagerMongoDB()

export const createCartController = async (req, res) => {
  const result = await cartManager.addCart()
  console.log(result)
  res.send({ status: "success", message: "Cart Created", payload: result })
}

export const getProductsFromCart = async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cartManager.getCartById(cid);
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
  res.status(result.statusCode).json(result.response)
}

export const addProductToCartController = async (req, res) => {
  const { cid, pid } = req.params
  const cart = await cartManager.addProductCart(cid, pid)
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
  const cart = await cartManager.removeProductCart(cid, pid);
  if (cart === "Not Found") {
    return res.send({ status: "error", message: "Cart not found" });
  }
  res.send({ status: "success", message: "Product removed from cart" });
}

export const updateCartController = async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;
  const cart = await cartManager.updateCart(cid, products);
  if (cart === "Not Found") {
    return res.send({ status: "error", message: "Cart not found" });
  }
  res.send({ status: "success", message: "Cart updated", cart });
}

export const updateProductQtyFromCartController = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const cart = await cartManager.updateProductQuantity(cid, pid, quantity);
  if (cart === "Not Found") {
    return res.send({ status: "error", message: "Cart or Product not found" });
  }
  res.send({ status: "success", message: "Product quantity updated", cart });
}

export const clearCartController = async (req, res) => {
  try {
    const cid = req.params.cid;
    const result = await cartManager.deleteCart(cid);
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