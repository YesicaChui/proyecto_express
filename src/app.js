import express, { json, urlencoded } from "express";
import productRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'
import handlebars from 'express-handlebars'
import  routerViews from './routes/views.router.js'
import __dirname from './utils.js'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import sessionRouter from './routes/session.router.js'
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from 'passport'
import initializePassport from "./passport.config.js";
import cookieParser from 'cookie-parser'
import chatRouter from './routes/chat.router.js'
import Sockets from './sockets.js'
const app = express()
app.use(json())
app.use(urlencoded({extended:true}))
//configuracion handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')
app.use(cookieParser())

app.use(express.static('./src/public'))

app.use(session({
  store: MongoStore.create({
      mongoUrl: 'mongodb+srv://yesicachuic:yesica@backendbasico.s7qaobr.mongodb.net',
      dbName: 'ecommerce'
  }),
  secret: 'mysecret',
  resave: true,
  saveUninitialized: true
}))



mongoose.set('strictQuery', false)
initializePassport()
app.use(passport.initialize())
app.use(passport.session())
try {
  await mongoose.connect('mongodb+srv://yesicachuic:yesica@backendbasico.s7qaobr.mongodb.net/ecommerce')
  const httpServer = app.listen(8080,()=>console.log("servidor encendido en puerto 8080"))
  const socketServer = new Server(httpServer)
  app.use((req, res, next) => {
    req.io = socketServer
    next()
})
  app.get('/', (req, res) => {
    res.redirect('/api/sessions/login');
  });
  app.use('/views', routerViews)
  app.use('/products',productRouter)
  app.use('/api/carts',cartRouter)
  app.use('/api/sessions',sessionRouter)
  app.use("/chat", chatRouter)
  
  Sockets(socketServer)
/*   socketServer.on('connection', async(socketClient) => {
    console.log(`Nuevo cliente ${socketClient.id} conectado...`)
    socket.broadcast.emit('alerta')
    let messages = await messageModel.find().lean().exec()
    socket.emit("logs", messages)
    socket.on("message", async data => {
        await messageModel.create(data)
        let messages = await messageModel.find().lean().exec()
        io.emit("logs", messages)
    })
  }) */


} catch (error) {
  console.log('No se pude conectar con la BD')
}



