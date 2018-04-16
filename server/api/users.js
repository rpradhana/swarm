import { Router } from 'express'

const router = Router()

// Dependencies
const bcrypt = require('bcrypt')

const User = require('../models/user')

// POST register new user
router.post('/users', (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    // Store hash in database
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      paypal: req.body.paypal,
      type: req.body.type
    })

    newUser.save((error) => {
      if (error) {
        console.log(error)
      } else res.send({
        success: true,
        message: 'User saved successfully!'
      })
    })
  })
})


/* GET user by ID. */
router.get('/users/:id', (req, res, next) => {
  const id = req.params.id
  User.find({ _id: id }, '', (error, users) => {
    if (error) {
      console.error(error)
    } else res.send({
      users: users
    })
  }).sort({ _id: -1 })
})

// Fetch all users
router.get('/users', (req, res, next) => {
  User.find({}, '', (error, users) => {
    if (error) {
      console.error(error)
    } else res.send({
      users: users
    })
  }).sort({ _id: -1 })
})

export default router
