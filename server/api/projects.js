import { Router } from 'express'

const router = Router()

const Project = require('../models/project')

// /* GET users listing. */
// router.get('/users', function (req, res, next) {
//   res.json(users)
// })

// /* GET user by ID. */
// router.get('/users/:id', function (req, res, next) {
//   const id = parseInt(req.params.id)
//   if (id >= 0 && id < users.length) {
//     res.json(users[id])
//   } else {
//     res.sendStatus(404)
//   }
// })
//

// Add new projects
router.post('/projects', (req, res) => {

  const newProject = new Project({
    title: req.body.title,
    description: req.body.description,
    owner: req.body.owner,
    type: req.body.type,
    incentive: req.body.incentive,
    contributor: req.body.contributor,
    contributorLimit: req.body.contributorLimit,
    estimatedCost: req.body.estimatedCost,
    creationDate: req.body.creationDate,
    expiryDate: req.body.expiryDate
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

export default router
