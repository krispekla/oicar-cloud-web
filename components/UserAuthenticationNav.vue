<template>
  <div v-if="!isAuthenticated" class="auth-nav mr-4">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  </div>
  <div v-else class="auth-nav mr-4">
    <a>Logout</a>
  </div>
</template>

<script>
export default {
  name: 'UserAuthenticationNav',
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
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
