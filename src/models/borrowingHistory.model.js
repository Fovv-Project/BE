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
            allowNull: true,
            type: DataTypes.TIME
        },
        tglKembali: {
            allowNull: true,
            type: DataTypes.TIME
        },
        statusPinjam: {
            allowNull: false,
            type: DataTypes.STRING
        },
        isApproved: {
            allowNull: false,
            type: DataTypes.BOOLEAN
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
    }, {
        freezeTableName: true
    });
}