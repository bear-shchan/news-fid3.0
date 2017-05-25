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

import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条 样式
NProgress.configure({
  showSpinner: false
  // parent: '#container'
})

import request from './api/request.js'
Vue.prototype.$http = request

import VueInfiniteScroll from 'vue-infinite-scroll'
Vue.use(VueInfiniteScroll)

import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

import moment from 'moment'
Vue.filter('moment', function (value, param) {
  return moment(value).format(param)
})
Vue.filter('toFixed', function (value) {
  return (value * 100).toFixed(2) + '%'
})

const externalView = ['/ticket', '/fund']
const externalViewStr = externalView.join(',')

router.beforeEach(({meta, path}, from, next) => {
  NProgress.start()
  var { auth = true } = meta
  var isLogin = Boolean(store.state.user.password)

  if (auth && !isLogin && path !== '/login' && path !== '/') {
    next({ path: '/login' })
    return false
  }

  // 外部页面逻辑，求一基，求一票
  if (path !== '/' && externalViewStr.indexOf(path) !== -1) {
    window.location.href = '//www.21fid.com/external' + path + '/appInside'
    return false
  }

  next()
})

router.afterEach(() => {
  window.scrollTo(0, 0)
  NProgress.done()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
