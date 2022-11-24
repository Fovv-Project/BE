const express = require('express')
const router = express.Router()
const authenticatorController = require('../controllers/authenticator.controller')

/* Middleware */
router.use(require('../middlewares/logger.middleware'))
router.use(require('../middlewares/auth.middleware'))

/* Route */
router.get('/', authenticatorController.get)

module.exports = router