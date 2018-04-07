const bodyParser = require('body-parser')
const session = require('express-session')

const resolve = require('path').resolve

const dev = !(process.env.NODE_ENV === 'production')
let middlewares = [
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  session({
    secret: '3/WWH1ii=r<5mJMSfj~2m1G93f{#V"',
    name: 'sessionId',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  })
]

if (dev) {
  const proxy = require('http-proxy-middleware')
  const port = process.env.PORT || 8008
  middlewares = [proxy('/api', {target: `http://localhost:${port}`})]
}

module.exports = {
  /*
  ** Headers of the page
  */
  dev: dev,
  head: {
    title: 'Swarm',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/swarm-icon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/custom.css'
  ],
  /**
  ** Modules
  */
  modules: [
    // Custom bootstrap CSS...
    ['bootstrap-vue/nuxt', { css: false }],

    // Sass resource loader
    ['nuxt-sass-resources-loader', [
        resolve(__dirname, 'assets/bootstrap/scss/_functions.scss'),
        resolve(__dirname, 'assets/bootstrap/scss/_variables.scss'),
        resolve(__dirname, 'assets/bootstrap/scss/_mixins.scss')
    ]]
  ],
  /*
  ** Add proxy
  */
  serverMiddleware: middlewares,
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
