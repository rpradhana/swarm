const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Models = new Schema({
  model: [Schema.Types.Mixed],
  userId: Schema.Types.ObjectId,
  projectId: Schema.Types.ObjectId,
  quality: { type: String, default: '-' },
  lastUpdate: Date
})

const Model = mongoose.model('Model', Models)
module.exports = Model
