<template>
  <div class="box" id="content" v-if="data != ''">
    <header class="head" :style="{backgroundImage: 'url(' + data.iamges + ')', width: '100vw', backgroundSize: 'cover'}">
      <ul class="zhuti js-style-stock1">
        <li class="subjectname">{{ data.name }}</li>
        <li class="subjecttime" v-if="data.releasedTime != ''">{{ timeFormat(data.releasedTime) }}更新</li>
      </ul>
    </header>
    <section class="touch bg">
      <p class="lanmu">
        <img src="../../assets/img/52.png">
        <span>事件触发</span>
      </p>
      <div class="touch-content">
        {{ data.abstract }}
      </div>
    </section>

    <section class="subject bg" v-for="(item, key) in listData" v-if="item.list != ''" :key="item.channelName">
      <p class="lanmu leftp">
        <img src="../../assets/img/53.png">
        <span>{{ item.channelName }}</span>
      </p>
      <div class="subject-content" v-if="item.list.length < 6">
        <router-link :to="'/todayKnowDetail/' + news.id" class="subject-a" v-for="(news, index) in item.list" :key="news.id">
          <span>{{ timeFormat(news.time) }}</span> 
          <p>{{ news.title }}</p>
        </router-link>
      </div>
      <div class="subject-content" v-else>
        <router-link class="subject-a" :to="'/todayKnowDetail/' + news.id" v-for="(news, index) in item.list" :key="news.id" v-if="index < 5">
          <span>{{ timeFormat(news.time) }}</span> 
          <p>{{ news.title }}</p>
        </router-link>
        <router-link :class="'subject-a ' +  isshow" :to="'/todayKnowDetail/' + news.id" v-for="(news, index) in item.list" :key="news.id" v-if="index > 4">
          <span>{{ timeFormat(news.time) }}</span> 
          <p>{{ news.title }}</p>
        </router-link>
        <div class="show" id="show" @click="showHide"  v-if="item.list.length > 1">{{ isshowText}}</div>
      </div>
    </section>
    <section class="subject bg pb" v-if="stockList != ''">
      <p class="lanmu leftp">
        <img src="../../assets/img/56.png">
        <span>相关股票</span>
      </p>
      <div class="stock-content">
        <ul class="bar">
          <li>股票/代码</li>
          <li>最新</li>
          <li>涨跌幅</li>
          <li>近5日涨幅</li> 
        </ul>
        <ul class="list" id="stockList">
          <router-link v-for="item in stockList" :to="'/singleStockDetail/information/' + item.windStockCode" :key="item.windStockCode">
            <li>
              <span class="name">
                <span class="stockname">{{ item.stockCnName }}</span><br>
                <span class="code">{{ item.windStockCode | toSplit }}</span>
              </span>
              <span :class="'new ' + color(item.zdf)">{{ item.zxj }}</span>
              <span :class="'percent ' + color(item.zdf)">{{ item.zdf | toFixed }}</span>
              <span :class="'fiveday ' + color(item.percent)">{{ item.percent | toFixed }}</span>
            </li>
          </router-link>
        </ul>
      </div>
    </section>
  </div> 
</template>
<script>
import Vue from 'vue'
Vue.filter('toFixed', function (value) {
  return (value * 100).toFixed(2) + '%'
})
Vue.filter('toSplit', function (value) {
  return value.split('.')[0]
})
export default {
  name: '',
  data () {
    return {
      listData: [],
      stockList: [],
      data: '',
      imgArr: [53, 54, 55],
      isshow: 'isshow',
      isshowText: '展开  ∨'
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$http.get('/fidnews/v1/geek/v3/querySubjectsDetail', {
        params: {
          user: 'fidinner',
          key: 'ab54eae187cd5cf4e89fed7a4e62586e',
          id: this.$route.params.id
        }
      })
      .then((res) => {
        let data = res.data
        this.data = data
        if (data.listData[data.listData.length - 1].channelName === '相关股票') {
          this.$set(this, 'listData', data.listData.slice(0, data.listData.length - 1))
          this.$set(this, 'stockList', data.listData[data.listData.length - 1].list)
        } else {
          this.$set(this, 'listData', data.listData)
          this.$set(this, 'stockList', '')
        }
      })
    },
    showHide (event) {
      if (this.isshow === 'isshow') {
        this.$set(this, 'isshow', '')
        this.$set(this, 'isshowText', '收起  ∧')
      } else {
        this.$set(this, 'isshow', 'isshow')
        this.$set(this, 'isshowText', '展开  ∨')
      }
    },
    color (value) {
      if (value > 0) {
        return 'red'
      } else if (value < 0) {
        return 'green'
      } else {
        return 'gray'
      }
    },
    timeFormat (time) {
      var d = new Date(time)
      var Y = d.getFullYear()
      var M = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)
      var D = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
      return Y + '-' + M + '-' + D
    }
  }
}
</script>

<style scoped>
  .box {
    background-color: #f5f5f5;
  }
  .head{
    width: 100vw;
    height: 210px;
    position: relative;
  }
  .head:after{    
    position: absolute;    
    top: 0;    
    left: 0;    
    content: "";    
    background-color: #000;    
    opacity: 0.5;    
    z-index: 1;    
    width: 100%;    
    height: 100%;
  }
  .zhuti{
    width: 100%;
    position: absolute;
    top: 72px;
    z-index: 2;
  }
  .subjectname{
    clear: both;
    width: 100%;
    font-size: 21px;
    color: #fff;
    text-align: center;
  }
  .subjecttime{
    font-size: 12px;
    color: #eee;
    padding: 0.27rem 0.8rem 0 0.75rem;
    text-align: center;
  }
  .bg {
    background-color: #fff;
    border-radius: 0.11rem;
  }  
  .touch {
    padding: 0.27rem 0.4rem 0.4rem;
  }
  .touch-content {
    padding-top: 0.27rem;
    font-size: 16px;
    color: #4d4d4d;
  }
  .subject {
    margin: 0.27rem 0.13rem; 
    padding-top: 0.27rem;
  }
  .subject-content {
    margin-top: 0.27rem;
    padding: 0 0.27rem;
    border-top: 1px solid #e5e5e5;
  }
  .subject-a {
    display: flex;
    padding: 0.4rem 0;
    font-size: 16px;
    color: #4d4d4d;
  }
  .subject-a span {
    width: 2.43rem;
    font-size: 12px;
    color: #757575;
  }
  .subject-a p {
    flex: 1;
  }
  .view-a {
    display: block;
    padding: 0.4rem 0;
    font-size: 16px;
    color: #4d4d4d;
    border-bottom: 1px solid #e5e5e5;
  }
  .view-a:last-child {
    border-bottom: none;
  }
  .view-a p {
    padding-bottom: 0.4rem;
  }
  .view-a span {
    font-size: 12px;
    color: #757575;
  }
  .stock-content {
    padding-top: 0.53rem;
  }
  .bar {
    height: 0.48rem;
    padding: 0.27rem; 
  }
  .bar li {
    float: left;
    text-align: right;
    font-size: 12px;
    color: #191919;
  }
  .bar li:first-child {
    text-align: left;
  }
  .bar li:nth-child(1), .name {
    width: 25%;
  }
  .bar li:nth-child(2), .new {
    width: 22%;
  }
  .bar li:nth-child(3), .percent {
    width: 25%;
  }
  .bar li:nth-child(4), .fiveday {
    width: 28%;
  }
  .list li {
    height: 1.09rem;
    padding: 0.27rem;
    border-top: 1px solid #e5e5e5;
  }
  .list li span {
    float: left;
    display: block;
    font-size: 16px;
  }
  .stockname {
    color: #2e2e37;
    text-align: left;
  }
  .new, .percent, .fiveday  {
    text-align: right;
  }
  .name .code {
    font-size: 12px;
    color: #66667c;
  }
  .new, .percent, .fiveday {
    margin-top: 5px;
  }
  .pb {
    padding-bottom: 0.23rem;
  }
  .red {
    color: #f35b6a;
  }
  .green {
    color: #4a9a69;
  }
  .gray{
    color:#999;
  }
  .leftp {
    padding-left: 0.27rem;
  }
  .lanmu img {
    width: 0.4rem;
    height: 0.4rem;
    vertical-align: middle;
    padding-bottom: 0.11rem;
    padding-right: 0.13rem;
  }
  .lanmu span {
    font-size: 16px;
    color: #000;
  }
  .show {
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
    font-size: 14px;
    border-top: 1px solid #e2e2e2;
    color: #4694f4;
  }
  .isshow {
    display: none;
  }
</style>
