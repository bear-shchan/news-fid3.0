var store = {
  age: 86400000, // 一天的时间戳
  maxAge: function (age) {
    this.age = age
    return this
  },
  set: function (name, json) {
    window.localStorage.removeItem(name)
    json.__time = new Date().getTime()
    json.__age = this.age
    window.localStorage.setItem(name, JSON.stringify(json))
    return this
  },
  get: function (name) {
    var info = window.localStorage.getItem(name)
    return info ? JSON.parse(info) : null
  },
  remove: function (name) {
    window.localStorage.removeItem(name)
  },
  isExpired: function (name) {
    var logined = window.localStorage.getItem(name)
    var _time = 0
    var iTime = new Date().getTime()
    var timeLength = 0
    if (logined) {
      logined = JSON.parse(logined)
      _time = logined.__time
      timeLength = iTime - _time
      return timeLength >= logined.__age
    } else {
      return true
    }
  },
  isLogined: function (name, fn) {
    var user = ''
    if (!this.isExpired(name)) {
      user = JSON.parse(window.localStorage.getItem(name))
    } else {
      window.localStorage.removeItem(name)
    }
    if (user) {
      fn && fn(user)
    } else {
      fn && fn()
    }
  }
}

export default store
