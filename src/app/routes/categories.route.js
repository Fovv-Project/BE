const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categories.controller')

/* Middleware */
router.use(require('../middlewares/logger.middleware'))

/* Route */
router.get('/', categoryController.get)
router.post('/', [
    require('../middlewares/auth.middleware'),
], categoryController.insert)
router.patch('/:id', [
    require('../middlewares/auth.middleware'),
], categoryController.updateId)
router.delete('/:id', [
    require('../middlewares/auth.middleware'),
], categoryController.removeId)

module.exports = router