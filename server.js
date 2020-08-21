const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const uuid = require('uuid')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

let db_uri = ''
const NODE_ENV = process.env.NODE_ENV

if (NODE_ENV === 'development') {
    db_uri = process.env.MONGO_DEV_URI
} else if (NODE_ENV === 'test') {
    db_uri = process.env.MONGO_TEST_URI
} else if (NODE_ENV === 'production') {
    db_uri = process.env.MONGO_URI
} else {
    db_uri = process.env.MONGO_DEV_URI
}

mongoose.connect(db_uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const connection = mongoose.connection;

connection.once('open', () => {
    if (NODE_ENV !== 'test') {
        console.log("Database connection established successfully");
    }
})

const packageRouter = require('./routes/package')

app.use('/package', packageRouter)

const server = app.listen(port, () => {
    if (NODE_ENV !== 'test') {
        console.log(`Server is running on port: ${port}`)
    }
})

module.exports = {
    app,
    server
}