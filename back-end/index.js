const path = require('path')
const fs = require('fs')

const HttpError = require('./models/http-error')

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const owenerRoutes = require('./routes/owner')
const authRoutes = require('./routes/auth')
const clientRoutes = require('./routes/client')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/uploads/images', express.static(path.join('uploads', 'images')))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  next()
})

app.use('/owner', owenerRoutes)
app.use(authRoutes)
app.use('/client', clientRoutes)

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404)
  throw error
})

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err)
    })
  }
  if (res.headerSent) {
    return next(error)
  }
  res.status(error.code || 500)
  res.json({ message: error.message || 'An unknown error occurred!' })
})

const MONGODB_URI =
  'mongodb+srv://ali:o5KCJFnLB3dPVAdl@cluster0.qfowuuo.mongodb.net/food-order?retryWrites=true&w=majority'

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('Db connected!')
    app.listen(8000, () => {
      console.log('Listening on port 8000 !')
    })
  })
  .catch(err => console.log(err))
