const express = require('express')
const router = express.Router()

/* Middleware */
router.use(require('../middlewares/logger.middleware'))

/* Route */
router.get('/')
router.get('/:id')
router.post('/')
router.patch('/:id')
router.delete('/:id')

module.exports = router