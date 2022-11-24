class ClientError extends Error {
    constructor (message, HTTPcode = 400){
        super(message)

        this.HTTPcode = HTTPcode
        this.name = 'ClientError'
    }
}

module.exports = {
    "ClientError" : ClientError,
    "newClientError" : (message) => new ClientError(message)
}