import {Router} from 'express'

const router = Router();
//aqui las rutas de carts
router.get('/',(req,res)=>{
  res.send('hola desde cart')
})


export default router;