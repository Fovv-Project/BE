const { DataTypes } = require("sequelize");
const sequelize = require('../utils/database');
const user = require('./users.model')

const Attendance = sequelize.define("attendance", {
    idAbsensi: DataTypes.INTEGER,
    absen: DataTypes.TIME
});

Attendance.belongsTo(user.User);
module.exports = {
    Attendance
}