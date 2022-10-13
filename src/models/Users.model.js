const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require('../utils/database');
const category = require('./Categories.model');
const history = require('./BorrowingHistory.model');

const User = sequelize.define("user", {
    nim: DataTypes.STRING,
    name: DataTypes.STRING,
    createdAt: DataTypes.TIME,
    updatedAt: DataTypes.TIME,
    deletedAt: DataTypes.TIME
});

User.hasMany(category.Category);
User.hasMany(history.BorrowingHistory);

module.exports = {
    User,
}