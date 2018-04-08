const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  title: String,
  description: String,
  owner: String,
  file: String,
  classes: String,
  type: String,
  incentive: Number,
  expense: Number,
  attempts: Number,
  attemptsLimit: Number,
  contributor: Number,
  contributorLimit: Number,
  estimatedCost: Number,
  creationDate: Date,
  expiryDate: Date,
  modelDate: Date,
  modelQuality: String
})

const Project = mongoose.model('Project', ProjectSchema)
module.exports = Project
