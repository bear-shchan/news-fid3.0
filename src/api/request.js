import axios from 'axios'

var request = axios.create({
  baseURL: '//data.news.21fid.com',
  params: {
    user: 'fidinner',
    key: 'ab54eae187cd5cf4e89fed7a4e62586e'
  }
})

const handleStatus = (res) => {
  return res
}
const handleResponse = (res) => {
  // if (res.result === 'success') {
  //   return Promise.resolve(res.data)
  // } else {
  //   return Promise.reject(res)
  // }
  return Promise.resolve(res.data)
}
export default {
  get (url, params) {
    return request
      .get(url, params)
      .then(handleStatus)
      .then(handleResponse)
      .catch(error => {
        console.log(error)
      })
  },

  post (url, params) {
    return request
      .post(url, params)
      .then(handleStatus)
      .then(handleResponse)
      .catch(error => {
        console.log(error)
      })
  }
}
