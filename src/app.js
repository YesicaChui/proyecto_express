import express, { json, urlencoded } from "express";
import productRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'
import handlebars from 'express-handlebars'
import  routerViews from './routes/views.router.js'
import __dirname from './utils.js'
const app = express()
app.use(json())
app.use(urlencoded({extended:true}))
//configuracion handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')


app.use('/', routerViews)
app.use('/products',productRouter)
app.use('/carts',cartRouter)


app.listen(8080,()=>console.log("servidor encendido en puerto 8080"))