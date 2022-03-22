const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const connectDatabase = require('./Config/db.js')
connectDatabase()
const {errorHandler} = require('./Middleware/error.js')
const CustomError = require('./Utils/CustomError.js')
const userRoutes = require('./Routes/users.js')

app.use(express.urlencoded( {extended: false}))
app.use(express.json())
app.use('/users', userRoutes)

app.get('*', (req, res) => {
    throw new CustomError(404, 'Page does not exist')
})

app.use(errorHandler)


const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}`))