import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import 'pnotify/dist/es/PNotifyButtons'
import 'pnotify/dist/es/PNotifyMobile'
import axios from 'axios'
Vue.config.productionTip = false
Vue.use(store)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
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
      axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude_ + ',' + longitude_ + '&sensor=true').then(data => {
        this.$store.commit('setLocation', data.data.results[1].formatted_address)
      }).catch(err => {
        console.log(err)
      })
    }
  }
})
