import express from 'express'
import { Nuxt, Builder } from 'nuxt'

import api from './api'

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/posts');
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function(callback){
	console.log('connection succeeded')
})

const Post = require('./models/post');
const bodyParser = require('body-parser')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const dev = !(process.env.NODE_ENV === 'production')
const port = process.env.PORT || (dev ? 8008 : 3000)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('cookie-parser')());

// Import API Routes
app.use('/api', api)

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

// Add new post
app.post('/posts', (req, res) => {
  var db = req.db;
  var title = req.body.title;
  var description = req.body.description;
  var new_post = new Post({
    title: title,
    description: description
  })

  new_post.save(function (error) {
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
app.get('/posts', (req, res) => {
  Post.find({}, 'title description', function (error, posts) {
    if (error) { console.error(error); }
    res.send({
      posts: posts
    })
  }).sort({_id:-1})
})
