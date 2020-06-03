import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Registration from '../views/Registration.vue'
import Calculator from '../views/Calculator.vue'
import Configurations from '../views/Configurations.vue'
import Forbidden from '../views/Forbidden.vue'

Vue.use(VueRouter)

export const publicPages = ['/', '/home', '/login', '/registration', '/forbidden']

const routes = [
  {
    path: '/registration',
    name: 'registration',
    component: Registration,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/calculator',
    name: 'calculator',
    component: Calculator,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/configurations',
    name: 'configurations',
    component: Configurations,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: Forbidden,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/*',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: false,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
  const isAuthenticationRequired = !publicPages.includes(to.path)
  const isAuthenticated = store.getters['account/isAuthenticated']

  // if (!isAuthenticationRequired) return next()

  if (isAuthenticationRequired && !isAuthenticated) {
    return next('/forbidden')
  }

  next()
})
export default router
