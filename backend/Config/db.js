const mongoose = require('mongoose')

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL)
    .then((connection) => console.log(`Connected to database: ${connection.connection.host}` ))
    .catch((e) => 'Connection to database failed')
}


module.exports = connectDatabase