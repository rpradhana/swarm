const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AttemptsSchema = new Schema({
  classId: String,
  feature: String,
  value: [Schema.Types.Mixed]
})

const Attempt = mongoose.model('Attempt', AttemptsSchema)
module.exports = Attempt
