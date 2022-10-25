const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("category", {
        idKategori: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        jenisKategori: DataTypes.STRING
    });
}