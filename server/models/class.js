const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ClassSchema = new Schema({
  projectId: String,
  class: String,
  index: { type: Number, default: 1 },
  features: [Schema.Types.Mixed],
  trainingData: [Schema.Types.Mixed]
})

const Class = mongoose.model('Class', ClassSchema)
module.exports = Class
