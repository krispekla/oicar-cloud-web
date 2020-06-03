<template>
  <div class="d-flex flex-column align-center justify-center mt-12">
    <p>To use this feature please login or register!</p>
    <div class="d-flex">
      <div class="my-2 mr-4">
        <v-btn large @click="onLogin">Login</v-btn>
      </div>
      <div class="my-2">
        <v-btn large @click="onRegister">Register</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForbiddenAccess',
  methods: {
    onLogin() {
      this.$router.push('/login')
    },
    onRegister() {
      this.$router.push('/registration')
    },
  },
}
</script>
<style scoped></style>
