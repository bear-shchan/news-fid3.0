// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'

Vue.config.productionTip = false

import 'lib-flexible' // rem
import './assets/css/reset.css'
import './assets/css/index.css'

import request from './api/request.js'
Vue.prototype.$http = request

import VueInfiniteScroll from 'vue-infinite-scroll'
Vue.use(VueInfiniteScroll)

// import VueScroller from 'vue-scroller'
// Vue.use(VueScroller)

import moment from 'moment'
Vue.filter('moment', function (value, param) {
  return moment(value).format(param)
})

router.beforeEach(({meta, path}, from, next) => {
  var { auth = true } = meta
  var isLogin = Boolean(store.state.user.password)

  if (auth && !isLogin && path !== '/login' && path !== '/') {
    return next({ path: '/login' })
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
