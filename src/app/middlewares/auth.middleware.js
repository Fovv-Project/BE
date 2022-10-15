const { getAuth } = require('./../../utils/firebase.util')
const util = require('../../utils/auth.util')


module.exports = async (req, res, next) => {
  
  const authHeader = req.headers['authorization']
  if(util.authHeaderIsInvalid(authHeader))
    res.status(401).json()
    .send("Invalid Authorization Header.")
  
  const token = util.getToken(authHeader)
  let decodedToken
  try {
    decodedToken = await getAuth().verifyIdToken(token)
  }catch (err){
    return res.sendStatus(401).send(err.message)
  }

  const {email, admin} = decodedToken
  if(util.emailIsInvalid(email))
    res.status(403).send("Unauthorized Email Format.")  
  
    // Assuming CustomUserClaims is stored in "admin" variable.
    if(admin == true)
      res.locals.admin = true
    
    res.locals.userInfo = decodedToken
    next()
}