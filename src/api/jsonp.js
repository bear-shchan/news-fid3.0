var reqwest = require('reqwest')

// (url, option, cb)
module.exports = (params) => {
  reqwest.compat({
    dataType: 'jsonp',
    url: params.url,
    data: params.option,
    jsonpCallback: 'jsonpCallback',
    success: function (resp) {
      params.callback(resp)
    }
  })
}
