const express = require('express')
const router = express.Router()

/* Middleware */
router.use(require('../middlewares/logger.middleware'))

/* Route */
router.get('/')
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