import {Router} from 'express'
import { CartManagerMongoDB } from '../dao/CartManagerMongoDB.js';
const cartManager = new CartManagerMongoDB()
const router = Router();
//aqui las rutas de carts
router.post('/',async (req,res)=>{
  await cartManager.addCart()
  res.send({status:"success",message:"Cart Created"})
})

router.get('/:cid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cartManager.getCartById(cid);
    if (cart === "Not found") {
      res.status(404).json({ message: "Cart not found" });
    } else {
      res.json(cart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post('/:cid/product/:pid',async (req,res)=>{
  const {cid,pid}=req.params
  const cart=await cartManager.addProductCart(cid,pid)
  if(cart==="Not Found"){
    return res.send({status:"error",message:"Cart Not found"})
  }  
  res.send({status:"success",message:"ProductCart agregado"})
})

router.delete('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await cartManager.removeProductCart(cid, pid);
  if (cart === "Not Found") {
    return res.send({ status: "error", message: "Cart not found" });
  }
  res.send({ status: "success", message: "Product removed from cart" });
});

router.put('/:cid', async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;
  const cart = await cartManager.updateCart(cid, products);
  if (cart === "Not Found") {
    return res.send({ status: "error", message: "Cart not found" });
  }
  res.send({ status: "success", message: "Cart updated", cart });
});

router.put('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const cart = await cartManager.updateProductQuantity(cid, pid, quantity);
  if (cart === "Not Found") {
    return res.send({ status: "error", message: "Cart or Product not found" });
  }
  res.send({ status: "success", message: "Product quantity updated", cart });
});

router.delete('/:cid', async (req, res) => {
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
});



export default router;