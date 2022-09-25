const express = require('express')
const router = express.Router()

router.get('/')
router.get('/:id')
router.patch('/:id')
router.patch('/:id/approval')
router.patch('/:id/status')
router.post('/')
router.delete('/:id')

module.exports = router