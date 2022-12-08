module.exports = {
    
    getValidLimit : (size, page) => {
        size = Number.isInteger(size) ? size : 0
        page = Number.isInteger(page) ? page : 0
        return {
            offset: (size * (page - 1)) >= 0 ? (size * (page - 1)) : 0,
            limit: size
        }
    }

} 