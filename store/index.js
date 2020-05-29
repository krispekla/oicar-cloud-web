export const state = () => ({
  isAuthenticated: false,
  email: '',
  name: '',
  token: ''
})

export const mutations = {
  setIsAuthenticated(state, update) {
    state.isAuthenticated = update
  }
}

export const getters = {
  isAuthenticated: (state) => {
    return state.isAuthenticated
  }
}
