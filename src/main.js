import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'flatpickr/dist/flatpickr.css'
import './assets/main.css'
import './assets/icons.css'

import './plugins/veeValidate'
import './plugins/vueNotifications'
import './plugins/vueProgressBar'
import Alert from './plugins/alert'

// import i18n from './plugins/i18n'

// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import GlobalCompoennts from './utils/baseComponents'

import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

// Vue.use(BootstrapVue)
// Vue.use(IconsPlugin)
Vue.use(Alert)
Vue.use(GlobalCompoennts)

const app = new Vue({
  router,
  store,
  vuetify,
  // i18n,
  render: h => h(App),
}).$mount('#app')

export default app
