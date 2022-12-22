const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("book", {
        idBuku: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
        },
        judulBuku: {
            allowNull: false,
            type: DataTypes.STRING
        },
        pengarang: {
            allowNull: false,
            type: DataTypes.STRING
        },
        penerbit: {
            allowNull: false,
            type: DataTypes.STRING
        },
        tahunTerbit: {
            allowNull: false,
            type: DataTypes.STRING
        },
        jumlahHalaman: {
            allowNull: false,
            type: DataTypes.STRING
        },
        deskripsi: {
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
        },
        imgURL: {
            allowNull: false,
            type: DataTypes.STRING
        }
    });
}