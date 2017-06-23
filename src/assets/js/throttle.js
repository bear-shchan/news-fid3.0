var throttle = function (fn, interval, immediate) {
  var _self = fn
  var timer
  var firstTime = true

  return function () {
    var args = arguments
    var _me = this

    if (firstTime && immediate) {
      _self.apply(_me, args)
      firstTime = false
      return
    }

    if (timer) return false

    timer = setTimeout(function () {
      clearTimeout(timer)
      timer = null
      _self.apply(_me, args)
    }, interval || 500)
  }
}

export default throttle
