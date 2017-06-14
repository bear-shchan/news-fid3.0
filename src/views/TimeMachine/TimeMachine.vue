<template>
  <div class="box">
    <div class="main-content" v-if="data.strategyName">
      <h1 class="main-tt">
        <p>{{data.referStock.stockData.totalDay}}天前</p>
        <p>
          {{data.referStock.stock.stockCnName}}发出<span class="red">{{data.strategyName}}</span>信号
        </p>
        <p class="fs15">{{data.referStock.cmsContent.title}}</p>
      </h1>
      <p class="chart-explain">股价走势如下：</p>
      <echarts :option="option1" class="chart"></echarts>
      <!-- robot -->
      <div class="robot-box layout-box">
        <div class="dialog">
          <img src="../../assets/img/robotDialog-01.png" class="dialog-img">
          <p class="dialog-text" style="left: 0.2933rem;">
            期间，{{data.referStock.stock.stockCnName}}最高涨幅{{data.referStock.stockData.maxRisePercent | toFixed}}，最大回撤是{{data.referStock.stockData.maxHcl | toFixed}}，当前{{winText}}大盘{{win | toFixed}}。
          </p>
        </div>
        <img src="../../assets/img/robot-01.png" alt="" class="robot">
      </div>
      <div class="robot-box layout-box">
        <img src="../../assets/img/robot-02.png" alt="" class="robot">
        <div class="dialog">
          <img src="../../assets/img/robotDialog-02.png" class="dialog-img">
          <p class="dialog-text" style="left: 0.5067rem;">
            现在我们来对比下
            {{data.currentStock.stock.stockCnName}}
            和
            {{data.referStock.stock.stockCnName}}
          </p>
        </div>
      </div>
      <div class="pk-box">
        <span class="tar">{{data.currentStock.stock.stockCnName}}</span>
        <span><img src="../../assets/img/vs-img.png" class="vs-img"></span>
        <span class="tar">{{data.referStock.stock.stockCnName}}</span>
      </div>
      <p class="chart-explain">
        {{data.currentStock.stock.stockCnName}}在{{currentDate}}日发出大订单信号
      </p>
      <echarts :option="option2" :main="'main2'" class="chart"></echarts>
      <!--percent-->
      <div class="percent-box layout-box">
        <p class="percent-hd" style="padding-top: 0.1rem; height: 1.3rem;">
          市盈<br>率
        </p>
        <div class="box-col">
          <p>{{data.currentStock.stock.stockCnName}}{{data.currentStock.stockData.profitRate}}</p>
          <i class="percent-line-bg bgc-yellow"></i>
          <i class="percent-line bgc-yellow"
            :style="{width: currentProfitRateLine}"></i>
          <p>{{data.referStock.stock.stockCnName}}{{data.referStock.stockData.profitRate}}</p>
          <i class="percent-line-bg bgc-purple"></i>
          <i class="percent-line bgc-purple"
            :style="{width: referProfitRateLine}"></i>
        </div>
      </div>
      <div class="percent-box layout-box">
        <p class="percent-hd" style="line-height: 1.4rem;">
          市值
        </p>
        <div class="box-col">
          <p>{{data.currentStock.stock.stockCnName}}{{data.currentStock.stockData.marketOffer}}</p>
          <i class="percent-line-bg bgc-yellow"></i>
          <i class="percent-line bgc-yellow"
            :style="{width: currentMarketOfferLine}"></i>
          <p>{{data.referStock.stock.stockCnName}}{{data.referStock.stockData.marketOffer}}</p>
          <i class="percent-line-bg bgc-purple"></i>
          <i class="percent-line bgc-purple"
            :style="{width: referMarketOfferLine}"></i>
        </div>
      </div>
      <!-- robot -->
      <div class="robot-box layout-box" style="margin-top: 0.93rem;">
        <img src="../../assets/img/robot-03.png" alt="" class="robot">
        <div class="dialog">
          <img src="../../assets/img/robotDialog-02.png" class="dialog-img">
          <p class="dialog-text" style="left: 0.5333rem;">
            相较于{{data.referStock.stock.stockCnName}},{{data.currentStock.stock.stockCnName}}安全性{{security}}、弹性{{elasticity}}
          </p>
        </div>
      </div>
      <div class="robot-box layout-box">
        <div class="dialog">
          <img src="../../assets/img/robotDialog-01.png" class="dialog-img">
          <p class="dialog-text" style="left: 0.2933rem;">
            历史是否真的会重演呢？让我们拭目以待！本站结束，欢迎进入下一站。
          </p>
        </div>
        <img src="../../assets/img/robot-04.png" alt="" class="robot">
      </div>
      <div class="buttom-box">
        <router-link tag="p" :to="'/singleStockDetail/information/' + paramsObj.stockCode" 
          class="buttom bgc-red">查看股票</router-link>
        <a @click="nextTimeMachine" class="buttom bgc-blue">下一站</a>
      </div>
      <div class="footer">
        <p>回测基于飞笛大数据，不代表未来趋势，不作为投资决策依据。</p>
        <p>Copyright 2017 飞笛资讯(粤ICP备16035685号-1)</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {getTimeMachineInfo} from '@/api'

import Echarts from '@/components/Echarts'

export default {
  components: {
    Echarts
  },
  data () {
    return {
      paramsObj: {},
      data: {},
      win: '',
      winText: '',
      currentDate: '',
      // 安全性 弹性
      security: '',
      elasticity: '',
      // 条-值
      currentProfitRateLine: '',
      referProfitRateLine: '',
      currentMarketOfferLine: '',
      referMarketOfferLine: '',
      // option
      option1: {},
      option2: {}
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    ...mapActions(['SET_SPINNER']),
    getInfo () {
      if (!this.getTimeMachineParams.strategyId) {
        getTimeMachineInfo(this.$route.params.id)
        .then(data => {
          this.paramsObj = {
            strategyId: data.strategyId, // 13
            stockCode: data.stockWindCode, // 002069.sz
            contentId: data.contentId, // 220715
            offset: 0 // 0
          }
          this.getData()
        })
      } else {
        this.paramsObj = this.getTimeMachineParams
        this.getData()
      }
    },
    getData () {
      this.$http.get('/fidnews/v1/geek/v3/timeMachines', {
        params: this.paramsObj
      })
      .then(res => {
        let data = res.data
        this.$set(this, 'data', data)
        // win
        let win = '' + (this.data.referStock.stockData.data[this.data.referStock.stockData.data.length - 1].percent - this.data.marketIndex.stockData.data[this.data.marketIndex.stockData.data.length - 1].percent)
        let winText = ''
        if (win >= 0) {
          winText = '跑赢'
        } else {
          win = win.split('-')[1]
          winText = '跑输'
        }
        this.win = win
        this.winText = winText
        // currDate
        this.currentDate = (function () {
          if (data.currentStock.stockData.data[0]) {
            return data.currentStock.stockData.data[0].stockDate
          } else {
            return ''
          }
        })()
        // 安全性、弹性
        var contrast = function (current, refer) {
          if (current < 0 && refer >= 0) {
            return '低'
          }
          if (refer < 0 && current >= 0) {
            return '高'
          }
          if (refer < 0 && current < 0) {
            if (current > refer) {
              return '高'
            } else {
              return '低'
            }
          }
          if (current > refer) {
            return '低'
          } else {
            return '高'
          }
        }

        let security
        let elasticity

        security = contrast(data.currentStock.stockData.profitRate, data.referStock.stockData.profitRate)
        var currentMarketOffer = 0 + data.currentStock.stockData.marketOffer.split('亿')[0]
        var referMarketOffer = 0 + data.referStock.stockData.marketOffer.split('亿')[0]
        elasticity = contrast(currentMarketOffer, referMarketOffer)

        this.security = security
        this.elasticity = elasticity

        // 条-值
        this.setPercentLine(data)
      })
    },
    setPercentLine (data) {
      // var mantissa = function (num) {
      //   var len = num.length
      //   var i = 1
      //   var str = ''
      //   for (; i < len; i++) {
      //     str += 0
      //   }
      //   return str
      // }

      var currentProfitRate = data.currentStock.stockData.profitRate
      var referProfitRate = data.referStock.stockData.profitRate
      var largerProfitRate = (currentProfitRate > referProfitRate ? currentProfitRate : referProfitRate)
      // var mantissaProfitRate = mantissa(largerProfitRate)
      var maxProfitRate = largerProfitRate

      this.currentProfitRateLine = (currentProfitRate / maxProfitRate * 100) + '%'
      this.referProfitRateLine = (referProfitRate / maxProfitRate * 100) + '%'

      // 市值
      var currentMarketOffer = (data.currentStock.stockData.marketOffer).split('亿')[0]
      var referMarketOffer = (data.referStock.stockData.marketOffer).split('亿')[0]
      var largerMarketOffer = (currentMarketOffer > referMarketOffer ? currentMarketOffer : referMarketOffer)
      // var mantissaMarketOffer = mantissa(largerMarketOffer)
      var maxMarketOffer = largerMarketOffer

      this.currentMarketOfferLine = (currentMarketOffer / maxMarketOffer * 100) + '%'
      this.referMarketOfferLine = (referMarketOffer / maxMarketOffer * 100) + '%'

      this.option1 = this.disposeData1(data)
      this.option2 = this.disposeData2(data)
    },
    disposeData (data, cb) {
      // 上证
      var marketRange = (function (data) {
        let timeList = []
        let dataList = []
        let i = 0
        let len = data.length

        for (; i < len; i++) {
          timeList.push(data[i].stockDate.split('-')[1] + '/' + data[i].stockDate.split('-')[2])
          dataList.push((data[i].percent * 100).toFixed(2))
        }

        return {
          timeList: timeList,
          dataList: dataList
        }
      }(data.marketIndex.stockData.data))
      // 当前
      var currentRate = (function (data) {
        let timeList = []
        let dataList = []
        let i = 0
        let len = data.length

        var str
        for (; i < len; i++) {
          timeList.push(data[i].stockDate.split('-')[1] + '/' + data[i].stockDate.split('-')[2])

          if (data[i].percent || data[i].percent === 0) {
            str = (data[i].percent * 100).toFixed(2)
          } else {
            str = '-'
          }
          dataList.push(str)
        }

        return {
          timeList: timeList,
          dataList: dataList
        }
      }(data.currentStock.stockData.data))

      // 对比
      var referRate = (function (data) {
        let timeList = []
        let dataList = []
        let i = 0
        let len = data.length

        for (; i < len; i++) {
          timeList.push(data[i].stockDate.split('-')[1] + '/' + data[i].stockDate.split('-')[2])
          dataList.push((data[i].percent * 100).toFixed(2))
        }

        return {
          timeList: timeList,
          dataList: dataList
        }
      }(data.referStock.stockData.data))
      var allData = {
        marketRange: marketRange,
        currentRate: currentRate,
        referRate: referRate,
        data: data
      }

      return allData
    },
    disposeData1 (data) {
      var allData = this.disposeData(data)

      var myData = {
        ranges: [allData.marketRange, allData.referRate],
        seriesName: ['上证指数', allData.data.referStock.stock.stockCnName],
        lineColor: ['#4e9df4', '#e0a6ff'],
        timeList: allData.referRate.timeList
      }
      var option = this.setTimeEChartOption(myData)
      return option
    },
    disposeData2 (data) {
      var allData = this.disposeData(data)

      var myData = {
        ranges: [allData.currentRate, allData.referRate],
        seriesName: [allData.data.currentStock.stock.stockCnName, allData.data.referStock.stock.stockCnName],
        lineColor: ['#f8f803', '#e0a6ff'],
        timeList: allData.currentRate.timeList
      }
      var option = this.setTimeEChartOption(myData)
      return option
    },
    setTimeEChartOption (data) {
      // console.log(data);
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [
            {
              name: data.seriesName[0],
              icon: 'line'
            },
            {
              name: data.seriesName[1],
              icon: 'line'
            }
          ],
          textStyle: {
            color: '#fff',
            fontSize: 10
          },
          selectedMode: false
        },
        grid: {
          left: '0%',
          top: '20%',
          right: '2%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          splitNumber: 1,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              fontSize: 10,
              color: '#fff'
            }
          },
          data: data.timeList || data.ranges[0].timeList
        },
        yAxis: [
          {
            // name: text,
            nameTextStyle: {
              color: '#fff',
              fontSize: '10'
            },
            type: 'value',
            scale: true,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: function (v) {
                return v + '%'
              },
              textStyle: {
                fontSize: 10,
                color: '#fff'
              }
            }
          }
        ],
        series: [
          {
            name: data.seriesName[0],
            type: 'line',
            // showSymbol: false,
            showAllSymbol: true,
            hoverAnimation: false,
            data: data.ranges[0].dataList, // [1,'-',3]
            itemStyle: {
              normal: {
                color: data.lineColor[0]
              }
            }
          },
          {
            name: data.seriesName[1],
            type: 'line',
            // showSymbol: false,
            showAllSymbol: true,
            hoverAnimation: false,
            data: data.ranges[1].dataList,
            itemStyle: {
              normal: {
                color: data.lineColor[1]
              }
            }
          }
        ]
      }

      return option
    },
    nextTimeMachine () {
      this.paramsObj.offset++
      this.getData()
      window.scrollTo(0, 0)
      this.SET_SPINNER(true)
    }
  },
  computed: {
    ...mapGetters(['getTimeMachineParams'])
  }
}
</script>

<style scoped>
.red {
  color: #ff3737;
}
.fs15{
  font-size: 15px;
}

.bgc-yellow {
  background-color: #f4ea4e;
}
.bgc-purple {
  background-color: #e0a6ff;
}
.bgc-blue {
    background-color: #269bdd;
}
.bgc-red {
    background-color: #ff5045;
}

.box{
  background: url('../../assets/img/timeMachine-bg.jpg');
  background-size: cover;
  height: 41.85rem;
  padding: .93rem .33rem .33rem;
  color: #fff;
}
.main-tt {
  font-size: 24px;
  text-align: center;
  font-weight: 400;
}
.chart-explain{
  margin-top: 1rem;
  font-size: 15px;
}
.chart{
  height: 4.93rem;
}

.robot-box {
  height: 2.8rem;
  margin-bottom: .6rem;
  padding: 0 .66rem;
}
.robot {
  width: 2.4rem;
}
.dialog{
  position: relative;
}
.dialog-img{
  width: 5.33rem;
}
.dialog-text{
  position: absolute;
  top: 12px;
  width: 4.53rem;
  /*letter-spacing: 0.03rem;*/
  word-break: break-all;
}

.pk-box{
  font-size: 18px;
  text-align: center;
}
.vs-img{
  vertical-align: middle;
  margin: 0 .4rem;
  width: .8rem;
}

.percent-box{
  margin-top: .86rem;
}
.percent-hd{
  text-align: center;
  width: 1.4rem;
  height: 1.4rem;
  background-color: #c33;
  border-radius: 50%;
  margin-right: .33rem;
  font-size: 14px;
}
.percent-line, .percent-line-bg {
  display: block;
  height: .16rem;
  border-radius: .2rem;
}
.percent-line-bg {
  width: 100%;
  opacity: .2;
}
.percent-line {
  margin-top: -.16rem;
  width: 0;
}

.buttom-box{
  margin: 0 auto;
  text-align: center;
}
.buttom{
  line-height: 1.06rem;
  display: inline-block;
  width: 2.6rem;
  border-radius: .5rem;
  margin-top: .6rem;
}
.buttom-box .buttom+.buttom {
  margin-left: 1.93rem;
}
.footer{
  font-size: 10px;
  text-align: center;
  margin-top: .93rem;
}
.footer p+p {
  margin-top: .73rem;
}
</style>
