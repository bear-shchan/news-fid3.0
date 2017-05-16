<template>
  <div :id="main" :class="className">
  </div>
</template>

<style scoped>

</style>

<script>
var echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/line')
// 引入k线图
require('echarts/lib/chart/candlestick')
// 引入饼图
require('echarts/lib/chart/pie')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/grid')
require('echarts/lib/component/dataZoom')
require('echarts/lib/component/legend')

export default {
  data () {
    return {
      myChart: {}
    }
  },
  props: {
    option: Object,
    main: {
      type: String,
      default: function () {
        return 'main'
      }
    },
    className: String
  },
  mounted () {
    this.setOption()
  },
  // updated() {
  //   this.setOption()
  // },
  watch: {
    '$route': function () {
      this.setOption()
    },
    option: function () {
      this.setOptionData()
    }
  },
  methods: {
    setOption () {
      this.myChart = echarts.init(document.getElementById(this.main))
      // console.log(this.myChart)
      this.myChart.setOption(this.option)
    },
    setOptionData () {
      this.myChart.setOption(this.option)
    }
  }
}
</script>
