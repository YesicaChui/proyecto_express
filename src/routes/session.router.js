import { Router } from "express";
import UserModel from "../models/user.model.js";
import passport from "passport"
const router = Router()

//Vista para registrar usuarios
router.get('/register', (req, res) => {
    res.render('sessions/register')
})

// API para crear usuarios en la DB
/* router.post('/register', async(req, res) => {
    const userNew = req.body
    console.log(userNew);

    const user = new UserModel(userNew)
    await user.save()

    res.redirect('/api/sessions/login')
}) */
// API para crear usuarios en la DB
router.post('/register', passport.authenticate('register', {
    failureRedirect: '/api/sessions/failRegister'
}), async(req, res) => {
    res.redirect('/api/sessions/login')
})

router.get('/failRegister', (req, res) => {
    res.send({ error: 'Failed!'})
}) 

// Vista de Login
router.get('/login', (req, res) => {
    res.render('sessions/login')
})

// API para login
router.post('/login', passport.authenticate('login', {
    failureRedirect: '/api/sessions/failLogin'
}), async (req, res) => {
    if (!req.user) {
        return res.status(400).send({ status: 'error', error: 'Invalid credentials'})
    }

    /* async (req, res) => {
    const { email, password } = req.body

    const user = await UserModel.findOne({email, password}).lean().exec()
    if(!user) {
        return res.status(401).render('errors/base', {
            error: 'Error en email y/o password'
        })
    } */  
    const { email } = req.body
    const role = email=='yesicachuic@gmail.com' ||email=='adminCoder@coder.com'?'admin':'usuario'

    req.session.user = {
        ...req.user.toObject(),
        role
    }
    res.redirect('/views/products')
})

router.get('/failLogin', (req, res) => {
    res.send({ error: 'Fail Login'})
})
// Cerrar Session
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) {
            console.log(err);
            res.status(500).render('errors/base', {error: err})
        } else res.redirect('/api/sessions/login')
    })
})

router.get('/github', passport.authenticate('github', { scope: ["user:email"] }), (req, res) => {console.log("mi github")})
router.get('/githubcallback', 
    passport.authenticate('github', { failureRedirect: '/login'}), 
    async(req, res) => {
        const role = req.user.email=='yesicachuic@gmail.com' || req.user.email=='adminCoder@coder.com'?'admin':'usuario'
        //req.session.user = req.user

        req.session.user = {
            ...req.user.toObject(),
            role
        }
        res.redirect('/views/products')
    })
export default router