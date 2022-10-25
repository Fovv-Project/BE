const express = require('express')
const router = express.Router()
const userController = require('../controllers/users.controller')

/* Middleware */
router.use(require('../middlewares/auth.middleware'))
router.use(require('../middlewares/logger.middleware'))

/* Route */
router.get('/', userController.get)
router.get('/:nim')

module.exports = router