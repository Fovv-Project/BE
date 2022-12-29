const db = require('../../utils/db.setup.util')
const { book, user, borrowingHistory } = db.models
const { getRandom, rangedRandomInt } = require('../../utils/helper.util')

module.exports = {

    randomSeeder : async () => {
        const totalRecords  = process.argv[1] ? process.argv[1] : 1

        const bookRecords = await book.findAll({logging : false})        
        if(bookRecords.length == 0){
            throw new Error("EMPTY BOOK RECORDS")
        }

        const userRecords = await user.findAll({logging : false})        
        if(userRecords.length == 0){
            throw new Error("EMPTY USER RECORDS")
        }

        const statusOptions = ["Menunggu Approval", "Sedang Dipinjam", "Telah Dikembalikan"]

        for (let index = 0; index < totalRecords; index++) {

            const randomBook = bookRecords[rangedRandomInt(0, bookRecords.length-1)]
            const bookId = randomBook.idBuku

            const randomUser = userRecords[rangedRandomInt(0, userRecords.length-1)]
            const userNim = randomUser.nim
            
            borrowingHistory.create({
                idBuku: bookId,
                nim: userNim,
                statusPinjam: statusOptions[rangedRandomInt(0, statusOptions.length-1)],
                isApproved: Boolean(rangedRandomInt(0,1))
            },{
                logging : false
            }).then(res => {
                console.log(`INSERTED NEW BORROW RECORD OF ID : ${res.idHistori}`);
            }).catch((err)=>{
                console.error(err);
            })
        }        
    }

}