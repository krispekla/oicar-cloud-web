import api from './baseApiService'

let isRefreshing = false
let subscribers = []

const subscribeTokenRefresh = callback => subscribers.push(callback)
const refreshRequests = token => subscribers.forEach(cb => cb(token))

export default (app, config) => {
  let originalRequest = config
  app.$store.commit('account/setLastRoute', app.$route.fullPath)

  if (!isRefreshing) {
    isRefreshing = true

    app.$store.dispatch('account/refreshToken').then(({ accessToken }) => {
      isRefreshing = false
      refreshRequests(accessToken)
      subscribers = []
    })
  }

  return new Promise((resolve, reject) => {
    subscribeTokenRefresh(token => {
      if (token === undefined || token === null) {
        return reject('Access token undefined')
      }

      originalRequest.headers.Authorization = `Bearer ${token}`
      resolve(api(originalRequest))
    })
  })
}
