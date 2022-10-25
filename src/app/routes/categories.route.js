const express = require('express')
const router = express.Router()
const Category = require('../controllers/categories.controller')

/* Middleware */
router.use(require('../middlewares/logger.middleware'))

/* Route */
router.get('/', Category.get)
router.post('/', [
    require('../middlewares/auth.middleware'),
])
router.patch('/:id', [
    require('../middlewares/auth.middleware'),
])
router.delete('/:id', [
    require('../middlewares/auth.middleware'),
])

module.exports = router