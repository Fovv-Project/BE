const cron = require('node-cron')
const db = require('../utils/db.setup.util')
const { borrowingHistory } = db.models

module.exports = {
    approvalRejector : cron.schedule('0 0 * * *', () => {
        borrowingHistory.update({ statusPinjam: "Peminjaman Ditolak" }, {
            where: {
                isApproved: false
            }
        })
    },{
        scheduled : false,
        timezone : 'Asia/Jakarta'
    })
}