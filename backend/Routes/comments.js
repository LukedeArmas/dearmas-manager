const express = require('express')
const router = express.Router({ mergeParams: true })
const AsyncError = require('express-async-handler')
const { getComments, createComment, deleteComment, updateComment } = require('../Controllers/comments.js')
const { verifyUser } = require('../Middleware/auth.js')

router.route('/')
.get(AsyncError(verifyUser), AsyncError(getComments))
.post(AsyncError(verifyUser), AsyncError(createComment))

router.route('/:commentId')
.delete(AsyncError(verifyUser), AsyncError(deleteComment))
.put(AsyncError(verifyUser), AsyncError(updateComment))

module.exports = router