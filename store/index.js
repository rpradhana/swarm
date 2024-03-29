import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

// Polyfill for `window.fetch()`
require('whatwg-fetch')

// Vuex Persist
const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage, // window.localStorage or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  reducer: state => ({
    authUser: state.authUser,
    attempt: state.attempt,
    project: state.project
  })
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

const store = () => new Vuex.Store({

  plugins: [vuexLocalStorage.plugin],

  state: {
    authUser: null,
    attempt: null,
    project: null
  },

  mutations: {
    SET_USER: function (state, user) {
      state.authUser = user
    },
    SET_ATTEMPT: function (state, attempt) {
      state.attempt = attempt
    },
    SET_PROJECT: function (state, project) {
      state.project = project
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
      if (req.session && req.session.project) {
        commit('SET_PROJECT', req.session.project)
      }
    },
    project ({ commit }, { id }) {
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
          throw new Error('Failed to open project')
        } else {
          return res.json()
        }
      }).then((project) => {
        commit('SET_PROJECT', project)
      })
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
    endAttempt ({ commit }) {
      return fetch('/api/endAttempt', {
        // Send the client cookies to the server
        credentials: 'same-origin',
        method: 'POST'
      }).then(() => {
        commit('SET_ATTEMPT', null)
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
        commit('SET_ATTEMPT', null)
      })
    }
  }

})

export default store
