import {Router} from 'express'
import { CartManager } from "../CartManager.js";
const cartManager = new CartManager('./src/carrito.json')
const router = Router();
//aqui las rutas de carts
router.post('/',(req,res)=>{
  cartManager.addCart()
  res.send({status:"success",message:"Cart Created"})
})

router.get('/:cid',(req,res)=>{
  const {cid}=req.params
  const cart=cartManager.getCartById(Number(cid))
  if(cart==="Not found"){
    return res.send({status:"error",message:"Cart Not found"})
  }  
  res.send(cart)
})

router.post('/:cid/product/:pid',(req,res)=>{
  const {cid,pid}=req.params
  const cart=cartManager.addProductCart(Number(cid),Number(pid))
  if(cart==="Not Found"){
    return res.send({status:"error",message:"Cart Not found"})
  }  
  res.send({status:"success",message:"ProductCart agregado"})
})
export default router;