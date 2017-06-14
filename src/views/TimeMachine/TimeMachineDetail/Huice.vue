<template>
  <div>
    <div class="bkg">
      <p class="hc-content"  v-if="data">
        {{ stockName }}发出{{ conceptName }}信号后，
        <span v-if="data.stockLastDay === 0">
          是否跑赢{{ conceptName }}概念的平均水平？让我们拭目以待。
        </span>
        <span v-else>
          {{ data.stockLastDay }}个交易日累计涨幅{{ data.stockRises | toFixed}}，跑{{ isWin }}{{ conceptName }}概念平均水平
        </span>
      </p>
      <div class="hc-event-title">
        {{ conceptName }}概念大数据回测
      </div>
      <ul class="hc-best-own">
        <li>
          <p>平均涨幅</p>
          <span v-if="data">{{ data.maxAvgRise | toFixed }}</span>
        </li>
        <li>
          <p>赚钱概率</p>
          <span v-if="data">
            {{ data.maxRiseWinPer | toFixed }}
          </span>
        </li>
        <li>
          <p>最佳持有</p>
          <span v-if="data">{{ data.maxRiseDay }}天</span>
        </li>
      </ul>
      <p class="hc-notice" v-if="data">持有{{ data.maxRiseDay }}后收益最高，平均涨幅是{{ data.maxAvgRise | toFixed }}，持有{{ data.maxWinDay }}天胜率最大，赚钱概率达到{{ data.maxWinPercent | toFixed }}</p>
      <div id="main" style="height:230px;"></div>
      <p class="hc-x">横轴（日）：代表发生事件后的第几个交易日</p>
      <div class="hc-source">
        <span>数据来源：飞笛大数据</span>
        <p>以上是飞笛大数据筛选结果，不做投资建议，投资有风险，入市需谨慎</p>
      </div>
    </div>
  </div>
</template>

<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入折线图
require('echarts/lib/chart/line')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/grid')
require('echarts/lib/component/legend')
require('echarts/lib/component/markLine')
export default {
  data () {
    return {
      data: '',
      isWin: ''
    }
  },
  props: ['stockName', 'conceptName', 'stockWindCode', 'strategyId', 'contentId'],
  created () {
    this.getEchartData()
  },
  methods: {
    getEchartData () {
      let _this = this
      this.$http.get('/fidnews/v1/geek/v2/getStockRiseAndStrategyRiseNrt', {
        params: {
          strategyId: this.strategyId,
          contentId: this.contentId,
          windStockCode: this.stockWindCode
        }
      })
      .then(res => {
        // 从上级获得数据
        console.log(res.data)
        this.$set(this, 'data', res.data)
        let myChart = echarts.init(document.getElementById('main'))
        let data = res.data
        if (data.stockRisesSubAvg > 0) {
          this.isWin = '赢'
        } else {
          this.isWin = '输'
        }
        let stockRosePer = data.stockRosePer
        let strategyRosePer = data.strategyRosePer
        let stockMaxRoseDay = data.stockMaxRoseDay
        let strategyRosePerNew = []
        let datesData = []
        for (let i = 0, l = strategyRosePer.length; i < l; i++) {
          strategyRosePerNew.push((strategyRosePer[i].percent * 100).toFixed(2))
          datesData.push(strategyRosePer[i].totalDay)
        }
        let stockRosePerNew = []
        if (stockRosePer) {
          for (let j = 0, k = stockRosePer.length; j < k; j++) {
            stockRosePerNew.push((stockRosePer[j].percent * 100).toFixed(2))
          }
        }
        let stockName = this.stockName
        let conceptName = this.conceptName + '（平均涨幅）'
        let legendStock = { name: stockName, icon: 'line' }
        let legendConcept = { name: conceptName, icon: 'line' }
        let legendData
        if (stockRosePer && stockRosePer.length === 0) {
          legendData = [legendConcept]
        } else if (strategyRosePer.length === 0) {
          legendData = [legendStock]
        } else {
          legendData = [legendStock, legendConcept]
        }
        let option = {
          tooltip: {
            trigger: 'axis',
            triggerOn: 'click'
          },
          color: ['#4e9df4', '#e0a6ff'],
          legend: {
            top: 20,
            itemGap: 30,
            data: legendData,
            itemWidth: 20,
            itemHeight: 25,
            textStyle: {
              color: '#999',
              fontSize: 12
            }
          },
          grid: {
            left: '18',
            right: '22',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: datesData,
              axisTick: {
                show: false,
                margin: 20
              },
              axisLabel: {
                textStyle: {
                  color: '#999',
                  fontSize: 12
                },
                interval: function (index, value) {
                  // 显示不等间隔的刻度
                  if (_this.contains(index + 1, [1, 5, 10, 15, 20, stockMaxRoseDay])) {
                    return true
                  } else {
                    return false
                  }
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  // color: ['#000','#e2e2e2','#e2e2e2','#e2e2e2'],
                  function () {
                    return ['#000', '#e2e2e2', '#e2e2e2', '#e2e2e2']
                  },
                  type: 'dashed'
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#e2e2e2'
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisTick: {
                show: false,
                margin: 10
              },
              axisLabel: {
                textStyle: {
                  color: '#999',
                  fontSize: 12
                },
                formatter: function (value, index) {
                  return value.toFixed(2) + '%'
                }
              },
              splitLine: {
                lineStyle: {
                  color: '#e2e2e2',
                  type: 'solid'
                }
              },
              axisLine: {
                show: false
              }
            }
          ],
          series: [
            {
              name: stockName,
              type: 'line',
              areaStyle: {
                normal: {
                  color: '#f6fafe'
                }
              },
              data: stockRosePerNew,
              markLine: {
                lineStyle: {
                  normal: {
                    type: 'solid'
                  }
                }
              }
            },
            {
              name: conceptName,
              type: 'line',
              label: {
                normal: {
                  show: false,
                  position: 'top'
                }
              },
              areaStyle: {
                normal: {
                  color: 'rgba(225, 225, 225, 0)'
                }
              },
              data: strategyRosePerNew
            }
          ]
        }
        myChart.setOption(option)
      })
    },
    contains (obj, arr) {
      var i = arr.length
      while (i--) {
        if (arr[i] === obj) {
          return true
        }
      }
      return false
    }
  }
}
</script>

<style scoped>
  .bkg {
    background-color: #fff;
  }
  .hc-content{
    padding: 0.53rem 1.07rem;
    font-size: 16px;
    color: #191919;
    line-height: 24px;
    text-align: center;
  }
  .hc-event-title{
    height: 1.04rem;
    line-height: 1.04rem;
    padding-left: 0.32rem;
    background: #f4f4f4;
    font-size: 15px;
    color: #6a6a6a;
  }
  .hc-best-own li{
    width: 33.3%;
    float: left;
    text-align: center;
    padding-bottom: 0.27rem;
  }
  .hc-best-own li p{
    padding-top: 0.67rem;
    padding-bottom: 0.16rem;
    font-size: 14px;
    color: #191919;
  }
  .hc-best-own li span{
    font-size: 20px;
    color: #f35b6a;
  }
  .hc-notice{
    text-align: center;
    padding-left: 12%;
    padding-right: 12%;
    font-size: 13px;
    color: #191919;
  }
  .hc-x{
    padding-left: 0.32rem;
    font-size: 12px; 
    color: #999;
    padding-top: 10px;
  }
  .hc-source{
    padding-top: 0.8rem;
    font-size: 10px;
    color: #999;
    text-align: center;
  }
  .hc-source span{
    padding-bottom: 0.08rem;
  }
  .hc-source p{
    padding-bottom: 1.71rem;
   }
</style>
