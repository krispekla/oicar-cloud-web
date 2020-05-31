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
    // this.$auth.$storage.setLocalStorage('token', user.token)
    // this.$auth.$storage.setLocalStorage('email', user.email)
    commit('login', user)
  },
  logout({ commit }) {
    // this.$auth.$storage.removeUniversal('token')
    // this.$auth.$storage.removeUniversal('email')
    commit('logout')
  }
}

export const getters = {
  isAuthenticated: (state) => {
    return state.isAuthenticated
  }
}
