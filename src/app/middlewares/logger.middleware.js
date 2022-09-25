module.exports = (req, res, next) => {
    const req_url = req.originalUrl
    console.log('Invoked at : ' + req_url)
}