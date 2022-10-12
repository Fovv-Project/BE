const admin = require("firebase-admin")
const serviceAccount = require(process.env.service_account)

const fireBaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const auth = fireBaseAdmin.auth()

module.exports = {
    getAuth : () => auth
}