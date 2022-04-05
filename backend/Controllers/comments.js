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
        throw new CustomError(400, 'Ticket does not exist')
    }
    
    if (task.user._id.toString() !== req.user.id && req.user.isAdmin === false) {
        throw new CustomError(401, 'No Authorization')
    }

    const comments = await Comment.find({ task: id }).populate('user')
    
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
        throw new CustomError(400, 'Ticket does not exist')
    }
    
    if (task.user._id.toString() !== req.user.id && req.user.isAdmin === false) {
        throw new CustomError(401, 'No Authorization')
    }

    const comment = await new Comment({ 
        user: req.user.id, 
        task: id, 
        text: text,
        isStaff: req.user.isAdmin ? true : false 
    }).save()
    const populatedComment = await comment.populate('user')
    
    res.json(populatedComment)
}


// Get comment for task
// @route  GET /tasks/:id/comments/:commentId
// @auth    Private
module.exports.getComment = async (req, res) => {
    const { id, commentId } = req.params

    const task = await Task.findById(id)
    if (!task) {
        throw new CustomError(400, 'Ticket does not exist')
    }
    if (task.user._id.toString() !== req.user.id && req.user.isAdmin === false) {
        throw new CustomError(401, 'No Authorization')
    }
    const comment = await Comment.findById(commentId)
    if (!comment) {
        throw new CustomError(400, 'Comment does not exist')
    }
    if (comment.user._id.toString() !== req.user.id && req.user.isAdmin === false) {
        throw new CustomError(401, 'No Authorization')
    }
    if (comment.task._id.toString() !== task._id.toString()) {
        throw new CustomError(403, 'Comment must be for this specific ticket')
    }
    
    res.json(comment)
}


// Delete comment for user
// @route  DELETE /tasks/:id/comments/:commentId
// @auth    Private
module.exports.deleteComment = async (req, res) => {
    const { id, commentId } = req.params
    // User handled in auth middleware

    const task = await Task.findById(id)
    if (!task) {
        throw new CustomError(400, 'Ticket does not exist')
    }
    if (task.user._id.toString() !== req.user.id && req.user.isAdmin === false) {
        throw new CustomError(401, 'No Authorization')
    }
    const comment = await Comment.findById(commentId)
    if (!comment) {
        throw new CustomError(400, 'Comment does not exist')
    }
    if (comment.user._id.toString() !== req.user.id && req.user.isAdmin === false) {
        throw new CustomError(401, 'No Authorization')
    }
    if (comment.task._id.toString() !== task._id.toString()) {
        throw new CustomError(403, 'Must delete a comment for this specific ticket')
    }

    const removedComment = await comment.remove()

    res.json(removedComment)
}


// Update comment for user
// @route  PUT /tasks/:id/comments/:commentId
// @auth    Private
module.exports.updateComment = async (req, res) => {
    const { id, commentId } = req.params

    const task = await Task.findById(id)
    if (!task) {
        throw new CustomError(400, 'Task does not exist')
    }
    if (task.user._id.toString() !== req.user.id && req.user.isAdmin === false) {
        throw new CustomError(401, 'No Authorization')
    }

    const comment = await Comment.findById(commentId)
    if (!comment) {
        throw new CustomError(400, 'Comment does not exist')
    }
    if (comment.user._id.toString() !== req.user.id && req.user.isAdmin === false) {
        throw new CustomError(401, 'No Authorization')
    }
    if (comment.task._id.toString() !== task._id.toString()) {
        throw new CustomError(403, 'Must edit a comment for this specific ticket')
    }

    const updatedComment = await Comment.findByIdAndUpdate(commentId, req.body, { new: true })
    
    res.json(updatedComment)
}