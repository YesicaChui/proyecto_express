import passport from "passport"
import GitHubStrategy from 'passport-github2'
import local from 'passport-local'
import config from "./config/config.js"
import { createHash, isValidPassword } from './utils.js'
import { UserService,CartService } from "./repositories/index.js"
import { sendEmail } from "./controllers/email.controller.js"
import logger from "./logger.js"
const LocalStrategy = local.Strategy

const initializePassport = () => {

    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, email, password, done) => {       
        const { first_name, last_name,  age } = req.body
        try {          
            const user = await UserService.getOne(email)
            if (user) {
                logger.log('info', `User already exists`)
                return done(null, false)
            }
            // const cartForNewUser = await CartModel.create({})
            const cartForNewUser = await CartService.addCart()
            const newUser = {
                first_name, last_name, email, age, 
                password: createHash(password),
                cart: cartForNewUser._id,
                role: ( email == 'yesicachuic@gmail.com' || email == 'adminCoder@coder.com') ? 'admin' : 'usuario'
            }           
            // const result = await UserModel.create(newUser)
            const result = await UserService.create(newUser)
            delete newUser.password;
            const dataEmail =[
                newUser
            ]
            const resultEmail=await sendEmail( email,dataEmail,"¡Haz sido registrado exitosamente!")
            return done(null, result)
        } catch(err) {
            return done(err)
        }
    }))

    passport.use('github', new GitHubStrategy({
        clientID: config.passport.clientId,
        clientSecret: config.passport.clientSecret,
        callbackURL: config.passport.clientCallbackUrl
    }, async(accessToken, refreshToken, profile, done) => {
        try {
            const user = await UserService.getOne( profile._json.email )
            if (user) return done (null, user)
            // const cartForNewUser = await CartModel.create({})
            const cartForNewUser = await CartService.addCart()
            const newUser = await UserService.create({
                first_name: profile._json.name,
                last_name:"",
                age:0,
                email: profile._json.email,
                password: " ",
                cart: cartForNewUser._id
            })

            return done(null, newUser)
        } catch(err) {
            return done ('Error to login with GitHub')
        }
    }))

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async(username, password, done) => {
        try {
            const user = await UserService.getOne(username)
            if (!user) {
                logger.log('info', `User doesnot exists`)
                return done(null, user)
            }
            
            if (!isValidPassword(user, password)) return done(null, false)

            return done(null, user)
        } catch(err) {
            logger.log('error', `error al obtener el usuario ${username}`)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async(id, done) => {
        const user = await UserService.getById(id)
        done(null, user)
    })
}

export default initializePassport