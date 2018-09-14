const state = {
    groups: [],
    setMessageReaded:{

    }
}

// getters
const getters = {
    getGroups: (state) => {
        return state.groups
    },
    getMessageReaded(state) {
        return state.messageReaded
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
    setMessageReaded(state,messageReaded){
        state.messageReaded.map(item => {
            if(item.idGroup == messageReaded.idGroup)
            {
                item.idMessage = messageReaded.idMessage
            }
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
