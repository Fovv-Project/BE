const express = require('express')
const router = express.Router()
const borrowController = require('../controllers/borrows.controller')

/* Middleware */
router.use(require('../middlewares/logger.middleware'))

/* Routes */
router.get('/', [
    require('../middlewares/auth.middleware'),
], borrowController.get)
router.get('/:id', [
    require('../middlewares/auth.middleware'),
], borrowController.getId)
router.post('/', [
    require('../middlewares/auth.middleware'),
], borrowController.insert)
router.patch('/:id/status', [
    require('../middlewares/auth.middleware'),
], borrowController.updateStatus)
router.patch('/:id/approval', [
    require('../middlewares/auth.middleware'),
], borrowController.updateApproval)
router.delete('/:id', [
    require('../middlewares/auth.middleware'),
], borrowController.removeId)

module.exports = router