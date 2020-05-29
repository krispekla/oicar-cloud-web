<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      expand-on-hover
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
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
      <v-app-bar-nav-icon
        class="d-flex d-lg-none"
        @click.stop="drawer = !drawer"
      />
      <a class="ml-auto" href="/">
        <v-icon x-large class="mr-3" light>
          mdi-cloud-outline
        </v-icon>
      </a>
      <v-toolbar-title class="mr-auto" v-text="title" />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span class="mx-auto"
        >Oicar Cloud&copy; {{ new Date().getFullYear() }}</span
      >
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: true,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-calculator',
          title: 'Calculator',
          to: '/calculator'
        },
        {
          icon: 'mdi-format-list-numbered-rtl',
          title: 'Configurations',
          to: '/configurations'
        }
      ],
      miniVariant: false,
      title: 'Oicar Cloud Calculator'
    }
  }
}
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
