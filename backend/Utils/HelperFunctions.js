const JWT = require('jsonwebtoken')

module.exports.createJsonWebToken = (id) => {
    return JWT.sign({ id }, process.env.JWT_SECRET,{
        expiresIn: '30d'
    } )
}