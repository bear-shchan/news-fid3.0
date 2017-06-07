<template>
  <div id="main" class="echarts"></div>
</template>

<style scoped>
.echarts {
  height: 7.46rem;
  width: 100%;
  margin-bottom: -2rem;
}
</style>

<script>
var echarts = require('echarts/lib/echarts')
// 引入k线图
require('echarts/lib/chart/candlestick')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/grid')
require('echarts/lib/component/dataZoom')

export default {
  props: ['topicId'],
  // mounted () {
  //   this.getActualIndex()
  // },
  watch: {
    topicId: function () {
      this.getActualIndex()
    }
  },
  methods: {
    splitData: function (data) {
      var categoryData = []
      var values = []
      var arr = []
      var len = data.length
      for (let i = 0; i < len; i++) {
        categoryData.push(data[i].day)
        arr = [
          data[i].startIndex,
          data[i].endIndex,
          data[i].maxIndex,
          data[i].minIndex
        ]
        values.push(arr)
      }
      return {
        categoryData: categoryData,
        values: values
      }
    },
    getActualIndex: function () {
      this.$http.get('/fidnews/v1/queryTopicHistoryIndex', {
        params: {
          topicId: this.topicId
        }
      })
      .then((data) => {
        // console.log(data.data)
        var myData = this.splitData(data.data)
        let option = {
          grid: {
            top: '5%',
            left: '15%',
            right: '10%',
            bottom: '20%'
          },
          xAxis: {
            type: 'category',
            data: myData.categoryData,
            scale: true,
            boundaryGap: false,
            axisLine: {onZero: false},
            splitLine: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
          },
          yAxis: {
            scale: true,
            splitArea: {
              show: true
            }
          },
          dataZoom: [
            {
              show: true,
              type: 'slider',
              y: '90%',
              start: 85,
              end: 100
            }
          ],
          series: [
            {
              name: '日K',
              type: 'candlestick',
              data: myData.values
            }
          ]
        }
        // 2.0
        var myChart = echarts.init(document.getElementById('main'))
        myChart.setOption(option)
      })
    }
  }
}
</script>
