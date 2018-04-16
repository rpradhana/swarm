import express from 'express'
import { Nuxt, Builder } from 'nuxt'

import api from './api'

// Dependencies
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const bcrypt = require('bcrypt')

// MongoDB
mongoose.connect('mongodb://localhost:27017/swarm');
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function(callback){
  console.log('connection succeeded')
})

const User = require('./models/user')
const Project = require('./models/project')

// Express
const app = express()
const host = process.env.HOST || '127.0.0.1'
const dev = !(process.env.NODE_ENV === 'production')
const port = process.env.PORT || (dev ? 8008 : 3000)

// Load modules
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('cookie-parser')());

// Load API
app.use('/api', api)

// Use statics
app.use(express.static('uploads'))

// Sessions to create `req.session`
app.use(session({
  secret: '3/WWH1ii=r<5mJMSfj~2m1G93f{#V"',
  name: 'sessionId',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60*60*1000, secure: false }
}))

// POST `/api/attempt` to attempt a project and add the id to the `req.session.attempt`
app.post('/api/attempt', function (req, res) {

  Project.findOne({ _id: req.body.id }, '', (error, project) => {
    if (error) {
      console.error(error)
    } else if (project) {
      if (req.body.id === project.id) {
        req.session.attempt = { id: project.id }
        return res.json({ project: project })
      }
    } else {
    }
  })

})

// POST `/api/logout` to log out the user and remove it from the `req.session`
app.post('/api/endAttempt', function (req, res) {
  delete req.session.attempt
  res.json({ ok: true })
})

// POST `/api/login` to log in the user and add him to the `req.session.authUser`
app.post('/api/login', function (req, res) {

  User.findOne(
    { $and: [
        { email: req.body.email },
        { type: req.body.type }
      ]
    },
    '',
    (error, user) => {
    if (error) {
      console.error(error)
    } else if (user) {

      // user.password is the bcrypt hashed password
      bcrypt.compare(req.body.password, user.password, function(err, response) {
        if (response) {
          req.session.authUser = { email: user.email, type: user.type }
          return res.json({ user: user })
        } else {
          res.status(401).json({ error: 'Invalid password' })
        }
      })

    } else {
      res.status(401).json({ error: 'Invalid email address' })
    }
  })

})

// POST `/api/logout` to log out the user and remove it from the `req.session`
app.post('/api/logout', function (req, res) {
  delete req.session.authUser
  res.json({ ok: true })
})

// Nuxt
if (!dev) {
  // Import and Set Nuxt.js options
  let config = require('../nuxt.config.js')
  config.dev = dev

  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Give nuxt middleware to express
  app.use(nuxt.render)
}

app.set('port', port)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
