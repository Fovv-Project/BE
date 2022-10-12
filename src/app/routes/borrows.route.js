const express = require('express')
const router = express.Router()

/* Middleware */
router.use(require('../middlewares/logger.middleware'))

/* Routes */
router.get('/', [
    require('../middlewares/auth.middleware'),
])
router.get('/:id', [
    require('../middlewares/auth.middleware'),
])
router.post('/', [
    require('../middlewares/auth.middleware'),
])
router.delete('/:id', [
    require('../middlewares/auth.middleware'),
])

module.exports = router