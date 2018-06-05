// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/reset.css' //引入reset.css
import './assets/js/rem'        //引入rem.js
import mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'
import store from './store/index.js'
Vue.use(mint)

Vue.prototype.$axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
