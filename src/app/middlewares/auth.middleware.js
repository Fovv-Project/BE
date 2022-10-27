const { getAuth } = require('./../../utils/firebase.util')
const util = require('../../utils/auth.util')


module.exports = async (req, res, next) => {
  
  const authHeader = req.headers['authorization']
  if(util.authHeaderIsInvalid(authHeader))
    return res.status(401).json({
      success : false,
      code : 401,
      message : "Invalid authorization header"
    })
  
  const token = util.getToken(authHeader)
  let decodedToken
  try {
    decodedToken = await getAuth().verifyIdToken(token)
  }catch (err){
    return res.sendStatus(401).json({
      success : false,
      code : 401,
      message : err.message
    })
  }

  const {email, admin} = decodedToken
  if(util.emailIsInvalid(email))
    return res.status(403).json({
      success : false,
      code : 403,
      message : "Unauthorized email format"
    })
  
    // Assuming CustomUserClaims is stored in "admin" variable.
    if(admin == true)
      res.locals.admin = true
    
    decodedToken.nim = util.getNim(email)
    res.locals.userInfo = decodedToken
    next()
}