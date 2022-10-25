const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("user", {
        nim: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
        },
        nama: {
            allowNull: false,
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
    })
}