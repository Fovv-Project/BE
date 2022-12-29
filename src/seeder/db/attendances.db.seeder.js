const db = require('../../utils/db.setup.util')
const { attendance, user } = db.models
const { getRandom, rangedRandomInt } = require('../../utils/helper.util')

module.exports = {

    randomSeeder : async () => {
        const totalRecords  = process.argv[1] ? process.argv[1] : 1

        const userRecords = await user.findAll({logging : false})        

        if(userRecords.length == 0){
            throw new Error("EMPTY USER RECORDS")
        }

        for (let index = 0; index < totalRecords; index++) {

            const randomUser = userRecords[rangedRandomInt(0, userRecords.length-1)]
            const userNim = randomUser.nim

            attendance.create({
                nim: userNim
            },{
                logging : false
            }).then(res => {
                console.log(`INSERTED NEW ATTENDANCE OF ID : ${res.idAbsensi}`);
            }).catch((err)=>{
                console.error(err);
            })

        }        
    }

}
