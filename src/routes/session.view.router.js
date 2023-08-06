import express from 'express'
const router = express.Router()

router.get('/forget-password', (req, res) => {
  res.render('sessions/forget-password')
})

router.get('/reset-password/:token', (req, res) => {
  res.redirect(`/api/sessions/verify-token/${req.params.token}`)
})

//Vista para registrar usuarios
router.get('/register', (req, res) => {
  res.render('sessions/register')
})


// Vista de Login
router.get('/', (req, res) => {
  res.render('sessions/login')
})

export default router