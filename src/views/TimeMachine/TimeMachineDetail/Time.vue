<template>
  <div class="view">
    <div>
      <ul id="content-shiguangji-ul">
        <router-link to='/'>
          <li class="new-li" v-for="item in list">
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
        </router-link>
      </ul>
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
export default {
  components: { Loadmore },
  data () {
    return {
      list: '',
      firstRequest: true,
      doneText: '没有更多数据',
      loading: false,
      done: false,
      pageNum: 1
    }
  },
  props: ['stockName', 'conceptName', 'stockWindCode', 'strategyId', 'contentId'],
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.loading = true
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
        if (!res.data) {
          this.done = true
          return
        }
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].releasedDate = Math.round((new Date().getTime() - res.data[i].releasedDate) / 1000 / 60 / 60 / 24)
        }
        if (this.firstRequest) {
          this.$set(this, 'list', res.data)
          this.firstRequest = false
        } else {
          this.$set(this, 'list', this.list.concat(res.data))
        }
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
    }
  }
}
</script>

<style scoped>
  .view {
    margin-left: 26px;
    margin-right: 20px;
    padding-bottom: 20px
  }
  .new-li{
    width: 100%;
    padding-bottom: 30px;
    display: inline-block;
    border-left: 1px solid #ccc;
  }
  .new-li:nth-child(1) {
    padding-top: 20px;
  }
  .xinhao {
    display: block;
    padding-bottom: 10px;
    border-bottom: 1px solid #ececec;
    color: #2e2e37;
    font-size: 12px;
  }
  .new-li{
    width: 100%;
    padding-bottom: 30px;
    display: inline-block;
    border-left: 1px solid #ccc;
  }
  .new-li:nth-child(1) {
    padding-top: 20px;
  }
  .stocknew {
    background-color: #fff;
    font-size: 15px;
    color: #191919;
    padding: 10px 12px;
    position: relative;
    margin-left: 45px;
    height: 89px;
  }
  .xinhao {
    display: block;
    padding-bottom: 10px;
    border-bottom: 1px solid #ececec;
    color: #2e2e37;
    font-size: 12px;
  }
  .best-own li {
    float: left;
    padding-bottom: 10px;
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
    padding-top: 10px;
    padding-bottom: 9px;
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
    width: 7.5px;
    height: 7.5px;
    border-radius: 50%;
    background: #f4ce46;
    position: absolute;
    left: 22.25px;
    margin-top: 18px;
  }
  .bkg {
    background: #fff;
  }
  .c-triangle{
    border-right: 16px solid #fff;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    width: 1px;
    position: absolute;
    top: 10px;
    left: -16px;
  }
  .quesheng {
    width: 160px;
    margin: 85px auto;
  }
  .quesheng img {
    width: 160px;
    height: 105px;
    text-align: center;
  }
  .quesheng p {
    padding-top: 15px;
    text-align: center;
    font-size: 16px;
    color: #f4ce46;
  }
</style>
