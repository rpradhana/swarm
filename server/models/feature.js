const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Features = new Schema({
  feature: String,
  projectId: String,
  accuracy: { type: Number, default: 1 },
  occurence: { type: Number, default: 1 },
  values: [Schema.Types.Mixed]
})

const Feature = mongoose.model('Feature', Features)
module.exports = Feature
