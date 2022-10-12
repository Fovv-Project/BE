const { getAuth } = require('./../../utils/firebase.util')
const util = require('../../utils/auth.util')


module.exports = async (req, res, next) => {
  
  const authHeader = req.headers['authorization']
  if(util.authHeaderIsInvalid(authHeader))
    res.status(401).send("Invalid Authorization Header!")
  
  const token = util.getToken(authHeader)
  let decodedToken
  try {
    decodedToken = await getAuth().verifyIdToken(token)
  }catch (err){
    return res.status(401).send(err.message)
  }

  const {email, access} = decodedToken
  if(util.emailIsInvalid(email))
    res.status(401).send("Unauthorized Email Format!")  
  if(access == undefined)
    res.status(401).send("Unidentified Authorization!")
  
  // Assuming CustomUserClaims is stored in "access" variable.
  res.locals.access = access
  next()

}