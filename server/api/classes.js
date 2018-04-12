import { Router } from 'express'

const router = Router()

const Class = require('../models/class')

// Fetch all classes
router.get('/classes', (req, res) => {
  Class.find({}, '', (error, classes) => {
    if (error) {
      console.error(error)
    }
    else res.send({
      classes: classes
    })
  }).sort({ _id: -1 })
})

// Fetch all classes
router.get('/classes/:projectId', (req, res) => {
  const projectId = req.params.projectId
  Class.find({ projectId: projectId }, '', (error, pClass) => {
    if (error) {
      console.error(error)
    }
    else res.send({
      class: pClass
    })
  })
})

export default router
