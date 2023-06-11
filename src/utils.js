/* import path from 'path';
const __dirname = path.resolve(process.cwd());
export default __dirname */

import {fileURLToPath} from 'url'
import {dirname} from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const PRIVATE_KEY = 'c0d3r'

export const generateToken = user => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' })
    return token
}

export const authToken = (req, res, next) => {
    let token = req.headers.authorization
    if (!token) token = req.cookies["micookie"]
    if (!token) return res.status(401).json({ error: 'Not auth' })
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).json({ error: 'Not authorized' })
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