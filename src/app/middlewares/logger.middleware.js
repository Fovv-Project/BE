module.exports = (req, res, next) => {
    const reqUrl = req.originalUrl
    const reqMethod = req.method
    console.log(`Invoked [ ${reqUrl} ] with [ ${reqMethod} ].`)
}