import { Router } from 'express'

const _ = require('lodash')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const passportJwt = require('passport-jwt')

const router = Router()

var users = [
  {
    id: 1,
    username: 'jonathanmh',
    password: '%2yx4'
  },
  {
    id: 2,
    username: 'test',
    password: 'test'
  }
]

// Passport + JWT
var ExtractJwt = passportJwt.ExtractJwt
var JwtStrategy = passportJwt.Strategy

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = 'secret'

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload)
  // usually this would be a database call:s
  var user = users[_.findIndex(users, {id: jwt_payload.id})]
  if (user) {
    next(null, user)
  } else {
    next(null, false)
  }
})

passport.use(strategy)

router.use(passport.initialize())

// Login
router.post("/login", (req, res) => {
  if(req.body.username && req.body.password) {
    var username = req.body.username
    var password = req.body.password
  }
  // usually this would be a database call:
  var user = users[_.findIndex(users, {username: username})]
  if(!user) {
    res.status(401).json({message:"Username not found"})
  }

  else if(user.password === req.body.password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = {id: user.id}
    var token = jwt.sign(payload, jwtOptions.secretOrKey)
    res.json({message: "ok", token: token})
  } else {
    res.status(401).json({message:"Incorrect password"})
  }
})

// Secret API
router.get("/secret", passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json("Success! You can not see this without a token")
})

router.get("/secretDebug",
  (req, res, next) => {
    console.log(req.get('Authorization'))
    next()
  }, (req, res) => {
    res.json("debugging")
})


export default router
