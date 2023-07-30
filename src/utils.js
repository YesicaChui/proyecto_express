/* import path from 'path';
const __dirname = path.resolve(process.cwd());
export default __dirname */
import CustomError from './services/errors/custom_error.js'
import EErros from './services/errors/enums.js'
import { AuthorizedErrorInfo,AuthErrorInfo } from './services/errors/info.js'
import {fileURLToPath} from 'url'
import {dirname} from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { fakerES_MX as faker } from '@faker-js/faker'
const PRIVATE_KEY = 'c0d3r'

export const generateToken = user => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' })
    return token
}

export const authToken = (req, res, next) => {
    let token = req.headers.authorization
    if (!token) token = req.cookies["micookie"]
    if (!token) {
      CustomError.createError({
        name: 'Not Auth',
        cause: AuthErrorInfo(),
        message: 'Error verificando autenticacion',
        code: EErros.Auth_ERROR
    })
    }
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) {
          // return res.status(403).json({ error: 'Not authorized' })
          CustomError.createError({
            name: 'Not authorized',
            cause: AuthorizedErrorInfo(),
            message: 'Error verificando autorizacion',
            code: EErros.Authorized_ERROR
        })
        }
        req.user = credentials.user
        next()
    })
}

export const authTokenAdmin = (req, res, next) => {
  let token = req.headers.authorization
  if (!token) token = req.cookies["micookie"]
  if (!token) {
    CustomError.createError({
      name: 'Not Auth',
      cause: AuthErrorInfo(),
      message: 'Error verificando autenticacion',
      code: EErros.Auth_ERROR
  })
  }
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
      if (error) {
        // return res.status(403).json({ error: 'Not authorized' })
        CustomError.createError({
          name: 'Not authorized',
          cause: AuthorizedErrorInfo(),
          message: 'Error verificando autorizacion',
          code: EErros.Authorized_ERROR
      })
      }
      console.log(credentials.user)
      if(credentials.user.role!=='admin') {
        return res.status(403).json({ error: 'Not authorized' })
      }
      req.user = credentials.user
      next()
  })
}

export const authTokenUser = (req, res, next) => {
  let token = req.headers.authorization
  if (!token) token = req.cookies["micookie"]
  if (!token) {
    CustomError.createError({
      name: 'Not Auth',
      cause: AuthErrorInfo(),
      message: 'Error verificando autenticacion',
      code: EErros.Auth_ERROR
  })
  }
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
      if (error) {
        // return res.status(403).json({ error: 'Not authorized2' })

        CustomError.createError({
          name: 'Not authorized',
          cause: AuthorizedErrorInfo(),
          message: 'Error verificando autorizacion',
          code: EErros.Authorized_ERROR
      })
      }
      console.log("continue")
      if(credentials.user.role!=='usuario') return res.status(403).json({ error: 'Not authorized' })
      console.log("-----")
      console.log(credentials.user)
      console.log("-----")
      req.user = credentials.user
      next()
  })
}

const __filename= fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export default __dirname

export const createHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password)
}

export const generateProduct = () => {
  return {
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
      stock: 10,
      id: faker.database.mongodbObjectId(),
      thumbnails: faker.image.urlPicsumPhotos(),
      code: faker.finance.currencyCode(),
      category:faker.commerce.productAdjective()
  }
}