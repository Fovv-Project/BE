const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("attendance", {
        idAbsensi: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        waktuAbsen: {
            allowNull: false,
            type: DataTypes.NOW,
            defaultValue : Sequelize.fn('NOW')
        }
    },{
        timestamps: false
    });
}