module.exports = (req, res, next) => {
    const reqUrl = req.originalUrl
    const reqMethod = req.method
    const access = res.locals.access ? res.locals.access.toUpperCase() : 'UNKNOWN'
    console.log(`Invoked [ ${reqUrl} ] with [ ${reqMethod} ] as [ ${access} ].`)

    next()
}