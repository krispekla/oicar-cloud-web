<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              label="Login"
              name="login"
              type="text"
            ></v-text-field>
            <v-text-field
              id="password"
              v-model="password"
              label="Password"
              name="password"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="onLogin">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'Login',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    source: String
  },
  data() {
    return {
      email: 'admin@test.com',
      password: 'admin'
    }
  },
  methods: {
    async onLogin() {
      // this.$axios.setBaseURL('http://localhost:5005/api')
      const result = await this.$axios.post('User/login', {
        email: this.email,
        password: this.password
      })

      // eslint-disable-next-line no-console
      console.log(result)

      if (result.status === 200) {
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'Success',
          text: 'Successfully logged'
        })
        this.$axios.setToken(result.data.token, 'Bearer')
        this.$store.dispatch('localStorage/login', result.data)
        this.$router.push('/calculator')
      }
    }
  }
}
</script>
