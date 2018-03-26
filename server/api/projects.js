import { Router } from 'express'

const router = Router()

const Project = require('../models/project');

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

// Add new post
router.post('/projects', (req, res) => {
  const db = req.db
  const title            = req.body.title,
        description      = req.body.description,
        owner            = req.body.owner,
        type             = req.body.type,
        incentive        = req.body.incentive,
        contributor      = req.body.contributor,
        contributorLimit = req.body.contributorLimit,
        estimatedCost    = req.body.estimatedCost,
        creationDate     = req.body.creationDate,
        expiryDate       = req.body.expiryDate

  const new_project = new Project({
    title            : title,
    description      : description,
    owner            : owner,
    type             : type,
    incentive        : incentive,
    contributor      : contributor,
    contributorLimit : contributorLimit,
    estimatedCost    : estimatedCost,
    creationDate     : creationDate,
    expiryDate       : expiryDate
  })

  new_project.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })
})

// Fetch all posts
router.get('/projects', (req, res) => {
  Project.find({}, '', function (error, projects) {
    if (error) { console.error(error); }
    res.send({
      projects: projects
    })
  }).sort({_id:-1})
})

export default router
