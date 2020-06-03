const state = {
  message: null,
  errors: [],
}

const getters = {
  errors: state => state.errors,
}

const actions = {
  error({ commit }, payload) {
    commit('error', payload)
  },
  clear({ commit }, message) {
    commit('clear', message)
  },
  // eslint-disable-next-line no-shadow
  isErrorForField({ getters }, field) {
    return getters.errors.includes(x => x.field === field)
  },
}

const mutations = {
  error(state, data) {
    state.message = data.message || null
    state.errors = data.errors || []
  },
  clear(state) {
    state.message = null
    state.errors = []
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
