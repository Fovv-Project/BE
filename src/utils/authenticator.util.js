const dotenv = require('dotenv')
const { createHmac } = require('crypto')

const seed = process.env.SECRET_KEY

module.exports = {
    genCode : (message) => {
        const hmac = createHmac('sha256', seed)
        hmac.update(message)
        return hmac.digest('hex')
    }
}