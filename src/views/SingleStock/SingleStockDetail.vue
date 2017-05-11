<template>
  <div class="box">
    <div class="stock-info layout-box">
      <div class="stock-info-item box-col">
        <span class="title">股价</span>
        <p class="data">{{curPrice}}</p>
      </div>
      <div class="stock-info-item box-col">
        <span class="title">涨跌幅</span>
        <p class="data">{{curRange | toFixed}}</p>
      </div>
    </div>
    <icon-router-link :link-items="items" link-path="/singleStockDetail/"></icon-router-link>
    <router-view></router-view>
  </div>
</template>

<script>

import IconRouterLink from '@/components/IconRouterLink'

export default {
  name: 'singleStockDetail',
  components: {
    IconRouterLink
  },
  data () {
    return {
      items: [
        {
          icon: require('../../assets/img/information.png'),
          iconActive: require('../../assets/img/information-active.png'),
          text: '资讯',
          link: 'information'
        },
        {
          icon: require('../../assets/img/topic.png'),
          iconActive: require('../../assets/img/topic-active.png'),
          text: '主题',
          link: 'topic'
        },
        {
          icon: require('../../assets/img/announcement.png'),
          iconActive: require('../../assets/img/announcement-active.png'),
          text: '公告',
          link: 'announcement'
        },
        {
          icon: require('../../assets/img/f10.png'),
          iconActive: require('../../assets/img/f10-active.png'),
          text: 'F10',
          link: 'f10'
        }
      ],
      curPrice: '',
      curRange: ''
    }
  },
  created () {
    this.getStockInfo()
    this.setTimeOut()
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    getStockInfo () {
      this.$http.get('/fidnews/v1//geek/v3/getSelfDataInfoListByWindCodes', {
        params: {
          codeStr: this.$route.params.tagName,
          dataTypeStr: 1
        }
      })
      .then((data) => {
        data = data.data[0]
        this.curPrice = data.zxj
        this.curRange = data.zdf
      })
    },
    setTimeOut () {
      this.timer = setInterval(() => {
        this.getStockInfo()
      }, 3000)
    }
  }
}
</script>

<style scoped>
.box{
  padding-top: 2.67rem;
}
.stock-info{
  padding-top: 0.53rem;
  padding-bottom: 0.53rem;
  text-align: center;
  position: fixed;
  top: 1.07rem;
  width: 100%;
  z-index: 999;
  background-color: #fff;
}
.stock-info-item .title{
  font-size: 14px;
  line-height: 0;
  color: #989898;
}
.stock-info-item .data{
  font-size: 24px;
  line-height: 39px;
  color: #ec666d;
}
</style>
