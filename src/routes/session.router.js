import { Router } from "express";
import passport from "passport"
import { generateToken, authToken } from "../utils.js";
const router = Router()

//Vista para registrar usuarios
router.get('/register', (req, res) => {
    res.render('sessions/register')
})

// API para crear usuarios en la DB
router.post('/register', passport.authenticate('register', {
    failureRedirect: '/api/sessions/failRegister'
}), async (req, res) => {
    res.redirect('/api/sessions/login')
})

router.get('/failRegister', (req, res) => {
    res.send({ error: 'Failed!' })
})

// Vista de Login
router.get('/login', (req, res) => {
    res.render('sessions/login')
})

// API para login
router.post('/login', passport.authenticate('login', {
    failureRedirect: '/api/sessions/failLogin'
}), async (req, res) => {
    console.log("/login inicio")
    console.log(req.user)
    if (!req.user) {
        return res.status(400).send({ status: 'error', error: 'Invalid credentials' })
    }
    console.log("/login seguimos")
    const { email } = req.body
    const role = email == 'yesicachuic@gmail.com' || email == 'adminCoder@coder.com' ? 'admin' : 'usuario'

    req.session.user = {
        ...req.user.toObject(),
        role
    }
    req.session.save(() => {
        const access_token = generateToken(req.user.toObject())
        res.cookie('micookie', access_token)
        res.redirect('/views/products')
    });
})

router.get('/failLogin', (req, res) => {
    res.send({ error: 'Fail Login' })
})
// Cerrar Session
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            res.status(500).render('errors/base', { error: err })
        } else {
            res.clearCookie('micookie'); 
            res.redirect('/api/sessions/login')
        }
    })
})

router.get('/github', passport.authenticate('github', { scope: ["user:email"] }), (req, res) => { console.log("mi github") })
router.get('/githubcallback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    async (req, res) => {
        const role = req.user.email == 'yesicachuic@gmail.com' || req.user.email == 'adminCoder@coder.com' ? 'admin' : 'usuario'
        //req.session.user = req.user

        req.session.user = {
            ...req.user.toObject(),
            role
        }
        res.redirect('/views/products')
    })

router.get('/current', authToken, (req, res) => {
    const user = req.user
    delete req.user.password;
    console.log(user)
    res.json({ ...user })
})

export default router