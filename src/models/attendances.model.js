const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("attendance", {
        idAbsensi: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        absen: {
            allowNull: false,
            type: DataTypes.TIME
        }
    });
}