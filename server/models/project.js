const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  title: String,
  description: String,
  owner: String,
  ownerName: String,
  file: [Schema.Types.Mixed],
  classes: [String],
  type: String,
  incentive: Number,
  expense: Number,
  attempts: Number,
  attemptsLimit: Number,
  contributor: Number,
  estimatedCost: Number,
  creationDate: Date,
  expiryDate: Date,
  modelDate: Date,
  modelQuality: String,
  status: String
})

const Project = mongoose.model('Project', ProjectSchema)
module.exports = Project
