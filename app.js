const express = require('express')
const app = express()
const errorHandler = require("./_helpers/error-handler")

app.use(express.json())

app.use('/', require('./planets/planet-routes'))

app.use(errorHandler)

module.exports = app
