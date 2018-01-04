<template>
  <div class="box">
    <p class="title">{{ data.title }}</p>
    <div class="info">
      <span>飞笛资讯</span>
      <!-- <span>{{ readNum }}阅读</span> -->
      <span>{{ data.date }}</span>
    </div>

    <div class="related-stock">
      相关个股：
      <span
        v-for="item in stocks"
        :key="item.name"
        @click="gotoSingleStockDetail(item.code)">
        {{item.name}}
      </span>
    </div>

    <div id="content" class="content" v-html="data.content">
      {{ data.content }}
    </div>

    <p class="signal">飞笛信号：<img :src="imgPath"></p>

    <template v-if="data.ldStock && data.ldStock.length > 0">
      <ul class="influence-title">
        <li>影响个股</li>
        <li>涨跌额</li>
        <li>涨跌幅</li>
      </ul>
      <ul class="influence-data">
        <li v-for="item in data.ldStock" :key="item.name">
          <p>{{item.name}}</p>
          <p :class="dataColor(item.riseFallPercent)">{{item.offer}}</p>
          <p :class="dataColor(item.riseFallPercent)">{{item.riseFallPercent}}</p>
        </li>
      </ul>
    </template>

    <template v-if="data.ldPlate && data.ldPlate.length > 0">
      <ul class="influence-title">
        <li>影响主题</li>
        <li>涨跌额</li>
        <li>涨跌幅</li>
      </ul>
      <ul class="influence-data">
        <li v-for="item in data.ldPlate" :key="item.name">
          <p>{{item.name}}</p>
          <p :class="dataColor(item.riseFallPercent)">{{item.offer}}</p>
          <p :class="dataColor(item.riseFallPercent)">{{item.riseFallPercent * 100}}%</p>
        </li>
      </ul>
    </template>

    <template v-if="data.tracks && data.tracks.length > 0">
      <p class="trace-title">市场跟踪</p>
      <ul class="trace-box">
        <li v-for="item in data.tracks" :key="item.id">
          <span class="trace-date">{{Number(item.releaseTime) | moment('MM-DD HH:mm') }}</span>
          <div class="trace-content">{{item.content}}</div>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import qs from 'qs'
import axios from 'axios'
import contrastDate from '@/assets/js/contrastDate.js'
import router from '@/router'

export default {
  data () {
    return {
      data: {},
      readNum: '',
      stocks: [],
      imgPath: ''
    }
  },
  created () {
    this.getDetail()
    // this.getReadNum()
  },
  methods: {
    getDetail () {
      this.$http.get('/fidnews/v1/geek/v1/infoDetail', {
        params: {
          id: this.$route.params.id,
          infoType: this.$route.params.infotype
        }
      })
      .then((res) => {
        res.data.date = contrastDate(res.data.releaseTime)
        this.data = res.data
        //
        let type = this.data.type
        this.imgPath = require('../../assets/img/liface' + type + '.png')
        setTimeout(() => {
          this.getRelatedStocks()
        }, 0)
      })
    },
    getRelatedStocks () {
      var contentText = document.getElementById('content').innerText
      console.log(contentText)
      //
      axios({
        url: '//data.news.21fid.com/fidnews/v1/cms/api/infoAboutCode',
        method: 'post',
        data: qs.stringify({
          user: 'fidinner',
          key: 'ab54eae187cd5cf4e89fed7a4e62586e',
          content: contentText
        })
      })
      .then((res) => {
        this.$set(this, 'stocks', res.data.code)
      })
    },
    gotoSingleStockDetail (stockCode) {
      router.push({ path: `/singleStockDetail/information/${stockCode}` })
    },
    /*  */
    dataColor (riseFallPercent) {
      let className = {}
      if (riseFallPercent > 0) {
        className.red = true
      } else if (riseFallPercent < 0) {
        className.green = true
      }
      return className
    }
    // getReadNum () {
    //   this.$http.get('//api2.geek.21fid.com:8080/common/views', {
    //     params: {
    //       transfertype: this.$route.params.infotype,
    //       'transferid[]': this.$route.params.id
    //     }
    //   })
    //   .then((res) => {
    //     console.log(res.data)
    //     this.readNum = res.data[0].views
    //   })
    // }
  }
}
</script>

<style scoped>
  .box {
    padding: 15px 15px;
  }
  .title {
    font-size: 24px;
    color: #2e2e37;
    padding-bottom: 0.48rem;
  }
  .info {
    margin-bottom: 0.48rem;
  }
  .info span {
    font-size: 13px;
    color: #83839d;
    padding-right: 0.27rem;
  }
  .content {
    font-size: 16px;
    color: #4d4d4d;
    margin-top: 0.48rem;
    line-height: 26px;
  }
  .related-stock {
    color: #6b6b6b;
  }
  .related-stock span {
    color: #4e9df4;
    padding-right: 0.2667rem;
  }

  .signal {
    margin: 0.2667rem 0;
    color: #4d4d4d;
  }
  .signal img {
    height: 0.32rem;
    vertical-align: middle;
  }

  .influence-title {
    margin-bottom: 0.1333rem;
  }
  .influence-title li {
    width: 30%;
    display: inline-block;
    color: #83839d;
  }
  .influence-data {
    margin-bottom: 0.1333rem;
  }
  .influence-data li p{
    width: 30%;
    display: inline-block;
    color: #6c6c6c;
  }
  .influence-title li:first-child,
  .influence-data li p:first-child{
    width: 37%;
  }
  .influence-data li p.green {
    color: #199d64;
  }
  .influence-data li p.red {
    color: #e60000;
  }
  .influence-data li p:first-child {
    color: #4e9df4;
  }

  .trace-title {
    font-size: 14px;
    margin: 0.5333rem 0 0.1333rem;
  }
  .trace-box {
    color: #6c6c6c;
  }
  .trace-box li {
    padding-bottom: 0.1333rem;
  }
  .trace-date {
    position: absolute;
  }
  .trace-content {
    padding-left: 2.1rem;
  }
</style>
