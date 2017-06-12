import request from './request'

export default function (stockCodes) {
  return new Promise((resolve, reject) => {
    request.get('/fidnews/v1/geek/v2/getStockInfoByOtherInterface', {
      params: {
        stockCodes: stockCodes
      }
    })
    .then((data) => {
      if (data.num !== 0) {
        resolve(data.data)
      } else {
        reject()
      }
    })
  })
}
