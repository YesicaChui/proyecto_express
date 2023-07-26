export const auth = (req,res, next)=>{
  console.log("en el auth")
  console.log(req.session.user)
  if(req.session.user) return next()
  return res.send('Error de authentication')
}