const db = require('../../utils/db.setup.util')
const { book, category } = db.models
const { getRandom, rangedRandomInt } = require('../../utils/helper.util')

module.exports = {

    randomSeeder : async () => {
        const totalRecords  = process.argv[1] ? process.argv[1] : 1

        const categoryRecords = await category.findAll({logging : false})        

        if(categoryRecords.length == 0){
            throw new Error("EMPTY CATEGORY RECORDS")
        }

        for (let index = 0; index < totalRecords; index++) {
            
            const randomCategory = categoryRecords[rangedRandomInt(0, categoryRecords.length)]
            const categoryId = randomCategory.toJSON().idKategori
            const id  = getRandom("number", 15)
            
            book.create({
                        idBuku: id,
                        idKategori: categoryId,
                        judulBuku: getRandom("letter", 5),
                        pengarang: getRandom("letter", 5),
                        penerbit: getRandom("letter", 5),
                        tahunTerbit: parseInt(getRandom("number", 4)),
                        jumlahHalaman: parseInt(getRandom("number", 2)),
                        deskripsi: getRandom("letter", 15),
                        imgURL: getRandom("letter", 15)
            },{
                logging : false
            }).then(() => {
                console.log(`INSERTED NEW BOOK RECORD WITH ID [${id}]`);
            }).catch((err)=>{
                console.error(err);
            })
        }        
    }

}
