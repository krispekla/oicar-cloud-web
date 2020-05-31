export const state = () => ({
  id: null,
  email: '',
  token: ''
})

export const mutations = {
  setToken(state, update) {
    state.token = update
  },
  login(state, data) {
    state.isAuthenticated = true
    state.token = data.token
    state.email = data.email
  },
  logout(state) {
    state.email = ''
    state.token = ''
    state.isAuthenticated = false
  }
}

export const actions = {
  login({ commit }, user) {
    commit('login', user)
  },
  logout({ commit }) {
    commit('logout')
  }
}

export const getters = {
  isAuthenticated: (state) => {
    return state.isAuthenticated
  }
}
