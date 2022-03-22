const express = require('express')
const router = express.Router()
const AsyncError = require('express-async-handler')
const { register, login, getMe } = require('../Controllers/users.js')
const { verifyUser } = require('../Middleware/auth.js')

router.post('/', AsyncError(register))
router.post('/login', AsyncError(login))
router.get('/me', AsyncError(verifyUser), AsyncError(getMe))

module.exports = router