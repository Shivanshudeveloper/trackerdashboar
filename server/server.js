const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')
const connectDB = require('./config/dbConfig')
const colors = require('colors')

const main = require('./routes/main')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

require('dotenv').config()
const app = express()
app.use(bodyParser.json())
app.use(cors())
connectDB()

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

app.use('/api', main)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// error handler

app.use((req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`)
  console.log(error)
  res.status(404)
  next(error)
})

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: err.stack,
  })
})

app.listen(5000, function () {
  console.log('Server is running on 5000'.yellow.bold)
})
