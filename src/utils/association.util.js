function applyExtraSetup(sequelize) {
    const { user, attendance, book, category, borrowingHistory } = sequelize.models;

    user.hasMany(attendance, {
        foreignKey: "nim"
    });
    attendance.belongsTo(user, {
        foreignKey: "nim"
    });

    user.hasMany(borrowingHistory, {
        foreignKey: "nim"
    });
    borrowingHistory.belongsTo(user, {
        foreignKey: "nim"
    });

    category.hasMany(book, {
        foreignKey: "idKategori"
    });
    book.belongsTo(category, {
        foreignKey: "idKategori"
    });

    book.hasMany(borrowingHistory, {
        foreignKey: "idBuku"
    });
    borrowingHistory.belongsTo(book, {
        foreignKey: "idBuku"
    });
}

module.exports = { applyExtraSetup };