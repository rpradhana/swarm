import express from 'express'
import { Nuxt, Builder } from 'nuxt'

import api from './api'

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')

// MongoDB
mongoose.connect('mongodb://localhost:27017/');
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function(callback){
  console.log('connection succeeded')
})

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

// Sessions to create `req.session`
app.use(session({
  secret: '3/WWH1ii=r<5mJMSfj~2m1G93f{#V"',
  name: 'sessionId',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}))

// POST `/api/login` to log in the user and add him to the `req.session.authUser`
app.post('/api/login', function (req, res) {
  if (req.body.username === 'demo@demo.com' && req.body.password === 'demo') {
    req.session.authUser = { username: 'demo@demo.com' }
    return res.json({ username: 'demo' })
  }
  res.status(401).json({ error: 'Bad credentials' })
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
