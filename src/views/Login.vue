<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <h2 class="font-weight-light mt-8 mb-3">Login</h2>
      <v-card class="elevation-3">
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              label="E-mail"
              :rules="[emailRules]"
              name="login"
              type="text"
            ></v-text-field>
            <v-text-field
              id="password"
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              :rules="[required]"
              label="Password"
              name="password"
              @click:append="show = !show"
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
import api from '../utils/baseApiService'
import { setAuthorizationHeader } from '../utils/baseApiService'
export default {
  name: 'Login',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    source: String,
  },
  data() {
    return {
      show: false,
      email: 'admin@test.com',
      password: 'admin',
      required: value => !!value || 'Required.',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }
  },
  methods: {
    async onLogin() {
      try {
        const result = await api.post('User/login', {
          email: this.email,
          password: this.password,
        })

        if (result.status === 200) {
          this.$store.commit('account/setRefreshToken', result.data)
          setAuthorizationHeader(result.data.token)
          this.$router.push('/')
        }
      } catch (e) {
        this.$alert.error(e.message)
      }
    },
  },
}
</script>
