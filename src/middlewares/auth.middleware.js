export const auth = (req,res, next)=>{
  if(req.session.user) return next()
  return res.send('Error de authentication')
}