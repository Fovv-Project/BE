const { ClientError } = require('../../errors/classes/super/client.error')
const { FirebaseError } = require('../../../node_modules/firebase-admin/lib/utils/error.js')


module.exports = (err, req, res, next) => {

    const errMessage = err.message
    const errCode = err.HTTPcode

    if (err instanceof ClientError)
        return res.status(errCode).json({
            success: false,
            code: errCode,
            message: errMessage
        })

    else if ( err instanceof FirebaseError)
        return res.status(400).json({
            success: false,
            code: 400,
            message: errMessage
        })

    console.log(err);
    
    return res.status(400).json({
        success: false,
        code: 400,
        message: "Internal server error"
    })
}