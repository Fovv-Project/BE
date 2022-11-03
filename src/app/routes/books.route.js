const express = require('express')
const router = express.Router()
const booksController = require('../controllers/books.controller')

/* Middleware */
router.use(require('../middlewares/logger.middleware'))

/* Routes */
router.get('/', booksController.get)
router.get('/:id', booksController.getId)

router.post('/', [
    require('../middlewares/auth.middleware'),
], booksController.insert)
router.patch('/:id', [
    require('../middlewares/auth.middleware'),
], booksController.updateId)
router.delete('/', [
    require('../middlewares/auth.middleware'),
], booksController.remove)

module.exports = router