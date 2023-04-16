import express, { json, urlencoded } from "express";
import productRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'

const app = express()
app.use(json())
app.use(urlencoded({extended:true}))

app.use('/products',productRouter)
app.use('/carts',cartRouter)


app.listen(8080,()=>console.log("servidor encendido en puerto 8080"))