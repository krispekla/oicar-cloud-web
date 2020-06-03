<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card max-width="800" class="welcome-panel mt-6 elevation-8">
        <v-card-title class="headline text-center ">
          Welcome to the Cloud calculator
        </v-card-title>
        <v-card-subtitle class="font-weight-light">
          Place where you can know all about cloud. You can find latest news, compare cloud
          providers and find one that matches your needs, save cloud configurations and much more.
        </v-card-subtitle>
      </v-card>
    </v-flex>
    <v-flex xs12 sm8 md6>
      <h2 class="font-weight-light mt-12 mb-1">Cloud news</h2>
      <div
        v-for="(item, index) in newsPost"
        :key="index"
        :data="item"
        class="news-post"
        @click.stop="onNewsPostShow(index)"
      >
        <v-card max-width="800" class="mb-8 pa-3">
          <v-card-title class="headline mb-6 pt-3 mx-3">
            {{ item.title }}
          </v-card-title>
          <v-card-subtitle class="mx-5">
            {{ item.content }}
          </v-card-subtitle>
        </v-card>
      </div>
    </v-flex>

    <v-dialog v-model="dialog" max-width="800" class="p-12">
      <v-card max-width="800" class="mb-8 pa-3">
        <v-card-title class="headline mb-6 pt-3 mx-3">
          {{ currentNewsPost.title }}
        </v-card-title>
        <v-card-subtitle class="mx-5">
          {{ currentNewsPost.content }}
        </v-card-subtitle>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import api from '../utils/baseApiService'

export default {
  async mounted() {
    try {
      const result = await api.get('/CloudNews/getAll')
      if (result.status == 200) {
        this.newsPost = result.data
      }
    } catch (e) {
      this.$alert.error(e.message)
    }
  },
  data() {
    return {
      currentNewsPost: {},
      newsPost: [],
      dialog: false,
    }
  },
  methods: {
    onNewsPostShow(index) {
      this.dialog = true
      this.currentNewsPost = this.newsPost[index]
    },
  },
}
</script>
<style scoped>
.news-post {
  transition: all 0.4s ease;
}
.news-post > .v-card {
  transition: all 0.4s ease !important;
  background: rgba(233, 233, 233, 0.521);
}

.news-post .v-card:hover {
  cursor: pointer;
  transform: scale(1.02);
  transition: all 0.4s ease !important;
}

.welcome-panel {
  background: rgba(37, 36, 36, 0.774) !important;
  color: white !important;
}
.welcome-panel > .v-card__subtitle {
  color: white !important;
}
</style>
