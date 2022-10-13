const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require('../utils/database');
const category = require('./categories.model');
const history = require('./borrowingHistory.model');
const attendance = require('./attendances.model');

const User = sequelize.define("user", {
    nim: DataTypes.STRING,
    name: DataTypes.STRING,
    createdAt: DataTypes.TIME,
    updatedAt: DataTypes.TIME,
    deletedAt: DataTypes.TIME
});

User.hasMany(category.Category);
User.hasMany(history.BorrowingHistory);
User.hasMany(attendance.Attendance);

module.exports = {
    User,
}
