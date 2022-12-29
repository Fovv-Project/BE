const db = require('../../utils/db.setup.util')
const { user } = db.models
const { getRandom } = require('../../utils/helper.util')

module.exports = {

    randomSeeder : async () => {
        const totalRecords  = process.argv[1] ? process.argv[1] : 1


        for (let index = 0; index < totalRecords; index++) {
            
            const userName = getRandom('letter', 15)
            const userNim = getRandom('number', 14)

            user.create({
                nim: userNim,
                nama: userName
            },{
                logging : false
            }).then(() => {
                console.log(`INSERTED NEW USER OF [ ${userName} ]`);
            }).catch((err)=>{
                console.error(err);
            })

        }        
    }

}