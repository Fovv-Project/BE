const { applyExtraSetup } = require('./association.util');
const sequelize = require('./database.util')

const modelDefiners = [
    require('../models/users.model'),
    require('../models/attendances.model'),
    require('../models/books.model'),
    require('../models/categories.model'),
    require('../models/borrowingHistory.model')
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// sequelize.models.user.create({
//     nim: "09021281924067",
//     nama: "Nilam Musdalifa"
// })

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;