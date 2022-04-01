const express = require('express')
const path = require('path')
const dotenv = require('dotenv').config()
const app = express()
const connectDatabase = require('./Config/db.js')
connectDatabase()
const {errorHandler} = require('./Middleware/error.js')
const CustomError = require('./Utils/CustomError.js')
const userRoutes = require('./Routes/users.js')
const taskRoutes = require('./Routes/tasks.js')
const commentRoutes = require('./Routes/comments.js')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))
app.use(express.urlencoded( {extended: false}))
app.use(express.json())
app.use(mongoSanitize({replaceWith: '_'}))



app.use(helmet())


app.use('/api/users', userRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/tasks/:id/comments', commentRoutes)


// Add frontend. Need to send the frontend build folder since create-react-app cannot run on server automatically
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html')))
} else {
    app.get('/', (req, res) => {
        res.json({ message: 'Task Tracker'})
    })
}

app.use(errorHandler)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}`))