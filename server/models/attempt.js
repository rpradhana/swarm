const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AttemptsSchema = new Schema({
  projectId: String,
  classAId: Schema.Types.ObjectId,
  classBId: Schema.Types.ObjectId,
  featureAId: Schema.Types.ObjectId,
  featureBId: Schema.Types.ObjectId,
  featureId: Schema.Types.ObjectId,
  valueA: Schema.Types.Mixed,
  valueB: Schema.Types.Mixed,
  userId: Schema.Types.ObjectId,
  timestamp: Schema.Types.Mixed
})

const Attempt = mongoose.model('Attempt', AttemptsSchema)
module.exports = Attempt
