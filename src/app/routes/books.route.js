const express = require('express')
const router = express.Router()

router.get('/')
router.get('/:id')
router.patch('/:id')
router.post('/')
router.delete('/')

module.exports = router