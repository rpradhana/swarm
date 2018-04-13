const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Features = new Schema({
  feature: String,
  projectId: String,
  accuracy: Number,
  values: [Schema.Types.Mixed]
})

const Feature = mongoose.model('Feature', Features)
module.exports = Feature
