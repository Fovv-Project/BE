const express = require('express')
const router = express.Router()

/* Middleware */
router.use(require('../middlewares/auth.middleware'))
router.use(require('../middlewares/logger.middleware'))

/* Route */
router.get('/')
router.get('/:nim')

module.exports = router