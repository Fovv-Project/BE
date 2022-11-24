const { ClientError } = require('../super/client.error')

class UnauthorizedError extends ClientError {
    constructor(message){
        super(message, 401)

        this.name = 'unauthorizedError'
    }
}

module.exports = UnauthorizedError
// module.exports = {
//     "UnauthorizedError" : UnauthorizedError,
//     "newUnauthorizedError" : (message) => new UnauthorizedError(message)
// }