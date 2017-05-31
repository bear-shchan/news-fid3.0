import wx from 'weixin-js-sdk'
import axios from 'axios'

const _wechat = () => {
  // wx.config配置
  const config = () => {
    return new Promise((resolve, reject) => {
      // 获取服务端微信配置信息
      axios.get('/api/getWechatConfig', {
        params: {
          url: window.location.href.split('#')[0]
          // ticket: 'fundSelectTicket',
        }
      })
      .then(res => {
        let data = res.data
        wx.config({
          debug: false,
          appId: 'wxc14d897324d3d5a3', // 'wxbd79193c5a1a9181'
          timestamp: data.timestamp,
          nonceStr: data.noncestr,
          signature: data.signature,
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
          ]
        })
        resolve('wechat config success')
      }, () => {
        reject('wechat config fail')
      })
    })
  }

  // 分享配置
  const share = ({title, desc, link, imgUrl}) => {
    wx.ready(() => {
      wx.onMenuShareTimeline({
        title,
        link,
        imgUrl
      })

      wx.onMenuShareAppMessage({
        title,
        desc,
        link,
        imgUrl
      })
    })
  }

  return {config, share}
}

export default _wechat
