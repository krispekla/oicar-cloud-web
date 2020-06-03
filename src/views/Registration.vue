<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <h2 class="font-weight-light mt-8 mb-3">Registration</h2>
      <v-card class="elevation-12">
        <v-card-text>
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-text-field
              v-model="firstName"
              :counter="10"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="lastName"
              :counter="10"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="show = !show"
            ></v-text-field>

            <v-btn color="primary" class="d-flex ml-auto mt-4" @click="onRegisterClick">
              Register
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import api from '../utils/baseApiService'
export default {
  data: () => ({
    show: false,
    valid: true,
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => `"The·email·and·password·you·entered·don't·match"`,
    },
    lazy: false,
  }),
  methods: {
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    async onRegisterClick() {
      const isValid = this.$refs.form.validate()
      if (!isValid) return

      try {
        const result = await api.post('User/register', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        })

        if (result.status === 200) {
          // setAuthorizationHeader(result.data.token, 'Bearer')
          console.log(result.data.token)
          // this.$store.commit('account/setRefreshToken', result.data.token)
          // setAuthorizationHeader(result.data.token)
          // this.$router.push('/')
        }
      } catch (e) {
        this.$alert.error(e.message)
      }
    },
  },
}
</script>
