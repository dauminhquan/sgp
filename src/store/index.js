import Vue from 'vue'
import Vuex from 'vuex'
import room from './modules/ChatTeam/room'
Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    location: null
  },
  getters: {
    getLocation (state) {
      return state.location
    }
  },
  mutations: {
    setLocation (state, location) {
      state.location = location
    }
  },
  modules: {
    room
  }
})
