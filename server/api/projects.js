import { Router } from 'express'

const router = Router()

// Dependencies
const multer = require('multer')
const path = require('path')

let uploadIndex = 0

var upload = multer({ storage: multer.diskStorage({

  destination: function (req, file, callback) {
    callback(null, './static/uploads')
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    uploadIndex++
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

// Add new projects
router.post('/projects', upload.any(), (req, res) => {

  const newProject = new Project({
    title: req.body.title,
    description: req.body.description,
    owner: req.body.owner,
    file: req.files,
    classes: req.body.classes,
    type: req.body.type,
    incentive: req.body.incentive,
    expense: req.body.expense,
    attempts: req.body.attempts,
    attemptsLimit: req.body.attemptsLimit,
    contributor: req.body.contributor,
    contributorLimit: req.body.contributorLimit,
    estimatedCost: req.body.estimatedCost,
    creationDate: req.body.creationDate,
    expiryDate: req.body.expiryDate,
    modelDate: req.body.modelDate,
    modelQuality: req.body.modelQuality,
    status: req.body.status
  })

  newProject.save((error) => {
    if (error) {
      console.log(error)
    }
    else res.send({
      success: true,
      message: 'Project saved successfully!'
    })
  })
})

// Update status
// router.post('/projects/status', (req, res) => {
//   Project.update(
//     { '_id': req.body.projectId },
//     {
//       '$set': {
//         req.body.status
//       }
//     }
//   )
// })

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

// Fetch all projects
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

// Fetch all project
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

export default router
