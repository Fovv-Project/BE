const { DataTypes } = require("sequelize");
const sequelize = require('../utils/database');

const Book = sequelize.define("book", {
    idBuku: DataTypes.STRING,
    judulBuku: DataTypes.STRING,
    pengarang: DataTypes.STRING,
    penerbit: DataTypes.STRING,
    tahunTerbit: DataTypes.STRING,
    jumlahHalaman: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    createdAt: DataTypes.TIME,
    updatedAt: DataTypes.TIME,
    deletedAt: DataTypes.TIME
});

module.exports = {
    Book
}