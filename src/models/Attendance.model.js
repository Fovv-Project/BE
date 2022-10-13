const { DataTypes } = require("sequelize");
const sequelize = require('../utils/database');

const Attendance = sequelize.define("attendance", {
    idAbsensi: DataTypes.INTEGER,
    absen: DataTypes.TIME
});

module.exports = {
    Attendance
}