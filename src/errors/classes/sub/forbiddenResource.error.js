const { ClientError } = require('../super/client.error')

class ForbiddenResourceError extends ClientError {
    constructor(message){
        super(message, 403)

        this.name = 'ForbiddenResourceError'
    }
}

module.exports = ForbiddenResourceError
// module.exports = {
//     "ForbiddenResourceError" : ForbiddenResourceError,
//     "newForbiddenResourceError" : (message) => new ForbiddenResourceError(message)
// }