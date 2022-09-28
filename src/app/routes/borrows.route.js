const express = require('express')
const router = express.Router()

/* Middleware */
router.use(require('../middlewares/logger.middleware'))

/* Routes */
router.get('/')
router.get('/:id')
router.post('/')
router.delete('/:id')

module.exports = router