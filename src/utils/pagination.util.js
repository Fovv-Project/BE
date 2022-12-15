const { isInteger } = require('../utils/helper.util')

module.exports = {

    getBatchLimit : (size) => isInteger(size) ? (size > 0 ? parseInt(size) : 0) : 0,

    getBatchOffset : (size, page) => {
        size = isInteger(size) ? (size > 0 ? parseInt(size) : 0) : 0
        page = isInteger(page) ? (page > 0 ? parseInt(page) : 0) : 0
        return (size * (page - 1)) >= 0 ? (size * (page - 1)) : 0
    }

}