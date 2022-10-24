const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("borrowingHistory", {
        idHistori: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        tglPinjam: {
            allowNull: false,
            type: DataTypes.TIME
        },
        tglKembali: {
            allowNull: false,
            type: DataTypes.TIME
        },
        statusPinjam: {
            allowNull: false,
            type: DataTypes.STRING
        },
        isApproved: {
            allowNull: false,
            type: DataTypes.BOOLEAN
        }
    });
}