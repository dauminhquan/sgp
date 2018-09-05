import Vue from 'vue'
import Vuex from 'vuex'
import room from './modules/ChatTeam/room'
Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    location: null,
    token: null
  },
  getters: {
    getLocation (state) {
      return state.location
    },
    getToken (state) {
      return state.token
    }
  },
  mutations: {
    setLocation (state, location) {
      state.location = location
    },
    setToken (state, token) {
      state.token = token
    }
  },
  modules: {
    room
  }
})
