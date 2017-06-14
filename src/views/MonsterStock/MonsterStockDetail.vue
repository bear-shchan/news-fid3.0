<template>
  <div>
    <div class="header-box">
      <div class="header">
        <img class="header-icon dib" :src="imgObj[baseInfo.label]">
        <div class="header-title-box dib">
          <p class="header-title-type">{{baseInfo.label}}</p>
          <p class="header-title-name">{{baseInfo.stockName}}</p>
        </div>
        <div class="header-value dib" v-show="!!baseValue.price" :class="{ green: baseValue.percent < 0 }">
          <p class="header-value-item">{{baseValue.price}}</p>
          <p class="header-value-item">{{baseValue.percent | toFixed}}</p>
        </div>
        <p class="header-gas">{{baseInfo.monsterGas}}</p>
      </div>
    </div>
    <div class="detail-info layout-box">
      <p class="detail-info-title">妖气级别</p>
      <p class="box-col">
        <i class="detail-star" v-for="n in baseInfo.monsterLevel"></i>
      </p>
    </div>
    <div class="detail-info layout-box">
      <p class="detail-info-title">妖气点评</p>
      <p class="detail-comment box-col">{{baseInfo.comment}}</p>
    </div>
    <div class="line-10"></div>
    <div class="chart-tt">
      <span id="chartTitle">{{chartTitle}}</span>
      <span id="chartDate" class="chart-date fr">截止日期：{{date}}</span>
    </div>
    <echart :option="echartOption" class="chart"></echart>
  </div>
</template>

<script>
import Echart from '@/components/Echarts.vue'

export default {
  components: {
    Echart
  },
  data () {
    return {
      baseInfo: {},
      imgObj: {
        '五日最强': require('../../assets/img/monster-detail-icon0.png'),
        '天地一号': require('../../assets/img/monster-detail-icon1.png'),
        '妖之红三兵': require('../../assets/img/monster-detail-icon2.png'),
        '龙虎之气': require('../../assets/img/monster-detail-icon3.png'),
        '黑天鹅': require('../../assets/img/monster-detail-icon4.png'),
        '壳资源大战': require('../../assets/img/monster-detail-icon5.png'),
        '人气爆棚': require('../../assets/img/monster-detail-icon6.png'),
        '上上签': require('../../assets/img/monster-detail-icon7.png'),
        '金蛋壳': require('../../assets/img/monster-detail-icon8.png'),
        '最妖送转': require('../../assets/img/monster-detail-icon9.png'),
        '牛魔王': require('../../assets/img/monster-detail-icon10.png'),
        '月度小红花': require('../../assets/img/monster-detail-icon11.png')
      },
      baseValue: {},
      timer: '',
      chartTitle: '',
      date: '',
      echartOption: {}
    }
  },
  created () {
    this.getData()
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    getData () {
      this.$http.get('/fidnews/v1/geek/v3/getMonterStockDetail', {
        params: {
          id: this.$route.params.id
        }
      })
        .then((res) => {
          const data = res.data
          this.$set(this, 'baseInfo', data)
          this.getValue()
          this.getChartData()
          this.timer = setInterval(() => {
            this.getValue()
          }, 5000)
        })
    },
    getValue () {
      this.$http.get('/fidnews/v1/geek/v2/getStockInfoByOtherInterface', {
        params: {
          stockCodes: this.baseInfo.stockWindCode
        }
      })
        .then((res) => {
          const data = res.data[0]
          this.$set(this, 'baseValue', data)
        })
    },
    getChartData () {
      if (this.baseInfo.kLineType) {
        this.chartTitle = 'k线图'
        this.getKChart()
      } else {
        this.chartTitle = '分时图'
        // this.getLChart()
      }
    },
    getKChart () {
      this.$http.get('/fidnews/v1/fid/ggKLine', {
        params: {
          code: this.baseInfo.stockWindCode,
          limit: 30
        }
      })
      .then((res) => {
        const data = res.data.tradeData
        this.disposeKData(data)
      })
    },
    disposeKData (data) {
      this.date = data[data.length - 1][0]

      let splitData = this.splitData(data)
      this.setKEChartOption(splitData)
    },
    splitData (data) {
      // console.log(data);
      var categoryData = []
      var values = []
      var arr = []
      for (var i = 0; i < data.length; i++) {
        categoryData.push(data[i][0])
        arr = [
          Number(data[i][1]),
          Number(data[i][2]),
          Number(data[i][3]),
          Number(data[i][4])
        ]
        values.push(arr)
      }

      return {
        categoryData: categoryData,
        values: values
      }
    },
    setKEChartOption (data) {
      this.echartOption = {
        grid: {
          left: '4%',
          top: '5%',
          right: '8%',
          bottom: '8%',  // 15
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: data.categoryData,
          // scale: true,
          boundaryGap: true,
          axisLine: { onZero: false },
          splitLine: { show: false },
          // splitNumber: 20,
          // min: 'dataMin',
          // max: 'dataMax',
          axisLabel: {
            textStyle: {
              fontSize: 11
            }
          }
        },
        yAxis: {
          scale: true,
          splitArea: {
            show: true
          },
          axisLabel: {
            textStyle: {
              fontSize: 11
            }
          }
        },
        series: [
          {
            name: '日K',
            type: 'candlestick',
            data: data.values
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.line-10 {
  height: 0.267rem;
  background-color: #f7f7f7;
}

.header-box {
  background: url('../../assets/img/monster-bg.jpg') no-repeat;
  height: 5.333rem;
  background-size: cover;
  /*position: relative;*/
  padding-bottom: .933rem;
}

.header {
  /*position: absolute;
  top: 2.053rem;*/
  padding-top: 2.053rem;
  padding-left: 8%;
  padding-right: 8%;
  color: #fff;
  width: 84%;
}

.header-icon {
  width: 1.2rem;
  margin-right: .213rem;
}

.header-title-type {
  font-size: 12px;
}

.header-title-name {
  font-size: 24px;
  /*line-height: 30px;*/
}

.header-value {
  color: #c33;
  font-size: 20px;
  line-height: 27px;
  margin-left: 1.067rem;
}

.header-value.green {
  color: #339631;
}

.header-gas {
  margin-top: .8rem;
  font-size: 14px;
  color: #eee;
}


/**/

.detail-info {
  padding: .4rem;
  font-size: 14px;
  border-top: 1px solid #e2e2e2;
}

.detail-info-title {
  width: 1.947rem;
  color: #191919;
}

.detail-star {
  display: inline-block;
  background: url('../../assets/img/star-icon.png') center no-repeat;
  background-size: cover;
  width: 14px;
  height: 14px;
  margin-right: .1rem;
  margin-top: 4px;
}

.detail-comment {
  color: #6a6a6a;
}


/**/

.chart-tt {
  font-size: 15px;
  color: #191919;
  padding-left: .32rem;
  margin-top: .267rem;
}

.chart-date {
  font-size: 12px;
  color: #66667a;
  padding-right: .32rem;
  margin-top: .12rem;
}

.chart{
  height: 7.5rem;
  width: 100%;
}
</style>
