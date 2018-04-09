import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Polyfill for `window.fetch()`
require('whatwg-fetch')

const store = () => new Vuex.Store({

  state: {
    authUser: null,
    attempt: null
  },

  mutations: {
    SET_USER: function (state, user) {
      state.authUser = user
    },
    SET_ATTEMPT: function (state, project) {
      state.attempt = project
    }
  },

  actions: {
    nuxtServerInit ({ commit }, { req }) {
      if (req.session && req.session.authUser) {
        commit('SET_USER', req.session.authUser)
      }
      if (req.session && req.session.attempt) {
        commit('SET_ATTEMPT', req.session.attempt)
      }
    },
    attempt ({ commit }, { id }) {
      return fetch('/api/attempt', {
        // Send the client cookies to the server
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id
        })
      }).then((res) => {
        if (res.status >= 400 && res.status < 500) {
          throw new Error('Failed to attempt project')
        } else {
          return res.json()
        }
      }).then((attempt) => {
        commit('SET_ATTEMPT', attempt)
      })
    },
    login ({ commit }, { email, password, type }) {
      return fetch('/api/login', {
        // Send the client cookies to the server
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          type
        })
      }).then((res) => {
        if (res.status === 401) {
          alert('Invalid login credentials')
          throw new Error('Invalid login credentials')
        } else {
          return res.json()
        }
      }).then((authUser) => {
        commit('SET_USER', authUser)
      })
    },
    logout ({ commit }) {
      return fetch('/api/logout', {
        // Send the client cookies to the server
        credentials: 'same-origin',
        method: 'POST'
      }).then(() => {
        commit('SET_USER', null)
      })
    }
  }

})

export default store
