import Vue from 'vue'
import Vuex from 'vuex'
import room from './modules/ChatTeam/room'
Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    a: 'x'
  },
  getters: {
    getX: (state) => {
      return state.a
    }
  },
  mutations: {
    setA: (state, {x}) => {
      state.x = x
    }
  },
  modules: {
    room
  }
})
