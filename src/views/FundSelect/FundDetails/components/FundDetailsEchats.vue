<template>
  <div>
    <div class="charts-btn-box layout-box">
      <span v-for="item in dateChks" 
        class="charts-btn box-col"
        :class="[curPeriodType == item.periodType ? 'active' : '']"
        @click="changeDate(item.periodType)">
        {{item.text}}
        <i class="line"></i>
      </span>
    </div>
    <echarts :option="option" main="line-charts" class-name="line-charts"></echarts>
  </div>
</template>

<script>
import Echarts from '@/components/Echarts.vue'

export default {
  components: {
    Echarts
  },
  data () {
    return {
      option: {},
      curPeriodType: 'oneMon',
      dateChks: [
        {text: '1个月', periodType: 'oneMon'},
        {text: '3个月', periodType: 'threeMon'},
        {text: '6个月', periodType: 'halfYear'},
        {text: '1年', periodType: 'year'},
        {text: '最大', periodType: 'utilNow'}
      ]
    }
  },
  created () {
    this.getMain()
  },
  methods: {
    getMain: function () {
      let vm = this

      this.$http.get('/fidnews/v1/themefund/priceChangeRatio', {
        params: {
          fundCode: vm.$route.params.id,
          periodType: vm.curPeriodType
        }
      })
      .then((data) => {
        let myData = data.data
        let fund = myData.fund
        let hssb = myData.hssb

        let len = myData.fund.dates.length - 2

        let option = {
          legend: {
            selectedMode: false,
            left: '5%',
            top: '5%',
            itemGap: 50,
            itemWidth: 10,
            itemHeight: 10,
            data: [
              {
                name: '本基金',
                icon: 'circle',
                textStyle: {
                  fontSize: 15
                }
              },
              {
                name: '沪深300',
                icon: 'circle',
                textStyle: {
                  fontSize: 15
                }
              }
            ]
          },
          grid: {
            top: '30%',
            // left: '0%',
            right: '15%',
            bottom: '15%'
          },
          xAxis: {
            type: 'category',
            axisLine: {
              // show: !1
              lineStyle: {
                color: '#eee',
                type: 'dashed'
              }
            },
            axisTick: {
              show: !1
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              interval: len,
              // formatter: function (value) {
              //   if (value) {
              //     return value.substring(10, value.length - 3)
              //   } else {
              //     return value
              //   }
              // },
              textStyle: {
                fontSize: 9,
                color: '#8a8a8a'
              }
            },
            data: fund.dates
            // min: 'dataMin',
            // max: 'dataMax',
          },
          yAxis: {
            type: 'value',
            splitNumber: 2,
            axisLine: {
              show: !1
            },
            axisTick: {
              show: !1
            },
            position: 'right',
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: function (v) {
                return v.toFixed(2) + '%'
              },
              textStyle: {
                fontSize: 9,
                color: '#8a8a8a'
              }
            }
          },
          series: [{
            name: '本基金',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: fund.incrRate,
            itemStyle: {
              normal: {
                color: '#ff5367'
              }
            }
          },
          {
            name: '沪深300',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: hssb.incrRate,
            itemStyle: {
              normal: {
                color: '#66acf5'
              }
            }
          }]
        }
        vm.$set(vm, 'option', option)
      })
    },
    changeDate: function (periodType) {
      this.curPeriodType = periodType
      this.getMain()
    }
  }
}
</script>

<style scoped>
.charts-btn-box{
  border-bottom: 1px solid #f5f5f5;
}
.charts-btn{
  position: relative;
  color: #a2a2a2;
  font-size: 15px;
  line-height: 0.98rem;
  text-align: center;
}
.charts-btn.active{
  color: #ff5367;
}
.charts-btn.active .line{
  background-color: #ff5367;
}
.line{
  position: absolute;
  bottom: 0;
  left: 15%;
  display: inline-block;
  width: 70%;
  height: 1px;
}
.line-charts{
  height: 5.2rem;
  width: 100%;
}
</style>
