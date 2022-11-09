const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("category", {
        idKategori: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        jenisKategori: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING
        },
        createdAt: {
            allowNull: true,
            type: DataTypes.TIME
        },
        updatedAt: {
            allowNull: true,
            type: DataTypes.TIME
        },
        deletedAt: {
            allowNull: true,
            type: DataTypes.TIME
        }
    });
}