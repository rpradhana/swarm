import { Router } from 'express'

const router = Router()

const User = require('../models/user')
const passport = require('passport')

// Sign out a user
router.get('/sign-out', (req, res) => {
  req.logout()
  res.redirect('/')
})

export default router
