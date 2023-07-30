import { Router } from 'express'
import logger from '../logger.js'
const router = Router()

router.get('/', async (req, res) => {
    logger.log('debug', `probando log debug`)
    logger.log('http', `probando log http`)
    logger.log('info', `probando log info`)
    logger.log('warning', `probando log warning`)
    logger.log('error', `probando log error`)
    logger.log('fatal', `probando log fatal`)

    res.json({ message: 'Logger Test...' })
})

export  default router