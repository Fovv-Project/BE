const { DataTypes } = require("sequelize");
const sequelize = require('../utils/database');
const user = require('./users.model');
const book = require('./books.model');

const BorrowingHistory = sequelize.define("borrowingHistory", {
    idHistori: DataTypes.INTEGER,
    tglPinjam: DataTypes.TIME,
    tglKembali: DataTypes.TIME,
    statusPinjam: DataTypes.STRING,
    isApproved: DataTypes.BOOLEAN
});

BorrowingHistory.belongsTo(user.User);
BorrowingHistory.belongsTo(book.Book);

module.exports = {
    BorrowingHistory
}
