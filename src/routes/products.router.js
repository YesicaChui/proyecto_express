import {Router} from 'express'
import { ProductManager } from "../ProductManager.js";
const productManager = new ProductManager('./src/productManager.json')
const router = Router();


router.get('/',(req,res)=>{
  const {limit}=req.query
  console.log(req.query)
  if(limit!=undefined){
    res.send(productManager.getProducts().slice(0,limit))
  }else{
    res.send(productManager.getProducts())
  }
})

router.get('/:pid',(req,res)=>{
  const {pid}=req.params
  console.log(req.params)
  const product = productManager.getProductById(Number(pid))
  if(product ==="Not found"){
    res.send({error:"Producto no existe"})
  }else{
    res.send(product)
  }
})

router.post('/',(req,res)=>{
  let {title, description, price, thumbnail, code, stock} = req.body
  if (!title || !description || !price || !thumbnail || !code || !stock){
    return res.status(400).send({status:"error",error:"Datos incompletos"})
  }
  productManager.addProduct(title, description, price, thumbnail, code, stock)
  res.send({status:"success",message:"Product Created"})
})


export default router;