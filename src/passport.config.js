import passport from "passport"
import GitHubStrategy from 'passport-github2'
import local from 'passport-local'
import UserModel from "./models/user.model.js"
import { createHash, isValidPassword } from './utils.js'

const LocalStrategy = local.Strategy

const initializePassport = () => {

    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, email, password, done) => {       
        const { first_name, last_name,  age } = req.body
        try {          
            const user = await UserModel.findOne({ email: email })
            if (user) {
                console.log('User already exists')
                return done(null, false)
            }

            const newUser = {
                first_name, last_name, email, age, 
                password: createHash(password)
            }           
            const result = await UserModel.create(newUser)
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
            const user = await UserModel.findOne({ email: profile._json.email })
            if (user) return done (null, user)

            const newUser = await UserModel.create({
                first_name: profile._json.name,
                last_name:"",
                age:"",
                email: profile._json.email,
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
            const user = await UserModel.findOne({ email: username })
            if (!user) {
                console.log('User doesnot exists')
                return done(null, user)
            }

            if (!isValidPassword(user, password)) return done(null, false)

            return done(null, user)
        } catch(err) {}
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async(id, done) => {
        const user = await UserModel.findById(id)
        done(null, user)
    })
}

export default initializePassport