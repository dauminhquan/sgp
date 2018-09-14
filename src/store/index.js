import Vue from 'vue'
import Vuex from 'vuex'
import room from './modules/ChatTeam/room'
Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state: {
        location: null,
        token: null,
        user: null,
        companyMembers: null
    },
    getters: {
        getLocation (state) {
            return state.location
        },
        getToken (state) {
            return state.token
        },
        getUser(state)
        {
            return state.user
        },
        getCompanyMembers(state){
            return state.companyMembers
        }
    },
    mutations: {
        setLocation (state, location) {
            state.location = location
        },
        setToken (state, token) {
            state.token = token
        },
        setUser(state,user)
        {
            state.user = user
        },
        removeToken(state)
        {
          state.token = null
        },
        setCompanyMembers(state,companyMembers){
            state.companyMembers = companyMembers
        }
    },
    modules: {
        room
    }
})
