const admin = require("firebase-admin")
const serviceAccount = require(process.env.service_account)

module.exports = {
    
    fireBaseAdmin : admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    }),

}