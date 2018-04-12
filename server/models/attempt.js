const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AttemptsSchema = new Schema({
  projectId: String,
  classAId: String,
  classBId: String,
  featureAId: String,
  featureBId: String,
  valueA: Schema.Types.Mixed,
  valueB: Schema.Types.Mixed,
  userId: String
})

const Attempt = mongoose.model('Attempt', AttemptsSchema)
module.exports = Attempt
