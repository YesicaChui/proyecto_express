import passport from "passport"
import GitHubStrategy from 'passport-github2'
import local from 'passport-local'
import { createHash, isValidPassword } from './utils.js'
import { UserService,CartService } from "./repositories/index.js"
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
                console.log('User already exists')
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
            return done(null, result)
        } catch(err) {
            return done(err)
        }
    }))

    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.d081c37d370cc7ec',
        clientSecret: 'f3348c1bbfdd4d12ce91eefb2774bbe1b59991a7',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
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
            console.log(username,password)
            const user = await UserService.getOne(username)
            if (!user) {
                console.log('User doesnot exists')
                return done(null, user)
            }
            
            console.log("existe")
            console.log(user)
            if (!isValidPassword(user, password)) return done(null, false)
            console.log("validado")
            return done(null, user)
        } catch(err) {
            console.log("hay error")
            console.log(err)
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