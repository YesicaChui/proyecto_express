import express, { json, urlencoded } from "express";
import productRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'
import handlebars from 'express-handlebars'
import  routerViews from './routes/views.router.js'
import __dirname from './utils.js'
import { Server } from 'socket.io'
const app = express()
app.use(json())
app.use(urlencoded({extended:true}))
//configuracion handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

app.use(express.static('./src/public'))


const httpServer = app.listen(8080,()=>console.log("servidor encendido en puerto 8080"))
const socketServer = new Server(httpServer)
app.use('/', routerViews)
app.use('/products',productRouter(socketServer))
app.use('/carts',cartRouter)

socketServer.on('connection', (socketClient) => {
  console.log(`Nuevo cliente ${socketClient.id} conectado...`)
})