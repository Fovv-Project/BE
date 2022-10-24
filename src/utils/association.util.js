function applyExtraSetup(sequelize) {
    const { user, attendance, book, category, borrowingHistory } = sequelize.models;

    user.hasMany(attendance);
    attendance.belongsTo(user);

    user.hasMany(borrowingHistory);
    borrowingHistory.belongsTo(user);

    category.hasMany(book);
    book.belongsTo(category);

    book.hasMany(borrowingHistory);
    borrowingHistory.belongsTo(book);
}

module.exports = { applyExtraSetup };