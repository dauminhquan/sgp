var axios = require('axios')
if (localStorage.getItem('Auth-Token') != undefined) {
  axios.defaults.headers.common['Auth-Token'] = localStorage.getItem('Auth-Token')
}
module.exports = axios
