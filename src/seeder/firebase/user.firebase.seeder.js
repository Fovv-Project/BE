const path = require("path")
const { importUser, userFromInput, getRandomUser } = require(
    path.resolve(__dirname, "..", "util", "user.firebase.util.js")
)

module.exports = {

    importBaseUser : () => {
        const config = require(
            path.resolve(__dirname, "..", "config", "user.firebase.config.json")
        )
        config.baseUsers.forEach(baseUser => {
            importUser(baseUser)
        });
    },

    importUserFromInput : () => {
        importUser(userFromInput())
    },

    importRandomUser : () => {
        importUser(getRandomUser())
    }

}