const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const textRoutes = require('./routes/textRoutes')

// Config 
dotenv.config()
const PORT = process.env.NODE_ENV === 'test' ? (process.env.TESTING_PORT | 5001): (process.env.PORT | 5000)

// Creating the server 
const app = express()
app.use(bodyParser.json())

// text Routes
app.use('/text',textRoutes)

app.use((req, res) => {
    res.status(404).json({message:"404 NOT FOUND"})
})

const server = app.listen(PORT, console.log(`Server listening on port ${PORT}`))

module.exports = { app, server }
