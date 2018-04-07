import { Router } from 'express'

const router = Router()

const User = require('../models/user')

// Mock Users
// const users = [
//   { name: 'Alexandre' },
//   { name: 'Pooya' },
//   { name: 'Sébastien' },
// ]

// /* GET users listing. */
// router.get('/users', (req, res, next) => {
//   res.json(users)
// })

// POST register new user
router.post('/users', (req, res, next) => {

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
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


/* GET user by ID. */
router.get('/users/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  if (id >= 0 && id < users.length) {
    res.json(users[id])
  } else {
    res.sendStatus(404)
  }
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
