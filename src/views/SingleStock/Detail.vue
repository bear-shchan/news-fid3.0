<template>
  <div>
    <div class="stock-info layout-box"
      :class="{'red' : curRange >= 0}">
      <div class="stock-info-item box-col">
        <span class="title">股价</span>
        <p class="data" v-if="curPrice">{{curPrice}}</p>
        <p class="data" v-else>0000.00</p>
      </div>
      <div class="stock-info-item box-col">
        <span class="title">涨跌幅</span>
        <p class="data">{{curRange | toFixed}}</p>
      </div>
    </div>
    <icon-router-link class="pt-box" :link-items="curLinkItem" :link-path="curLinkPath"></icon-router-link>
    <router-view keep-alive></router-view>
  </div>
</template>

<script>

import IconRouterLink from '@/components/IconRouterLink'

export default {
  name: 'singleDetail',
  components: {
    IconRouterLink
  },
  data () {
    return {
      singelStockItems: [
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
      tapeItems: [
        {
          icon: require('../../assets/img/onlookersTape.png'),
          iconActive: require('../../assets/img/onlookersTape-active.png'),
          text: '围观大盘',
          link: 'onlookersTape'
        },
        {
          icon: require('../../assets/img/roseList.png'),
          iconActive: require('../../assets/img/roseList-active.png'),
          text: '涨幅榜',
          link: 'roseList'
        },
        {
          icon: require('../../assets/img/dropList.png'),
          iconActive: require('../../assets/img/dropList-active.png'),
          text: '跌幅榜',
          link: 'dropList'
        }
      ],
      curPrice: '',
      curRange: '',
      curLinkPath: '',
      curLinkItem: ''
    }
  },
  created () {
    this.getStockInfo()
    this.setTimeOut()
    // console.log(this.$route)
    if (this.$route.path.indexOf('singleStockDetail') !== -1) {
      this.curLinkItem = this.singelStockItems
      this.curLinkPath = '/singleStockDetail/'
    } else {
      this.curLinkItem = this.tapeItems
      this.curLinkPath = '/tapeDetail/'
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  // watch: {
  //   '$route': function () {
  //     console.log(this.$route)
  //     this.curLinkItem = this.singelStockItems
  //     this.curLinkPath = '/singleStockDetail/'
  //   }
  // },
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
.pt-box{
  padding-top: 2.8rem;
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
  color: #4a9a69;
}
.stock-info-item .title{
  font-size: 14px;
  line-height: 0;
  color: #989898;
}
.stock-info-item .data{
  font-size: 24px;
  line-height: 39px;
}
.red{
  color: #ec666d;
}
</style>
