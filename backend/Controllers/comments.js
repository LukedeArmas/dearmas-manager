const User = require('../Models/user.js')
const Task = require('../Models/task.js')
const Comment = require('../Models/comment.js')
const CustomError = require('../Utils/CustomError.js')

// Get comments for task
// @route  GET /tasks/:id/comments
// @auth    Private
module.exports.getComments = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(req.user.id)
    if (!user) {
        throw new CustomError(401, 'User does not exist')
    }
    const task = await Task.findById(id)
    if (!task) {
        throw new CustomError(400, 'Task does not exist')
    }
    
    if (task.user._id.toString() !== req.user.id) {
        throw new CustomError(401, 'No Authorization')
    }

    const comments = await Comment.find({ task: id })
    
    res.json(comments)
}


// Create comment for task
// @route  POST /tasks/:id/comments
// @auth    Private
module.exports.createComment = async (req, res) => {
    const { text } = req.body
    const { id } = req.params
    const user = await User.findById(req.user.id)
    if (!user) {
        throw new CustomError(401, 'User does not exist')
    }
    const task = await Task.findById(id)
    if (!task) {
        throw new CustomError(400, 'Task does not exist')
    }
    
    if (task.user._id.toString() !== req.user.id) {
        throw new CustomError(401, 'No Authorization')
    }

    const comment = await new Comment({ 
        user: req.user.id, 
        task: id, 
        text: text,
        isStaff: false 
    }).save()
    
    res.json(comment)
}