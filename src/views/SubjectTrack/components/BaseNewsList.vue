<template>
  <div>
    <div class="newslist" id="newslist" v-if="newsList.length > 0">
      <router-link v-for="item in newsList" to="/SubjectTrackDetail/13" class="newsli" :key="item.id"> 
        <p class="stocktitle">
          <span class="news-title">{{ item.date  }}</span>
          {{ item.title }}
        </p>
        <div class="info" v-if="item.stockList != ''">
          <img class="face" src="../../../assets/img/liduo@2x.png">
          <div style="padding-left:20px;">
            <router-link :to="'/singleStockDetail/information/' + stock.stockWindCode" v-for="stock in item.stockList"  :key="stock.stockWindCode">
              <p class="stocknames">
                {{ stock.stockName }}<span class="percent green">{{ percentData[stock.stockWindCode] | toFixed }}</span>
              </p>
            </router-link>
          </div>
        </div>
      </router-link>
    </div>
    <mugen-scroll
      class="dropload-down"
      :handler="getList"
      :should-handle="!loading"
      scroll-container="scrollContainer">
      <span v-if="isLoading">
        <img class="face" src="../../../assets/img/loading.gif">
      </span>
      {{ droploadDownText }}
    </mugen-scroll>
  </div>
</template>

<script>
import axios from 'axios'
import MugenScroll from 'vue-mugen-scroll'
import contrastDate from '@/assets/js/contrastDate.js'
export default {
  components: { MugenScroll },
  data () {
    return {
      newsList: [],
      droploadDownText: '',
      loading: false,
      isLoading: '',
      percentData: {}
    }
  },
  created () {
  },
  methods: {
    async getList () {
      try {
        this.loading = true
        const result = await axios.get('http://data.news.21fid.com/fidnews/v1/geek/v3/getTopicInfoMsgV3VoList', {
          params: {
            user: 'geek',
            key: '4c039f2967c4d93e9674ffb037724187',
            topicId: this.$route.params.id,
            pageNum: 5,
            lastTime: (this.newsList.length > 0 && this.newsList[this.newsList.length - 1].releasedTime) || null
          }
        }).then(res => res.data)
        let stockWindCodeArr = []
        let listArr = [...this.newsList, ...result.data]
        for (var i = 0; i < listArr.length; i++) {
          for (var j = 0; j < listArr[i].stockList.length; j++) {
            listArr[i].date = contrastDate(listArr[i].releasedTime)
            stockWindCodeArr.push(listArr[i].stockList[j].stockWindCode)
          }
        }
        this.newsList = listArr
        console.log(this.newsList)
        this.getStockPercent(stockWindCodeArr)
        this.loading = false
        this.droploadDownText = '正在加载中...'
        this.isLoading = true
      } catch (err) {
        this.droploadDownText = '已经加载完毕'
        this.isLoading = false
      }
    },
    getStockPercent (stockWindCodeArr) {
      this.$http.get('/fidnews/v1/geek/v2/getStockInfoByOtherInterface', {
        params: {
          stockCodes: stockWindCodeArr.join()
        }
      })
      .then((res) => {
        let percentData = []
        for (var k = 0; k < res.data.length; k++) {
          percentData[res.data[k].symbol + '.' + res.data[k].type] = res.data[k].percent
        }
        this.percentData = percentData
      })
    }
  }
}
</script>

<style scoped>
  .newslist {
    padding-left: 0.4rem;
    padding-right: 0.4rem;
  }
  .newsli {
    width: 100%;
    display: inline-block;
    padding-top: 0.53rem;
    padding-bottom: 0.53rem;
    border-bottom: 1px solid #ececec;
  }
  .stocktitle {
    color: #2e2e37;
    font-size: 17px;
  }
  .news-title {
    font-size: 17px;
    color: #e2666d;
    padding-right: 0.13rem;
  }
  .info {
    padding-top: 0.4rem;
    padding-bottom: 0.53rem;
  }
  .info img, .info p {
    float: left;
  }
  .info img {
    padding-right: 0.11rem;
  }
  .info p span {
    padding-left: 0.19rem;
    padding-right: 0.67rem;
  }
  .face {
    width: 14px;
    height: 14px;
    padding-right: 4px;
    margin-top: 5px;
  }
  .stocknames {
    font-size: 15px;
    color: #2e2e37;
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
  .dropload-down {
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #999;
  }
  .dropload-down img {
    width: 14px;
    height: 14px;
    line-height: 50px;
    font-size: 12px;
    vertical-align: middle;
    padding-right: 4px;
    margin-bottom: 6px;
  }
</style>
