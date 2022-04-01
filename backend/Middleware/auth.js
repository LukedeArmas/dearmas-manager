const JWT = require('jsonwebtoken')
const User = require('../Models/user.js')
const CustomError = require('../Utils/CustomError.js')

module.exports.verifyUser = async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            // When we split the array the bearer is the first item and the token is the second
            token = req.headers.authorization.split(' ')[1]
            // Verify token
            const decoded = JWT.verify(token, process.env.JWT_SECRET)
            // Get user from token
            req.user = await User.findById(decoded.id).select('-password')
            return next()
        } catch(e) {
            console.log(e)
            return new CustomError(401, e)
        }
    }
    throw new CustomError(401, 'Authorization not allowed outer loop')
}
