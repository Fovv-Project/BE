const express = require('express')
const router = express.Router()

/* Middleware */
router.use(require('../middlewares/logger.middleware'))

/* Routes */
router.get('/')
router.get('/:id')

router.post('/', [
    require('../middlewares/auth.middleware'),
])
router.patch('/:id', [
    require('../middlewares/auth.middleware'),
])
router.delete('/', [
    require('../middlewares/auth.middleware'),
])

module.exports = router