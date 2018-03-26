const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
	title: String,
	description: String,
	owner: String,
	type: String,
	incentive: Number,
	contributor: Number,
	contributorLimit: Number,
	estimatedCost: Number,
	creationDate: Date,
	expiryDate: Date
})

const Project = mongoose.model('Project', ProjectSchema)
module.exports = Project
