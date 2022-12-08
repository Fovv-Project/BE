const express = require('express')
const router = express.Router()
const booksController = require('../controllers/books.controller')
const authMiddleware = require('../middlewares/auth.middleware')

/* Middleware */
router.use(require('../middlewares/logger.middleware'))

/* Routes */
router.get('/', booksController.get)
router.get('/:id', booksController.getId)

router.post('/', [
    authMiddleware,
    booksController.insert
])
router.patch('/:id', [
    authMiddleware,
    booksController.updateId
])
router.delete('/', [
    authMiddleware,
    booksController.remove
])

module.exports = router