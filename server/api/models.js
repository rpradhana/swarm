import { Router } from 'express'

const router = Router()

const moment = require('moment')

const Model = require('../models/model')
const Project = require('../models/project')

// POST register new model
router.post('/models', (req, res, next) => {

  console.log(req.body.model)

  let classCount = 0,
      featureCount = 0,
      quality = ''

  classCount = req.body.model.length

  req.body.model.some((feature) => {
    if (featureCount < Object.keys(feature).length - 1) {
      featureCount = Object.keys(feature).length - 1
    }
  })

  if (featureCount >= Math.ceil(2 * Math.ceil(Math.log2(classCount)))) {quality = 'Good'}
  else if (featureCount >= Math.ceil(Math.log2(classCount))) {quality = 'Okay'}
  else if (featureCount < Math.ceil(Math.log2(classCount))) {quality = 'Poor'}
  else {quality = 'Insufficient data'}

  console.log('class = ', classCount, ' | feature = ', featureCount)
  console.log('quality = ', quality)

  const newModel = new Model({
    model: req.body.model,
    userId: req.body.userId,
    projectId: req.body.projectId,
    // quality: req.body.quality,
    quality: quality,
    lastUpdate: moment()
  })

  newModel.save((error) => {
    if (error) {
      console.log(error)
    } else res.send({
      success: true,
    })
  })
  console.log(req.body.projectId)

  Project.findOne({ _id: req.body.projectId }, '', (error, project) => {
    console.log(project)
    project.modelQuality = quality
    project.modelDate = newModel.lastUpdate
    project.save()
  })

})

// Fetch all models
router.get('/models', (req, res) => {
  Model.find({}, '', (error, models) => {
    if (error) {
      console.error(error)
    }
    else res.send({
      models: models
    })
  }).sort({ _id: 1 })
})

// Fetch all models
router.get('/models/:userId', (req, res) => {
  const userId = req.params.userId
  Model.find({ userId: userId }, '', (error, models) => {
    if (error) {
      console.error(error)
    }
    else res.send({
      models: models
    })
  })
})

export default router
