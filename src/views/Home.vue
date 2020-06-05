<template>
  <div class="cloud-home-overview">
    <div class="cloud-home-content">
      <v-card max-width="800" class="welcome-panel mt-6 elevation-8">
        <v-card-title class="headline text-center ">
          Welcome to the Cloud calculator
        </v-card-title>
        <v-card-subtitle class="font-weight-light">
          Place where you can know all about cloud. You can find latest news, compare cloud
          providers and find one that matches your needs, save cloud configurations and much more.
        </v-card-subtitle>
      </v-card>
      <h2 class="font-weight-light mt-12 mb-1">Cloud news</h2>
      <div
        v-for="(item, index) in newsPost"
        :key="index"
        :data="item"
        class="news-post"
        @click.stop="onNewsPostShow(index)"
      >
        <v-card max-width="800" class="mb-8 pa-3 elevation-12">
          <v-card-title class="headline mb-6 pt-3 mx-3">
            {{ item.title }}
          </v-card-title>
          <v-img class="white--text align-end" height="350px" src="/covid-cloud.jpg"> </v-img>

          <v-card-subtitle class="mx-5">
            {{ item.content }}
          </v-card-subtitle>
        </v-card>
      </div>

      <v-dialog v-model="dialog" max-width="800" class="p-12">
        <v-card max-width="800" class="pa-3">
          <v-card-title class="headline mb-6 pt-3 mx-3">
            {{ currentNewsPost.title }}
          </v-card-title>
          <v-img class="white--text align-end mb-6" height="350px" src="/covid-cloud.jpg">
            <v-card-title class="headline mb-6 pt-3 mx-3">
              {{ currentNewsPost.title }}
            </v-card-title>
          </v-img>
          <v-card-subtitle class="mx-5">
            {{ currentNewsPost.content }}
          </v-card-subtitle>
          <v-card-subtitle class="mx-5">
            {{ currentNewsPost.content }}
          </v-card-subtitle>
          <v-card-subtitle class="mx-5">
            {{ currentNewsPost.content }}
          </v-card-subtitle>
        </v-card>
      </v-dialog>
    </div>
    <div class="cloud-home-sidebar">
      <v-card max-width="540" class="cloud-home-calculator elevation-10" @click="goToCalculator">
        <v-card-text class="white--text headline pt-10 pt-3 mx-3 justify-center">
          <v-icon class="white--text" large>mdi-calculator</v-icon>
          Find cheapest cloud provider
        </v-card-text>
      </v-card>
      <v-card
        max-width="540"
        class="cloud-home-configuration mt-6 elevation-10"
        @click="goToConfiguration"
      >
        <v-card-title class="white--text headline pt-10 pt-3 mx-3 justify-center">
          <v-icon class="white--text mr-4" large>mdi-format-list-numbered-rtl</v-icon>
          Calculate your prices
        </v-card-title>
      </v-card>
      <v-card max-width="540" class="cloud-home-package mt-6 elevation-10" @click="goToSuggestion">
        <v-card-title class="white--text headline pt-10 pt-3 mx-3 justify-center">
          Find most used cloud packages
        </v-card-title>
      </v-card>
    </div>
  </div>
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
    goToCalculator() {
      this.$router.push('calculator')
    },
    goToConfiguration() {
      this.$router.push('configuration')
    },
    goToSuggestion() {
      this.$router.push('suggestions')
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

.cloud-home-overview {
  display: grid;
  grid-template-columns: 1fr 800px 1fr;
  grid-template-areas: '. content sidebar';
}
.cloud-home-overview .v-dialog--active {
  background: white !important;
}
.cloud-home-content {
  grid-area: content;
}

.cloud-home-sidebar {
  grid-area: sidebar;
  padding: 30px;
}

.cloud-home-calculator {
  width: 400px;
  height: 120px;
  border-radius: 5%;
  font-size: 70px !important;
  background: rgba(5, 147, 230, 0.986) !important;
}

.cloud-home-configuration {
  width: 400px;
  height: 120px;
  border-radius: 5%;
  font-size: 70px !important;
  background: rgba(221, 64, 64, 0.986) !important;
}
.cloud-home-package {
  width: 400px;
  height: 120px;
  border-radius: 5%;
  font-size: 70px !important;
  background: #ffd900 !important;
}
</style>
