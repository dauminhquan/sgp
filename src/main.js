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
    },
      messageReaded() {
      return this.$socket.getters['room/getMessageReaded']
      }
  },
  watch: {
    groups (newValue, oldValue) {
      if(oldValue.length > newValue.length)
      {
         // xóa đi 1 group
          let deleteGroup = null
          oldValue.forEach(del => {
              if(!newValue.some(function (item) {
                  return del._id == item._id
              }))
              {
                deleteGroup = del
              }
                  })
          if(deleteGroup != null)
          {
              this.$socket.off('chanel-group-' + deleteGroup._id)
          }
      }
      else{
          let addGroup = null
          newValue.forEach(add => {
              if(!oldValue.some(function (item) {
                  return add._id == item._id
              }))
              {
                  addGroup = add
              }
          })
          if(addGroup != null)
          {
              this.$socket.on('chanel-group-' + addGroup._id,function (data) {
                  console.log(data)
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
