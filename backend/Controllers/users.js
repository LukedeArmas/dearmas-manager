const CustomError = require('../Utils/CustomError.js')
const bcrypt = require('bcryptjs')
const User = require('../Models/user.js')
const { createJsonWebToken } = require('../Utils/HelperFunctions.js')

// Registers a user
// @route   /users
// @auth    Public
module.exports.register = async (req, res) => {
    const { name, email, password } = req.body

    // Validation (might do this with JOI later)
    if (!name || !email || !password) {
        throw new CustomError(400,'Please include all fields')
    }

    // Find if the user already exists
    const checkUserExists = await User.findOne({ email })
    if (checkUserExists) {
        throw new CustomError(400, 'User already exists')
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10)
    const hashedPW = await bcrypt.hash(password, salt)

    // Create user
    const newUser = await new User({name, email, password: hashedPW}).save()
    if (!newUser) {
        throw new CustomError(400, 'User data not valid' )
    } 

    res.status(201).send({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: createJsonWebToken(newUser._id)
        })
}

// Logs in a user
// @route   /users/login
// @auth    Public
module.exports.login = async (req, res) => {
    const {email, password} = req.body

    // Validation (might do this with JOI later)
    if (!email || !password) {
        throw new CustomError(400,'Please include all fields')
    }

    // Find if the user already exists
    const user = await User.findOne({ email })
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new CustomError(401, 'Invalid Credentials')
    }

    res.send({
        _id: user._id,
        name: user.name, 
        email: user.email,
        token: createJsonWebToken(user._id)
    })
}

// Get current user
// @route   /users/me
// @auth    Private
module.exports.getMe = async (req, res) => {
    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name
    }
    res.send(user)
}