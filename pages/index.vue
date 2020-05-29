<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <!-- <div class="text-center">
        <logo />
        <vuetify-logo />
      </div> -->
      <v-card max-width="800">
        <v-card-title class="headline text-center">
          Welcome to the Cloud calculator
        </v-card-title>
        <v-card-subtitle>
          Place where you can know all about cloud. You can find latest news,
          compare cloud providers and find one that matches your needs, save
          cloud configurations and much more.
        </v-card-subtitle>
        <v-card-actions>
          <v-spacer />
          <!-- <v-btn color="primary" nuxt to="/inspire">
            Continue
          </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
// import Logo from '~/components/Logo.vue'
// import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    // Logo,
    // VuetifyLogo
  }
}
</script>
