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


export default router;