const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  title: {type: String, default: '-'},
  description: {type: String, default: '-'},
  owner: String,
  ownerName: String,
  testData: [Schema.Types.Mixed],
  classes: [Schema.Types.Mixed],
  type: String,
  incentive: Number,
  expense: Number,
  attempts: {type: Number, default: 0},
  attemptsLimit: Number,
  contributor: {type: Number, default: 0},
  estimatedCost: Number,
  creationDate: Date,
  expiryDate: Date,
  modelDate: Date,
  modelQuality: String,
  status: String
})

const Project = mongoose.model('Project', ProjectSchema)
module.exports = Project
