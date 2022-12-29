module.exports = (req, res, next) => res.status(404).json({
    success: false,
    code: 404,
    message: "Page Not Found"
})