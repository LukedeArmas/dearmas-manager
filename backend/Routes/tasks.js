const express = require('express')
const router = express.Router({ mergeParams: true })
const AsyncError = require('express-async-handler')
const { getTasks, createTask, getTask, deleteTask, updateTask } = require('../Controllers/tasks.js')
const { verifyUser } = require('../Middleware/auth.js')

router.route('/')
.get(AsyncError(verifyUser), AsyncError(getTasks))
.post(AsyncError(verifyUser), AsyncError(createTask))

router.route('/:id')
.get(AsyncError(verifyUser), AsyncError(getTask))
.delete(AsyncError(verifyUser), AsyncError(deleteTask))
.put(AsyncError(verifyUser), AsyncError(updateTask))

module.exports = router