var reqwest = require('reqwest')
import store from '../store'

// (url, option, cb)
module.exports = (params) => {
  reqwest.compat({
    dataType: 'jsonp',
    url: params.url,
    data: params.option,
    jsonpCallback: 'jsonpCallback',
    success: function (resp) {
      store.dispatch('SET_SPINNER', false)
      params.callback(resp)
    }
  })
}
