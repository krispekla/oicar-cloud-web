<template>
  <v-app dark id="app">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      expand-on-hover
    >
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon class="d-flex d-lg-none" @click.stop="drawer = !drawer" />
      <a class="ml-auto" href="/">
        <v-icon x-large class="mr-3" light>
          mdi-cloud-outline
        </v-icon>
      </a>
      <v-toolbar-title class="mr-auto" v-text="title" />
      <UserAuthenticationNav />
    </v-app-bar>
    <notifications
      group="main"
      :max="8"
      animation-name="fade"
      position="top right"
      classes="base-notification"
    />
    <v-content>
      <v-container>
        <vue-progress-bar />

        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span class="mx-auto">Oicar Cloud&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
  <!-- </div> -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import setAuthorizationHeader from './utils/baseApiService'
import UserAuthenticationNav from './components/UserAuthenticationNav'
import { setAuthorizationHeader } from './utils/baseApiService'

export default {
  components: { UserAuthenticationNav },
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: true,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-calculator',
          title: 'Calculator',
          to: '/calculator',
        },
        {
          icon: 'mdi-format-list-numbered-rtl',
          title: 'Configurations',
          to: '/configurations',
        },
        {
          icon: 'mdi-poll',
          title: 'Suggestions',
          to: '/suggestions',
        },
      ],
      miniVariant: false,
      title: 'Oicar Cloud Calculator',
    }
  },
  methods: {
    ...mapActions({
      clearErrors: 'validation/clear',
    }),
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'account/isAuthenticated',
      token: 'account/token',
    }),
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      this.clearErrors()
    },
  },
  created() {
    setAuthorizationHeader(this.token)
  },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.base-notification {
  padding: 10px 15px !important;
  margin: 0 5px 5px;
  font-family: 'Work Sans', sans-serif;
  font-size: 13px;
  color: white;
  border-radius: 7px;
}

/* Wrapper for Vue notifications plugin */
.notifications {
  bottom: 65px !important;
  right: 15px !important;
  font-family: 'Work Sans', sans-serif;
}
.vue-notification-group {
  top: 115px !important;
  right: 15px !important;
}

.notification-title {
  font-family: 'Work Sans', sans-serif;
  font-size: 17px;
  font-weight: bold;
}

.base-notification.info {
  background-color: #44a4fc;
  border-right-color: #187fe7;
}

.base-notification.warn {
  background-color: #ffd900;
  border-right-color: #ffc400;
  color: #2e384d;
}
.base-notification.error {
  background-color: #e54d42;
  border-right-color: #b82e24;
  color: white;
}

.base-notification.success {
  background-color: #68cd86;
  border-right-color: #42a85f;
}
</style>
