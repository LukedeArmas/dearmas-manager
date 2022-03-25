const express = require('express')
const router = express.Router({ mergeParams: true })
const AsyncError = require('express-async-handler')
const { getComments, createComment } = require('../Controllers/comments.js')
const { verifyUser } = require('../Middleware/auth.js')

router.route('/')
.get(AsyncError(verifyUser), AsyncError(getComments))
.post(AsyncError(verifyUser), AsyncError(createComment))

// router.route('/:id')
// .get(AsyncError(verifyUser), AsyncError(getTask))
// .delete(AsyncError(verifyUser), AsyncError(deleteTask))
// .put(AsyncError(verifyUser), AsyncError(updateTask))

module.exports = router