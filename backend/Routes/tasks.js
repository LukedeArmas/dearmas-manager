const express = require('express')
const router = express.Router({ mergeParams: true })
const AsyncError = require('express-async-handler')
const { getTasks, createTask, getTask, deleteTask, updateTask, getTaskAmounts } = require('../Controllers/tasks.js')
const { verifyUser } = require('../Middleware/auth.js')

router.route('/')
.get(AsyncError(verifyUser), AsyncError(getTasks))
.post(AsyncError(verifyUser), AsyncError(createTask))

router.route('/amounts')
.get(AsyncError(verifyUser), AsyncError(getTaskAmounts))

router.route('/:id')
.get(AsyncError(verifyUser), AsyncError(getTask))
.delete(AsyncError(verifyUser), AsyncError(deleteTask))
.put(AsyncError(verifyUser), AsyncError(updateTask))


module.exports = router