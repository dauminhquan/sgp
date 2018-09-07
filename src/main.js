import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import 'pnotify/dist/es/PNotifyButtons'
import 'pnotify/dist/es/PNotifyMobile'
import axios from './axios'
import VueSocketio from 'vue-socket.io'
Vue.config.productionTip = false
Vue.use(VueSocketio, 'http://localhost:3000')
const tokenApp = 'token-app'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  computed: {
    groups () {
      return this.$store.getters['room/getGroups']
    }
  },
  watch: {
    groups (newValue, oldValue) {
      if (oldValue != null && oldValue != undefined) {
        if (oldValue.length > 0) {
          oldValue.forEach(item => {
            this.$socket.removeAllListeners('change_group_' + item._id)
          })
        }
      }
    }
  },
  mounted () {
    if (this.$store.getters.getLocation == null) {
      this.getLocation()
    }
  },
  methods: {
    getLocation () {
      if (navigator.geolocation && this.Latitude == null && this.Longitude == null) {
        let vm = this
        navigator.geolocation.getCurrentPosition(vm.setPosition)
      }
    },
    setPosition (position) {
      let latitude_ = position.coords.latitude
      let longitude_ = position.coords.longitude
      delete axios.defaults.headers.common['Auth-Token']
      axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude_ + ',' + longitude_ + '&sensor=true').then(data => {
        if (data.data.results.length > 2) {
          this.$store.commit('setLocation', data.data.results[1].formatted_address)
        }

        axios.defaults.headers.common['Auth-Token'] = localStorage.getItem('Auth-Token')
      }).catch(err => {
        console.log(err)
        axios.defaults.headers.common['Auth-Token'] = localStorage.getItem('Auth-Token')
      })
    }
  }
})
