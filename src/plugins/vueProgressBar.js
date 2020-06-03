import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
  color: 'blue',
  failedColor: '#dc3545',
  thickness: '7px',
  transition: {
    speed: '0.2s',
    opacity: '0.5s',
    termination: 300,
  },
  location: 'top',
})
