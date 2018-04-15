import { Router } from 'express'

const router = Router()

// Dependencies
const multer = require('multer')
const path = require('path')
const moment = require('moment')

var upload = multer({ storage: multer.diskStorage({

  destination: function (req, file, callback) {
    // console.log(req, file, callback)
    callback(null, './static/uploads')
  },
  filename: function (req, file, callback) {
    console.log(req)
    callback(null, file.fieldname + '-' + req.body.owner + '-' + moment().format('x') + path.extname(file.originalname))
  }

}),

fileFilter: function(req, file, callback) {
  var ext = path.extname(file.originalname)
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
    return callback(/*res.end('Only images are allowed')*/ null, false)
  }
  callback(null, true)
}
})

const Project = require('../models/project')
const Class = require('../models/class')
const Feature = require('../models/feature')

// Add new projects
router.post('/projects', upload.fields([
    { name: 'tr-0' },
    { name: 'tr-1' },
    { name: 'tr-2' },
    { name: 'tr-3' },
    { name: 'tr-4' },
    { name: 'tr-5' },
    { name: 'tr-6' },
    { name: 'tr-7' },
    { name: 'tr-8' },
    { name: 'tr-9' },
    { name: 'tr-10' },
    { name: 'tr-11' },
    { name: 'tr-12' },
    { name: 'tr-13' },
    { name: 'tr-14' },
    { name: 'tr-15' },
    { name: 'te' }
  ]), (req, res) => {

  const newProject = new Project({
    title: req.body.title,
    description: req.body.description,
    owner: req.body.owner,
    ownerName: req.body.ownerName,
    testData: req.files['te'],
    classes: req.body.classes,
    type: req.body.type,
    incentive: req.body.incentive,
    expense: req.body.expense,
    attempts: req.body.attempts,
    attemptsLimit: req.body.attemptsLimit,
    contributor: req.body.contributor,
    estimatedCost: req.body.estimatedCost,
    creationDate: moment(),
    expiryDate: moment(req.body.expiryDate),
    modelDate: req.body.modelDate,
    modelQuality: req.body.modelQuality,
    status: req.body.status
  })

  newProject.save((error, project) => {

    let newClass

    project.classes.forEach((pClass, i) => {
      newClass = new Class({
        projectId: project._id,
        class: pClass,
        index: i,
        features: [],
        trainingData: req.files['tr-' + i]
      })

      newClass.save((error, c) => {
        if (error) {
          console.log(error)
        }
      })
    })

    if (error) {
      console.log(error)
    } else res.send({
      success: true,
      message: 'Project saved successfully!'
    })
  })

})

// Update status
router.post('/status', (req, res) => {

  console.log(req.body)

  // Project.findOne({ _id : req.body.projectId }, '', (error, project) => {

  //   const updatedProject = new Project ({
  //     title: project.title,
  //     status: req.body.status
  //   })

  //   console.log(project)

  //   updatedProject.save()

  // })

  Project.update(
    { _id : req.body.projectId },
    {
      $set: {
        status : req.body.status
      }
    }
  )

  res.send('status updated')
})

// Fetch all projects
router.get('/projects', (req, res) => {
  Project.find({}, '', (error, projects) => {
    if (error) {
      console.error(error)
    }
    else res.send({
      projects: projects
    })
  }).sort({ _id: -1 })
})

// Fetch all projects by user
router.get('/projects/:userId', (req, res) => {
  const userId = req.params.userId
  Project.find({ owner: userId }, '', (error, projects) => {
    if (error) {
      console.error(error)
    }
    else res.send({
      projects: projects
    })
  }).sort({ userId: -1 })
})

// Fetch specific project
router.get('/project/:projectId', (req, res) => {
  const projectId = req.params.projectId
  Project.findOne({ _id: projectId }, '', (error, project) => {
    if (error) {
      console.error(error)
    }
    else res.send({
      project: project
    })
  }).sort({ projectId: 1 })
})

// For modelling
router.get('/project/modelling/:projectId', (req, res) => {
  const projectId = req.params.projectId

  Project.findOne({ _id: projectId }, '', (error, project) => {
    Class.find({ projectId: projectId }, '', (error, classes) => {
      Feature.find({ projectId: projectId }, '', (error, features) => {

        var sampleClasses = []
        console.log(classes)
        classes.forEach((c) => {
          sampleClasses.push({
            class: c.class,
            trainingData: c.trainingData[0]
          })
        })

        res.send({
          project: project,
          sampleClasses: sampleClasses,
          classes: classes,
          features: features
        })

      }).sort({ occurence: 1 })
    }).sort({ projectId: 1 })
  }).sort({ _id: 1 })

})

export default router
