import { Router } from 'express'
import { authTokenUser } from '../utils.js'
const router = Router()

router.get('/', authTokenUser, (req, res) => {
    res.render('chat', {})
})

export default router