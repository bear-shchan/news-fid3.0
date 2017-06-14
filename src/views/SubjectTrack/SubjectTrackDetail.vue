<template>
  <div id="content">
    <header class="b-head" v-bind:style="{ backgroundImage: 'url(' + listArr.image + ')', width: '100vw', backgroundSize: 'cover', backgroundColor:'rgba(0, 0, 0, 0.2)'}">
      <ul class="b-stock js-style-stock1">
        <li class="b-stockname" v-cloak id="hotTuyereName">{{ listArr.topicName }}</li>
        <li class="b-stocknews" v-cloak>{{ listArr.introduction }}</li>
      </ul>
    </header>
    <ul class="tuyere-win">
      <li class="increase">
        <p>近5日涨幅</p>
        <span :class="listArr.avgRiseTotal > 0 ? 'red':'green'" v-cloak>{{ listArr.avgRiseTotal | toFixed }}</span>
      </li>
      <li class="winpercent">
        <p>风口胜率</p>
        <span :class="listArr.winPercent > 0 ? 'red':'green'" v-cloak>{{ listArr.winPercent | toFixed }}</span>
      </li>
    </ul> 
    <div class="lanmu">
      <p><span></span>热门股票</p>
    </div>
    <ul  class="hotstocks">
      <router-link :to="'/singleStockDetail/information/' + item.windStockCode" v-for="item in listArr.hotStock" :key="item.windStockCode">
        <li class="hotstock">
          <p v-cloak>{{ item.stockCnName }}</p>
          <span :class="item.percent > 0 ? 'red':'green'" v-cloak>{{ item.percent | toFixed }}</span>
        </li>
      </router-link>
      <router-link :to="'/hotStock/' + listArr.topicId">
        <li class="hotstock">
        <img class="morestock" src="../../assets/img/icon3@2x.png">
        </li>
      </router-link>
    </ul>
    <div class="lanmu mb">
      <p><span></span>走势图</p>
    </div>
    <charts-kline :topic-id="listArr.topicId"></charts-kline>
    <div style="clear:both;"></div>
    <div class="lanmu mt">
      <p><span></span>风口资讯</p>
    </div>
    <base-news-list></base-news-list>
  </div>
</template>

<script>
import ChartsKline from '@/components/ChartsKline.vue'
import BaseNewsList from './components/BaseNewsList.vue'

export default {
  // name: 'subjectTrackDetail',
  components: {
    ChartsKline,
    BaseNewsList
  },
  data () {
    return {
      listArr: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$http.get('/fidnews/v1/statistics/hotForefront', {
        params: {
          user: 'fidinner',
          key: 'ab54eae187cd5cf4e89fed7a4e62586e',
          type: 'appDetail',
          hotNum: 5,
          ids: this.$route.params.id,
          businessTypes: 39,
          stockNum: 5
        }
      })
      .then((res) => {
        this.listArr = res.data[0]
      })
    }
  }
}
</script>

<style scoped>
  .lanmu {
    height: 44px;
    line-height: 44px;
    border-top: 10px solid #f7f7f7;
    border-bottom: 1px solid #ececec;
  }
  .lanmu span {
    font-size: 14px;
    background: #f4ce46;
    padding-left: 0.08rem;
    margin-right: 0.13rem;
  }
  .lanmu p {
    color: #2e2e37;
    font-size: 17px;
    padding-left: 0.4rem;
  }
  .b-head{
    width: 100vw;
    height: 210px;
    position: relative;
  }
  .b-head:after{    
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
  .b-stock{
    width: 100%;
    position: absolute;
    top: 72px;
    z-index: 2;
  }
  .b-stockname{
    clear: both;
    width: 100%;
    font-size: 31px;
    color: #fff;
    text-align: center;
  }
  .b-stocknews{
    font-size: 16px;
    color: #eee;
    padding: 0.64rem 0.8rem 0 0.75rem;
    text-align: center;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .b-stocklist ul li{
    width: 100%;
    display: inline-block;
    border-top: 1px solid #e2e2e2;
  }


  .tuyere-win {
    height: 80px;
  }
  .tuyere-win li {
    width: 50%;
    float: left;
    display: block;
    text-align: center;
  }
  .increase, .winpercent {
    padding-bottom: 15px;
  }
  .increase p, .winpercent p {
    color: #66667a;
    font-size: 13px;
    padding-top: 15px;
    padding-bottom: 10px;
  }
  .increase span, .winpercent span {
    font-size: 18px;
  }
  .hotstocks {
    height: 180px;
  }
  .hotstock {
    width: 33%;
    float: left;
    text-align: center;
    border-bottom: 1px solid #ececec;
    border-left: 1px solid #ececec;
    height: 89px;
    display: block;
  }
  .hotstock p {
    color: #2e2e37;
    font-size: 17px;
    padding-top: 20px;
    padding-bottom: 6px;
  }
  .hotstock:nth-child(4), .hotstock:nth-child(5), .hotstock:nth-child(6) {
    border-bottom: none;
  }
  .hotstock span {
    font-size: 14px;
  }
  .morestock {
    width: 24px;
    height: 24px;
    padding-top: 32.5px;
  }
  .newslist{
    padding-left: 15px;
    padding-right: 15px;
  }
  .newslist li {
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ececec;
  }
  .newslist li p {
    color: #2e2e37;
  }
  .stocktitle {
    font-size: 17px;
  }
  .face {
    width: 14px;
    height: 14px;
    padding-right: 4px;
    margin-top: 3px; 
  }
  .name {
    font-size: 14px;
    color: #2e2e37;
    padding-right: 7px;
  }
  .percent {
    font-size: 14px;
  }
  .info {
    padding-top: 15px;
    padding-bottom: 20px;
  }
  .red {
    color: #ff737b;
  }
  .green {
    color: #4a9a69;
  }
  .gray{
    color:#999;
  }
  #fiveday {
    width: 100%;
    height: 165px;
    padding-bottom: 10px;
  }
  .info img {
    padding-right: 4px;
  }
  .info img, .info p {
    float: left;
  }
  .info p span {
    padding-left: 7px;
    padding-right: 25px;
  }
  .stocknames {
    font-size: 15px;
  }
  .news-title {
    font-size: 17px;
    color: #e2666d;
    padding-right: 5px;
  }
  .mt {
    margin-top: 2.4rem;
  }
  .mb {
    margin-bottom: 0.13rem;
  }
</style>
