<template>
  <div class="view">
    <div>
      <ul id="content-shiguangji-ul">
        <li class="new-li" v-for="(item, index) in list"
          @click="gotoDetail(index)">
          <span class="i-leida1"></span>
          <div class="stocknew">
            <div class="c-triangle"></div>
            <p class="xinhao">{{ item.releasedDate }}天前发出{{ conceptName }}信号</p>
            <ul class="best-own">
              <li>
                <p>股票</p>
                <span>{{ item.stockCnName }}</span>
              </li>
              <li>
                <p>持有天数</p>
                <span>{{ item.maxHaveDay }}天</span>
              </li>
              <li>
                <p>涨幅</p>
                <span :class="'xh-rose ' + color (item.maxPrices)">{{ item.maxPrices | toFixed }}</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <loadmore
        v-on:getData="getList"
        :loading="loading"
        :showLoading="true"
        :done="done">
      </loadmore>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Loadmore from '@/components/Loadmore.vue'
export default {
  components: { Loadmore },
  data () {
    return {
      list: [],
      loading: false,
      done: false,
      pageNum: 1,
      listBusy: false
    }
  },
  props: ['stockName', 'conceptName', 'stockWindCode', 'strategyId', 'contentId'],
  created () {
    this.SET_SPINNER(false)
    this.getList()
  },
  watch: {
    stockName (val) {
      if (val && this.pageNum === 1) {
        this.getList()
      }
    }
  },
  methods: {
    ...mapActions(['SET_SPINNER', 'SET_TIMEMACHINE_PARAMS']),
    getList () {
      if (!this.stockName) return
      this.loading = true
      this.listBusy = true
      this.$http.get('/fidnews/v1/geek/v6/timeMachines/paging', {
        params: {
          strategyId: this.strategyId,
          contentId: this.contentId,
          stockCode: this.stockWindCode,
          pageNum: this.pageNum,
          pageSize: 10
        }
      })
      .then(res => {
        this.listBusy = false
        if (!res.data) {
          this.done = true
          return
        }
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].releasedDate = Math.round((new Date().getTime() - res.data[i].releasedDate) / 1000 / 60 / 60 / 24)
        }
        this.$set(this, 'list', this.list.concat(res.data))
        this.pageNum = this.pageNum + 1
        this.loading = false
      })
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
    gotoDetail (index) {
      let paramsObj = {
        strategyId: this.strategyId, // 13
        stockCode: this.stockWindCode, // 002069.sz
        contentId: this.contentId, // 220715
        offset: index // 0
      }
      this.SET_TIMEMACHINE_PARAMS(paramsObj)
      this.$router.push('/timeMachine/' + this.$route.params.id)
    }
  }
}
</script>

<style scoped>
  .view {
    margin-left: 0.69rem;
    margin-right: 0.53rem;
    padding-bottom: 0.53rem
  }
  .new-li{
    width: 100%;
    padding-bottom: 0.8rem;
    display: inline-block;
    border-left: 1px solid #ccc;
  }
  .new-li:nth-child(1) {
    padding-top: 0.53rem;
  }
  .xinhao {
    display: block;
    padding-bottom: 0.27rem;
    border-bottom: 1px solid #ececec;
    color: #2e2e37;
    font-size: 12px;
  }
  .new-li{
    width: 100%;
    padding-bottom: 0.8rem;
    display: inline-block;
    border-left: 1px solid #ccc;
  }
  .new-li:nth-child(1) {
    padding-top: 0.53rem;
  }
  .stocknew {
    background-color: #fff;
    font-size: 15px;
    color: #191919;
    padding: 0.27rem 0.32rem;
    position: relative;
    margin-left: 1.2rem;
    height: 2.37rem;
  }
  .xinhao {
    display: block;
    padding-bottom: 0.27rem;
    border-bottom: 1px solid #ececec;
    color: #2e2e37;
    font-size: 12px;
  }
  .best-own li {
    float: left;
    padding-bottom: 0.27rem;
    display: block;
  }
  .best-own li:nth-child(1) {
    width: 37.2%;
  }
  .best-own li:nth-child(2) {
    width: 32.1%;
  }
  .best-own li:nth-child(3) {
    width: 30.7%;
  }
  .best-own li p {
    color: #83839d;
    font-size: 12px;
    padding-top: 0.27rem;
    padding-bottom: 0.24rem;
  }
  .best-own li:nth-child(1) span ,.best-own li:nth-child(2) span {
    color: #2e2e37;
    font-size: 16px;
  }
  .xh-rose {
    font-size: 17px;
  }
  .red {
    color: #e2666d;
  }
  .green {
    color: #4a9a69;
  }
  .gray{
    color:#999;
  }
  .i-leida1 {
    width: 0.2rem;
    height: 0.2rem;
    border-radius: 50%;
    background: #f4ce46;
    position: absolute;
    left: 0.59rem;
    margin-top: 0.48rem;
  }
  .bkg {
    background: #fff;
  }
  .c-triangle{
    border-right: 0.43rem solid #fff;
    border-top: 0.32rem solid transparent;
    border-bottom: 0.32rem solid transparent;
    width: 0.03rem;
    position: absolute;
    top: 0.27rem;
    left: -0.43rem;
  }
  .quesheng {
    width: 4.27rem;
    margin: 2.27rem auto;
  }
  .quesheng img {
    width: 4.27rem;
    height: 2.8rem;
    text-align: center;
  }
  .quesheng p {
    padding-top: 0.4rem;
    text-align: center;
    font-size: 16px;
    color: #f4ce46;
  }
</style>
