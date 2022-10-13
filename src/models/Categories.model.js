const { DataTypes } = require("sequelize");
const sequelize = require('../utils/database');
const book = require('./books.model');

const Category = sequelize.define("category", {
    idKategori: DataTypes.INTEGER,
    jenisKategori: DataTypes.STRING
});

Category.hasMany(book.Book);

module.exports = {
    Category
}