import jwtDecode from 'jwt-decode'
import { setAuthorizationHeader } from '../../utils/baseApiService'
import router, { publicPages } from '../../router'
import app from '@/main'
const accountService = {}

const state = {
  id: null,
  username: null,
  expiresAt: null,
  token: null,
  accessToken: null,
  refreshToken: null,
  lastRoute: null,
}

const getters = {
  token: state => state.token,
  accessToken: state => state.accessToken,
  refreshToken: state => state.refreshToken,
  username: state => state.username || '',
  isAuthenticated: state => state.token !== null,
}

const mutations = {
  authenticateUser(state, data) {
    state.id = data.id
    state.username = data.username
    state.expiresAt = data.expiresAt
    state.accessToken = data.accessToken
    state.refreshToken = data.refreshToken
  },
  clearAuthentication(state) {
    state.id = null
    state.username = null
    state.expiresAt = null
    state.token = null
    state.accessToken = null
    state.refreshToken = null
  },
  setLastRoute(state, value) {
    if (publicPages.includes(value)) return

    state.lastRoute = value
  },
  clearLastRoute(state) {
    state.lastRoute = null
  },
  setRefreshToken(state, data) {
    state.token = data
    state.accessToken = data
    state.refreshToken = data
  },
}

const actions = {
  login: async ({ dispatch }, formData) => {
    try {
      const response = await accountService.login({
        username: app.$crypto.encryptAES(formData.username).toString(),
        password: app.$crypto.encryptAES(formData.password).toString(),
        token: formData.token,
      })
      //const response = await accountService.login({
      //  username: formData.username,
      //  password: formData.password,
      //})
      dispatch('handleLoginResponse', response.data)
    } catch (e) {
      app.$alert.error(e.message)
    }
  },
  handleLoginResponse: async ({ commit, dispatch }, response) => {
    const { accessToken, refreshToken, expires, message } = response

    setAuthorizationHeader(accessToken)

    const decoded = jwtDecode(accessToken)
    commit('authenticateUser', {
      id: Number(decoded.id),
      username: decoded.sub,
      expiresAt: new Date(Date.now() + expires),
      accessToken,
      refreshToken,
    })

    if (message != null) {
      app.$alert.error(message)
    }

    dispatch('handleLastRoute')
  },
  handleLastRoute: ({ state }) => {
    if (state.lastRoute) {
      router.replace(state.lastRoute)
    } else {
      router.replace('/')
    }
  },
  logout: ({ commit }) => {
    commit('clearAuthentication')

    router.replace('/login')
  },
  reset: ({ commit }) => {
    commit('clearAuthentication')
  },
  // eslint-disable-next-line no-unused-vars
  register: async ({ commit, dispatch }, formData) => {
    try {
      const response = await accountService.register(formData)
      const { message } = response.data

      if (message != null) app.$alert.info(response.data.message)
      router.push({ path: '/login' })
    } catch (ex) {
      app.$alert.error(ex.message)
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
