const { getAuth } = require('./../../utils/firebase.util')
const util = require('../../utils/auth.util')
const { ForbiddenResourceError, UnauthorizedError } = require('../../errors/utils/errors.interface.util')


module.exports = async (req, res, next) => {

  try {

    const authHeader = req.headers['authorization']
    if (util.authHeaderIsInvalid(authHeader))
      throw new UnauthorizedError("Invalid authorization header")

    const token = util.getToken(authHeader)
    const decodedToken = await getAuth().verifyIdToken(token)

    const { email, admin } = decodedToken
    if (util.emailIsInvalid(email))
      throw new ForbiddenResourceError("Unauthorized email format")

    if (admin == true)
      res.locals.admin = true
    else
      res.locals.admin = false

    decodedToken.nim = util.getNim(email)
    res.locals.userInfo = decodedToken
    next()

  } catch (err) {
    
    next(err)

  }

}