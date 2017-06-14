<template>
  <div>
    <div class="newslist" id="newslist" v-if="list.length > 0">
      <router-link v-for="item in list" :to="'/newsDetail/' + item.id" class="newsli" :key="item.id"> 
        <p class="stocktitle">
          <span class="news-title">{{ item.date  }}</span>
          {{ item.title }}
        </p>
        <div class="info" v-if="item.stockList != ''">
          <img class="face" src="../../../assets/img/liduo@2x.png">
          <div style="padding-left:20px;">
            <router-link :to="'/singleStockDetail/information/' + stock.stockWindCode" v-for="stock in item.stockList" :key="stock.stockWindCode">
              <p class="stocknames">
                {{ stock.stockName }}<span class="percent green">{{ percentData[stock.stockWindCode] | toFixed }}</span>
              </p>
            </router-link>
          </div>
        </div>
      </router-link>
    </div>
    <loadmore
      v-on:getData="getList"
      :loading="loading"
      :showLoading="!firstRequest"
      :done="done">
    </loadmore>
  </div>
</template>
 
<script>
import Loadmore from '@/components/Loadmore.vue'
import formatDate from '@/assets/js/formatDate.js'
export default {
  components: { Loadmore },
  data () {
    return {
      list: [],
      percentData: [],
      stockWindCodeArr: [],
      lastTime: '',
      firstRequest: true,
      doneText: '没有更多数据',
      loading: false,
      done: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.loading = true
      this.$http.get('/fidnews/v1/geek/v3/getTopicInfoMsgV3VoList', {
        params: {
          user: 'geek',
          key: '4c039f2967c4d93e9674ffb037724187',
          topicId: this.$route.params.id,
          pageNum: 5,
          lastTime: this.lastTime
        }
      })
      .then((res) => {
        let data = res.data
        if (!data) {
          this.done = true
          return
        }
        for (var i = 0; i < data.length; i++) {
          data[i].date = formatDate(data[i].releasedTime)
          for (var j = 0; j < data[i].stockList.length; j++) {
            this.stockWindCodeArr.push(data[i].stockList[j].stockWindCode)
          }
        }
        this.getStockPercent(this.stockWindCodeArr)
        if (this.firstRequest) {
          this.firstRequest = false
        }
        this.$set(this, 'list', this.list.concat(data))
        this.lastTime = this.list[this.list.length - 1].releasedTime
        this.loading = false
      })
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
