<template>
  <div style="background: #f7f7f7;">
    <header class="head">
      <ul class="stock">
        <li>
          <router-link  class="stockname" :to="'/singleStockDetail/information/' + data.windStockCode">
            {{ data.stockName }}
            <span class="stock-red" v-if="percent > 0">+{{ percent }}%</span>
            <span class="stock-gray" v-else-if="percent == 0" >{{ percent }}%</span>
            <span class="stock-green" v-else>{{ percent }}%</span>
          </router-link>
        </li>
        <li class="stocknews">[驱动事件] {{ data.title }}</li>
        <li class="chance">[机会提示] {{ data.stockName}}发出信号{{ data.conceptName }}
          <span v-if="data.hotForefront">热门风口</span>
        </li>
      </ul>
    </header>
    <icon-router-link :fixed-box="false" :link-items="items" link-path="/timeMachineDetail/"></icon-router-link>
    <router-view class="view" :stockName="data.stockName"
      :conceptName="data.conceptName" 
      :contentId="data.contentId" 
      :strategyId="data.strategyId" 
      :stockWindCode="data.stockWindCode">
    </router-view>
  </div>
</template>

<script>
import IconRouterLink from '@/components/IconRouterLink'
export default {
  components: {
    IconRouterLink
  },
  data () {
    return {
      items: [
        {
          icon: require('../../../assets/img/radar.png'),
          iconActive: require('../../../assets/img/radar-active.png'),
          text: '个股雷达',
          link: 'radar/' + this.$route.params.id
        },
        {
          icon: require('../../../assets/img/time.png'),
          iconActive: require('../../../assets/img/time-active.png'),
          text: '时光机',
          link: 'time/' + this.$route.params.id
        },
        {
          icon: require('../../../assets/img/huice.png'),
          iconActive: require('../../../assets/img/huice-active.png'),
          text: '回测',
          link: 'huice/' + this.$route.params.id
        }
      ],
      data: '',
      percent: ''
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$http.get('/fidnews/v1/geek/v2/getMsgChooseStockDetailVo', {
        params: {
          id: this.$route.params.id
        }
      })
      .then(res => {
        console.log(res.data)
        this.getStockPercent(res.data.stockWindCode)
        this.$set(this, 'data', res.data)
      })
    },
    getStockPercent (stockWindCode) {
      this.$http.get('/fidnews/v1/geek/v2/getStockInfoByOtherInterface', {
        params: {
          stockCodes: stockWindCode
        }
      })
      .then((res) => {
        console.log(res.data[0].percent)
        this.percent = (res.data[0].percent * 100).toFixed(2)
      })
    }
  }
}
</script>

<style scoped>
  .head {
      width: 100vw;
      /* height: 53.4vw; */
      height: 250px;
      background: url(../../../assets/img/bj446.png) no-repeat;
      background-size: cover;
      position: relative;
  }
  .stock{
    padding-left: 20px;
    padding-right: 20px;
    position: absolute;
    top: 72px;
  }
  .stockname{
    font-size: 24px;
    color: #fff;
  }
  .stockname span{
    font-size: 18px;
    padding-left: 8px;
  }
  .stocknews{
    font-size: 15px;
    color: #eee;
    padding-top: 30px;
    padding-bottom: 15px;
    line-height: 22.5px;
  }
  .chance{
    font-size: 15px;
    color: #eee;
    line-height: 22.5px;
  }
  .chance span {
    width: 60px;
    height: 19px;
    line-height: 19px;
    margin-left: 8px;
    padding: 1px 5px 3px;
    text-align: center;
    background: #fc515b;
  }
  .stock-red {
      color: #f35b6a;
  }
  .stock-gray{
    color:#999999;
  }
  .stock-green{
    color: #199d64;
  }
</style>
