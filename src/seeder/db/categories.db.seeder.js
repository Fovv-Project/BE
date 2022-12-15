const db = require('../../utils/db.setup.util')
const { category } = db.models
const { getRandom } = require('../../utils/helper.util')

module.exports = {

    randomSeeder : async () => {
        const totalRecords  = process.argv[1] ? process.argv[1] : 1


        for (let index = 0; index < totalRecords; index++) {
            
            const categoryType = getRandom('letter', 5)

            category.create({
                jenisKategori: categoryType
            },{
                logging : false
            }).then(() => {
                console.log(`INSERTED NEW CATEGORY OF [ ${categoryType} ]`);
            }).catch((err)=>{
                console.error(err);
            })

        }        
    }

}
