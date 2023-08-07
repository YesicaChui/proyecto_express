import { Router } from "express";
import passport from "passport"
import { generateToken, authToken, generateResetPasswordToken, verifyResetPasswordToken, createHash, isValidPassword } from "../utils.js";
import UserDTO from '../dtos/userDTO.js'
import logger from "../logger.js";
import { UserService } from "../repositories/index.js";

import { sendSimpleEmail } from "../controllers/email.controller.js";
import { PORT } from "../app.js";
const router = Router()


// API para crear usuarios en la DB
router.post('/register', passport.authenticate('register', {
    failureRedirect: '/api/sessions/failRegister'
}), async (req, res) => {
    res.redirect('/')
})

router.get('/failRegister', (req, res) => {
    res.send({ error: 'Failed!' })
})



// API para login
router.post('/login', passport.authenticate('login', {
    failureRedirect: '/api/sessions/failLogin'
}), async (req, res) => {
    if (!req.user) {
        return res.status(400).send({ status: 'error', error: 'Invalid credentials' })
    }

    const { email } = req.body
    const role = email == 'yesicachuic@gmail.com' || email == 'adminCoder@coder.com' ? 'admin' : 'user'

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
            res.status(500).render('errors/base', { error: err })
        } else {
            res.clearCookie('micookie');
            res.redirect('/')
        }
    })
})

router.get('/github', passport.authenticate('github', { scope: ["user:email"] }), (req, res) => {
    logger.log('info', `inicio de sesion con github`)
})
router.get('/githubcallback',
    passport.authenticate('github', { failureRedirect: '/' }),
    async (req, res) => {
        const role = req.user.email == 'yesicachuic@gmail.com' || req.user.email == 'adminCoder@coder.com' ? 'admin' : 'user'
        //req.session.user = req.user

        req.session.user = {
            ...req.user.toObject(),
            role
        }
        res.redirect('/views/products')
    })

router.get('/current', authToken, (req, res) => {
    let result = new UserDTO(req.user)
    res.json(result)
})


router.post('/forget-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await UserService.getOne(email);
        if (!user) {
            return res.status(404).send({ status: 'error', error: 'User not found' });
        }

        // Generar un token JWT y establecer la expiración en 1 hora (3600 segundos)
        const resetToken = generateResetPasswordToken(user);

        // Enviar el correo con el enlace para restablecer la contraseña
        const link = `http://${req.hostname}:${PORT}/reset-password/${resetToken}`
        await sendSimpleEmail(email, link)

        return res.json({ message: 'Email sent' });
    } catch (err) {
       return res.status(500).json({ status: 'error', error: 'Failed to reset password' });
    }
});


router.get('/verify-token/:token', async (req, res) => {
    const { token } = req.params;
    try {
        // Verificar el token JWT y obtener la información del usuario
        const userId = verifyResetPasswordToken(token);

        const userCheck = await UserService.getById(userId);

        if (!userCheck) {
            return res.status(404).json({ status: 'error', error: 'Token no válido / El token ha expirado' })
        }
        const user = userCheck.email
        res.render('sessions/reset-password', { user })
    } catch (err) {

        return res.status(500).json({ status: 'error', error: 'Failed to reset password' });
    }    

})

router.post('/reset-password/:user', async (req, res) => {
    const { newPassword } = req.body;
    try {

        const user = await UserService.getOne( req.params.user )

        if (isValidPassword(user, newPassword)) {
            return res.status(400).send({ status: 'error', error: 'New password cannot be the same as the old one' });
        }
        user.password = createHash(newPassword);
        await user.save();
        res.json({ status: 'success', message: 'Se ha creado una nueva contraseña' })
    } catch (err) {
        res.json({ status: 'error', error: err.message })
    }
})

router.get('/premium/:uid', async (req, res) => {
    try {

        const user = await  UserService.getById(req.params.uid)
        await UserService.update(req.params.uid, { role: user.role === 'user' ? 'premium' : 'user' })
        res.json({ status: 'success', message: 'Se ha actualizado el rol del usuario' })
    } catch(err) {
        res.json({ status: 'error', error: err.message })
    }
})

export default router