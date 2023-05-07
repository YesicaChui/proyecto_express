import {Router} from 'express'
import { CartManagerMongoDB } from '../dao/CartManagerMongoDB.js';
const cartManager = new CartManagerMongoDB()
const router = Router();
//aqui las rutas de carts
router.post('/',async (req,res)=>{
  await cartManager.addCart()
  res.send({status:"success",message:"Cart Created"})
})

router.get('/:cid',async (req,res)=>{
  const {cid}=req.params
  const cart=await cartManager.getCartById(Number(cid))
  if(cart==="Not found"){
    return res.send({status:"error",message:"Cart Not found"})
  }  
  res.send(cart)
})

router.post('/:cid/product/:pid',async (req,res)=>{
  const {cid,pid}=req.params
  const cart=await cartManager.addProductCart(Number(cid),Number(pid))
  if(cart==="Not Found"){
    return res.send({status:"error",message:"Cart Not found"})
  }  
  res.send({status:"success",message:"ProductCart agregado"})
})
export default router;