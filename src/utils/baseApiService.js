import axios from 'axios'
import app from '@/main'
import { MediaType, HttpStatusCode } from './constants'
import handleError from './handleError'
import handleUnauthorized from './handleUnauthorized'
import parseParams from './parseParams'
const instance = axios.create({
  baseURL: process.env.VUE_APP_URL_API,
  headers: {
    'Accept': 'application/json',
    'Content-Type': MediaType.APPLICATION_JSON,
  },
})

instance.interceptors.request.use(config => {
  if (config.method === 'get') {
    config.paramsSerializer = params => parseParams(params)
  }

  app.$Progress.start()
  return config
})

instance.interceptors.response.use(
  response => {
    app.$Progress.finish()
    return Promise.resolve(response)
  },
  error => {
    const { response, config } = error
    if (response && response.status === HttpStatusCode.UNAUTHORIZED) {
      return handleUnauthorized(app, config)
    }

    app.$Progress.fail()
    return Promise.reject(handleError(app, response))
  }
)

if (app) {
  const token = app.$store.getters['account/token']
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// eslint-disable-next-line prettier/prettier
export const setAuthorizationHeader = token =>
  (instance.defaults.headers.common['Authorization'] = `Bearer ${token}`)

export default instance
