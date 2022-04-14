const User = require('../Models/user.js')
const Task = require('../Models/task.js')
const CustomError = require('../Utils/CustomError.js')

// Get tasks for user
// @route  GET /tasks
// @auth    Private
module.exports.getTasks = async (req, res) => {
    const { type } = req.query
    let query = {}
    const user = await User.findById(req.user.id)
    if (!user) {
        throw new CustomError(401, 'User does not exist')
    }
    if (user.isAdmin === false) {
        query = { user: req.user.id }
    }
    // Query for certain types of tickets depending on request params
    if (type === 'new' || type === 'open' || type === 'closed') {
        query.status = type
    }

    const tasks = await Task.find({ ...query }).sort({ createdAt: -1 })
    
    res.json(tasks)
}

// Create task for user
// @route  POST /tasks
// @auth    Private
module.exports.createTask = async (req, res) => {
    const { product, description } = req.body

    if (!product || !description) {
        return new CustomError(400, 'Please include all fields')
    }
    try {
        const task = await new Task(
            { 
                user: req.user.id,
                product,
                description,
                status: 'new'
            }
        ).save()
        res.status(201).json(task)
    } catch(e) {
        throw new CustomError(400, e.message)
    }
}

// Get task for user
// @route  GET /tasks/:id
// @auth    Private
module.exports.getTask = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(req.user.id)
    if (!user) {
        throw new CustomError(401, 'User does not exist')
    }
    const task = await Task.findById(id)
    if (!task) {
        throw new CustomError(400, 'Task does not exist')
    }
    if (task.user._id.toString() !== req.user.id && req.user.isAdmin === false) {
        throw new CustomError(401, 'No Authorization')
    }

    res.json(task)
}

// Delete task for user
// @route  DELETE /tasks/:id
// @auth    Private
module.exports.deleteTask = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(req.user.id)
    if (!user) {
        throw new CustomError(401, 'User does not exist')
    }
    const task = await Task.findById(id)
    if (!task) {
        throw new CustomError(400, 'Task does not exist')
    }
    
    if (task.user._id.toString() !== req.user.id && req.user.isAdmin === false) {
        throw new CustomError(401, 'No Authorization')
    }

    await task.remove()

    res.json({success: true})
}


// Update task for user
// @route  PUT /tasks/:id
// @auth    Private
module.exports.updateTask = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(req.user.id)
    if (!user) {
        throw new CustomError(401, 'User does not exist')
    }
    const task = await Task.findById(id)
    if (!task) {
        throw new CustomError(400, 'Task does not exist')
    }
    
    if (task.user._id.toString() !== req.user.id && req.user.isAdmin === false) {
        throw new CustomError(401, 'No Authorization')
    }

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true })
    
    res.json(updatedTask)
}

// Get task amounts for user
// @route  GET /tasks/amounts
// @auth    Private
module.exports.getTaskAmounts = async (req, res) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        throw new CustomError(401, 'User does not exist')
    }
    let query = {}
    if (user.isAdmin === false) {
        query = {user: req.user.id}
    }
    const totalTasks = await Task.find({ ...query }).countDocuments()
    const newTasks = await Task.find({ ...query, status: 'new' }).countDocuments()
    const openTasks = await Task.find({ ...query, status: 'open' }).countDocuments()
    const closedTasks = await Task.find({ ...query, status: 'closed' }).countDocuments()
    
    const taskAmounts = {
        totalTasks,
        newTasks,
        openTasks,
        closedTasks
    }
    res.json(taskAmounts)
}