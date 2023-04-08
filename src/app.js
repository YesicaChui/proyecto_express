import { ProductManager } from "./ProductManager.js";
const productManager = new ProductManager('./src/productManager.json')
import express from "express";
const app = express()

app.get('/products',(req,res)=>{
  const {limit}=req.query
  console.log(req.query)
  if(limit!=undefined){
    res.send(productManager.getProducts().slice(0,limit))
  }else{
    res.send(productManager.getProducts())
  }
})

app.get('/products/:pid',(req,res)=>{
  const {pid}=req.params
  console.log(req.params)
  const product = productManager.getProductById(Number(pid))
  if(product ==="Not found"){
    res.send({error:"Producto no existe"})
  }else{
    res.send(product)
  }
})

app.listen(8080,()=>console.log("servidor encendido en puerto 8080"))