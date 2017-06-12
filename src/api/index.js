import request from './request'

export function getPercent (stockCodes) {
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

export function getTimeMachineInfo (id) {
  return new Promise((resolve, reject) => {
    request.get('/fidnews/v1/geek/v2/getMsgChooseStockDetailVo', {
      params: {
        id: id
      }
    })
    .then((data) => {
      if (data.code !== 0) {
        resolve(data.data)
      } else {
        reject()
      }
    })
  })
}

