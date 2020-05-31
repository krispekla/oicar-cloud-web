<template>
  <div v-if="!isAuthenticated" class="auth-nav mr-4">
    <a href="/login">Login</a>
    <a href="/registration">Register</a>
  </div>
  <div v-else class="auth-nav mr-4">
    <a @click="onLogout">Logout</a>
  </div>
</template>

<script>
export default {
  name: 'UserAuthenticationNav',
  computed: {
    isAuthenticated() {
      return this.$store.state.localStorage.isAuthenticated
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('localStorage/logout')
      this.$axios.setToken('', 'Bearer')
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
.auth-nav a {
  text-decoration: none;
  color: black;
  margin-right: 15px;
}

.auth-nav a:hover {
  color: rgb(92, 92, 92);
}
</style>
