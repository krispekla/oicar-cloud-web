import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
  color: '#82B1ff',
  failedColor: '#dc3545',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.5s',
    termination: 300,
  },
  location: 'top',
})
