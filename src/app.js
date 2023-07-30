import express, { json, urlencoded } from "express";
import productRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'
import handlebars from 'express-handlebars'
import routerViews from './routes/views.router.js'
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
import config from './config/config.js'
import emailRoute from './routes/email.router.js'
import mocking from './routes/mock.router.js'
import errorHandler from './middlewares/error.middleware.js'
export const PORT = config.apiserver.port

const app = express()
app.use(json())
app.use(urlencoded({ extended: true }))
//configuracion handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(cookieParser())

app.use(express.static('./src/public'))

app.use(session({
  store: MongoStore.create({
    mongoUrl: config.mongo.uri,
    dbName: config.mongo.dbname
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
  //await mongoose.connect('mongodb+srv://yesicachuic:yesica@backendbasico.s7qaobr.mongodb.net/ecommerce')
  await mongoose.connect(config.mongo.uri, {
    dbName: config.mongo.dbname,
    useUnifiedTopology: true
  })
  const httpServer = app.listen(PORT, () => console.log(`servidor encendido en puerto ${PORT}`))
  const socketServer = new Server(httpServer)
  app.use((req, res, next) => {
    req.io = socketServer
    next()
  })
  app.get('/', (req, res) => {
    res.redirect('/api/sessions/login');
  });
  app.use('/views', routerViews)
  app.use('/products', productRouter)
  app.use('/api/carts', cartRouter)
  app.use('/api/sessions', sessionRouter)
  app.use("/chat", chatRouter)
  app.use("/email",emailRoute)
  app.use("/mockingproducts",mocking)
  app.use(errorHandler)
  Sockets(socketServer)

} catch (error) {
  console.log('No se pude conectar con la BD')
}



