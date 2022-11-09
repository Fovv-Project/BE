const { ClientError } = require('../../errors/classes/super/client.error')


module.exports = (err, req, res, next) => {

    const errMessage = err.message
    const errCode = err.HTTPcode

    if (err instanceof ClientError)
        return res.status(errCode).json({
            success: false,
            code: errCode,
            message: errMessage
        })

    console.log(errMessage);
    return res.status(code).json({
        success: false,
        code: 400,
        message: "Internal server error"
    })
}