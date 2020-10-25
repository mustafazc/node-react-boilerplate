const express = require('express')
const router = express.Router()

router.get('/health', (_req, res) => res.status(200).send('OK'))

// Routes for frontend
router.get('/', (_req, res) => res.send({ message: 'success' }))

module.exports = router
