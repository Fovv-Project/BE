const { DataTypes } = require("sequelize");
const sequelize = require('../utils/database');

const Category = sequelize.define("category", {
    idKategori: DataTypes.INTEGER,
    jenisKategori: DataTypes.STRING
});

module.exports = {
    Category
}