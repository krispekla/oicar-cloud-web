<template>
  <div v-if="!isAuthenticated" class="auth-nav mr-4">
    <a @click="onLoginClick">Login</a>
    <a @click="onRegisterClick">Register</a>
  </div>
  <div v-else class="auth-nav mr-4">
    <a @click="onLogout">Logout</a>
  </div>
</template>

<script>
import { setAuthorizationHeader } from '../utils/baseApiService'
export default {
  name: 'UserAuthenticationNav',
  computed: {
    isAuthenticated() {
      return this.$store.getters['account/isAuthenticated']
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch('account/logout')
      setAuthorizationHeader('')
      this.$router.push('/')
    },
    onLoginClick() {
      this.$router.push('/login')
    },
    onRegisterClick() {
      this.$router.push('/registration')
    },
  },
}
</script>
<style>
.auth-nav a {
  text-decoration: none;
  color: black;
  margin-right: 15px;
}

.auth-nav a:hover {
  color: rgb(92, 92, 92);
}
</style>
