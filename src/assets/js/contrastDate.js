import moment from 'moment'

/**
 * 职责链设计模式，
 */
function Chain (fn) {
  this.fn = fn
  this.successor = null // successor：继承者;后续的事物
}
Chain.prototype.setNextSuccessor = function (successor) {
  this.successor = successor
  return successor
}
Chain.prototype.passRequest = function () {
  var ret = this.fn.apply(this, arguments)

  if (ret === 'nextSuccessor') {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments)
  }

  return ret
}

export default function chainDateOrder (contrastDate) {
  // 获取相差秒数
  var currDate = (new Date().getTime() - contrastDate) / 1000
  var date = {
    second: Math.floor(currDate),
    minute: Math.floor(currDate / 60),
    hour: Math.floor(currDate / 60 / 60),
    day: Math.floor(currDate / 60 / 60 / 24)
  }

  var dateOrder5 = function (date) {
    if (date.second < 5) {
      return '刚刚'
    } else {
      return 'nextSuccessor'
    }
  }
  var dateOrder60 = function (date) {
    if (date.second < 60) {
      return date.second + '秒前'
    } else {
      return 'nextSuccessor'
    }
  }
  var dateOrderMinute = function (date) {
    if (date.minute < 60) {
      return date.minute + '分钟前'
    } else {
      return 'nextSuccessor'
    }
  }
  var dateOrderHour = function (date) {
    if (date.hour <= 24) {
      return date.hour + '小时前'
    } else {
      return 'nextSuccessor'
    }
  }
  var dateOrderDay = function (date) {
    if (date.day <= 3) {
      return date.day + '天前'
    } else {
      return 'nextSuccessor'
    }
  }
  var dateOrderDate = function (date) {
    return moment(contrastDate).format('YYYY-MM-DD HH:mm')
  }

  var chainDateOrder5 = new Chain(dateOrder5)
  var chainDateOrder60 = new Chain(dateOrder60)
  var chainDateOrderMinute = new Chain(dateOrderMinute)
  var chainDateOrderHour = new Chain(dateOrderHour)
  var chainDateOrderDay = new Chain(dateOrderDay)
  var chainDateOrderDate = new Chain(dateOrderDate)

  chainDateOrder5.setNextSuccessor(chainDateOrder60)
    .setNextSuccessor(chainDateOrderMinute)
    .setNextSuccessor(chainDateOrderHour)
    .setNextSuccessor(chainDateOrderDay)
    .setNextSuccessor(chainDateOrderDate)

  return chainDateOrder5.passRequest(date)
}
