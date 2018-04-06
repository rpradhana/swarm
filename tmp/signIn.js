import { Router } from 'express'

const router = Router()

const User = require('../models/user')
const passport = require('passport')

// Sign in a user
router.post('/sign-in',
  passport.authenticate('local'), (req, res) => {
    res.redirect('/dashboard')
  }
)

export default router
