// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'core-js/es6/promise'
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

// import VueInfiniteScroll from 'vue-infinite-scroll'
// Vue.use(VueInfiniteScroll)

// import VueScroller from 'vue-scroller'
// Vue.use(VueScroller)

import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

import * as directives from './directives'
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

const externalView = ['/ticket', '/fund']
const externalViewStr = externalView.join(',')

router.beforeEach(({meta, path}, from, next) => {
  NProgress.start()
  // 检查登录
  var { auth = true } = meta
  var isLogin = Boolean(store.state.user.password)
  if (auth && !isLogin && path !== '/login' && path !== '/') {
    return next({ path: '/login' })
  }

  // 外部页面逻辑，求一基，求一票
  if (path !== '/' && externalViewStr.indexOf(path) !== -1) {
    window.location.href = '//www.21fid.com/external' + path
    return false
  }

  // 检查权限
  let expireTime = store.state.user.expireTime
  if (expireTime === -1) {
    next()
  } else if (expireTime === 0 && path !== '/login' && path !== '/') {
    return next({ path: '/login' })
  } else if (expireTime < Date.now() && path !== '/login' && path !== '/') {
    return next({ path: '/login' })
  }

  next()
})

router.afterEach(() => {
  // 优化---设置时间，判断时间长于1s 在设置为true
  store.dispatch('SET_SPINNER', true)
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
