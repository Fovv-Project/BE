const admin = require("firebase-admin")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const prompt = require('prompt-sync')({sigint: true})
const path = require("path")
const serviceAccount = require(
    path.resolve(__dirname, "..", "..", "..", "configs", "firebase.config.json")
)

const fireBaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
const auth = fireBaseAdmin.auth()

const getRandom = (type, total) => {

    let characters
    if(type == "letter")
        characters = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ"
    else if(type == "number")
        characters = "0123456789"
    else
        characters = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ" + "0123456789"

    let result = ""
    for (let index = 0; index < total; index++) {
        result += characters[crypto.randomInt(0,characters.length-1)]
    }
    return result
}

module.exports = {

    importUser : (userData) =>{
        auth
        .importUsers([
            {
                uid: userData.uid,
                displayName: userData.displayName,
                email: userData.email,
                passwordHash: Buffer.from(bcrypt.hashSync(userData.password, 10)),
                photoURL: userData.photoURL,
                emailVerified: userData.emailVerified,
                phoneNumber: userData.phoneNumber,
                customClaims: { admin: userData.admin },
                providerData: [
                    {
                        uid: 'google-uid',
                        email: userData.email,
                        displayName: userData.displayName,
                        photoURL: userData.photoURL,
                        providerId: 'google.com',
                    },
                ],
            },
        ], { 
            hash: {
            algorithm: 'BCRYPT'
            },
        }
        )
        .then((results) => {
            results.errors.forEach((indexedError) => {
                console.log(`Error importing user ${indexedError.index}`);
                console.log(indexedError);
            });
        })
        .catch((error) => {
            console.log('Error importing users :', error);
        });

        console.log("IMPORTED USER DATA: ");
        console.log(userData);
    },

    userFromInput :  () => {
        let user = {}

        user.uid = prompt("UID : ")
        user.displayName = prompt("User Display Name : ")
        user.email = prompt("User Email : ")
        user.password = prompt("User Password : ")
        user.photoURL = "http://" + prompt("User PhotoURL : http://")
        user.phoneNumber = "+" + prompt("User Phone Number (10 additional number): +")
        user.emailVerified = (prompt("Is User Email Verified? (empty for 'no')") ? true : false)
        user.admin = (prompt("Set Admin Access for User? (empty for 'no')") ? true : false)

        return user
    },

    getRandomUser : () => {
        let user = {}

        user.uid = getRandom("letter & number", 8)
        user.displayName = (getRandom("letter", 4) + " " + getRandom("letter", 4))
        user.email = getRandom("number", 8) + "@students.ilkom.unsri.ac.id"
        user.password = getRandom("letter & number", 8)
        user.photoURL = "http://www.example.com/" + getRandom("letter & number", 8)
        user.phoneNumber = "+62" + getRandom("number", 9)
        user.emailVerified = ((getRandom("number", 1) < 5) ? true : false)
        user.admin = ((getRandom("number", 1) < 5) ? true : false)

        return user
    },

}