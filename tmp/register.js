import { Router } from 'express'

const router = Router()

const User = require('../models/user')
const passport = require('passport')

// Register user
router.post('/register', (req, res) => {
  res.send({
    success: true,
    message: 'Post saved successfully!'
  })
  User.register(new User({ username : req.body.username }), req.body.password, (err, user) => {
    passport.authenticate('local'), (req, res) => {
      res.redirect('/')
    }
  })
})

export default router
