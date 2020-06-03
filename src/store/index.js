import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

// modules
import validation from './modules/validation'
import account from './modules/account'

Vue.use(Vuex)

const isProduction = process.env.NODE_ENV === 'production'

export default new Vuex.Store({
  plugins: [persistedState({ key: 'store', paths: ['account'] })],
  modules: {
    validation,
    account,
  },
  strict: !isProduction,
})
