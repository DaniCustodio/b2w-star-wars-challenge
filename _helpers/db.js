require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true  })

const db = mongoose.connection

mongoose.Promise = global.Promise

module.exports = {
  Planet: require('../planets/planet-model'),
  db
}