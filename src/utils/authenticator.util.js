const dotenv = require('dotenv')
const { createHmac } = require('crypto')

const seed = process.env.SECRET_KEY

const genCode = (message) => {
    const hmac = createHmac('sha256', seed)
    hmac.update(message)
    return hmac.digest('hex')
}

const hashToInt = (hash, offset) => {
    const truncatedHash = hash.slice(offset, hash.length - offset)
    return (truncatedHash.charCodeAt(0) << 24) 
    + (truncatedHash.charCodeAt(1) << 16) 
    + (truncatedHash.charCodeAt(2) << 8) 
    + (truncatedHash.charCodeAt(3) << 0)
}

module.exports = {
    
    genToken : (min, length = 6) => {
        const hash = genCode(min)
        const offset = hash.charCodeAt(hash.length-1) & 0xF
        const intOfHash = hashToInt(hash, offset) & 0x7FFFFFFF
        return intOfHash % Math.pow(10, length)
    }

}