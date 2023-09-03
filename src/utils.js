/* import path from 'path';
const __dirname = path.resolve(process.cwd());
export default __dirname */
import CustomError from './services/errors/custom_error.js'
import EErros from './services/errors/enums.js'
import { AuthorizedErrorInfo, AuthErrorInfo } from './services/errors/info.js'
import { fileURLToPath } from 'url'
import path from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { fakerES_MX as faker } from '@faker-js/faker'
import logger from './logger.js'
import multer from 'multer';
const PRIVATE_KEY = 'c0d3r'

export const generateToken = (user, expiration = '24h') => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: expiration })
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
    if (credentials.user.role !== 'admin' && credentials.user.role !== 'premium') {
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
    if (credentials.user.role !== 'user') return res.status(403).json({ error: 'Not authorized' })
    req.user = credentials.user
    next()
  })
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
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
    category: faker.commerce.productAdjective()
  }
}

export const generateResetPasswordToken = (user) => {
  const resetToken = jwt.sign({ userId: user._id }, PRIVATE_KEY, { expiresIn: '1h' });
  return resetToken;
};

export const verifyResetPasswordToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, PRIVATE_KEY);
    return decodedToken.userId;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const configureMulter = (destinationPath) => {
  console.log(destinationPath)
  try {
    console.log("entrando")
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', './src/public', destinationPath));
      },
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = file.fieldname + '-' + Date.now() + ext;
        cb(null, filename);
      },
    });

    const upload = multer({ storage });

    return upload;
  } catch (error) {

    logger.log('Error en la configuración de Multer', error)
  }
};