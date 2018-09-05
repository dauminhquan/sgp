const state = {
  groups: []
}

// getters
const getters = {
  getGroups: (state) => {
    return state.groups
  }
}

// actions
const actions = {

}

// mutations
const mutations = {
  setGroups(state, groups) {
    state.groups = groups
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
