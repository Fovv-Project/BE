const { DataTypes } = require("sequelize");
const sequelize = require('../utils/database');

const BorrowingHistory = sequelize.define("borrowing_history", {
    idHistori: DataTypes.INTEGER,
    tglPinjam: DataTypes.TIME,
    tglKembali: DataTypes.TIME,
    statusPinjam: DataTypes.STRING,
    isApproved: DataTypes.BOOLEAN
});

module.exports = {
    BorrowingHistory
}