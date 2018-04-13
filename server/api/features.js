import { Router } from 'express'

const router = Router()

const Feature = require('../models/feature')

/* GET user by ID. */
router.get('/features/:projectId', (req, res, next) => {
  const projectId = req.params.projectId

  Feature.find({ projectId : projectId }, '', (error, features) => {
    // console.log(features)
    // res.send(features)
  })

  res.send('')

})


export default router
