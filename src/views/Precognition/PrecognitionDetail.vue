<template>
  <div>
    <div class="box">
      <div class="details-hd">
        <h1 class="fs-36">
          {{ main.shortTitle }}
        </h1>
        <span class="date-text">预期</span><p class="date">
          {{ main.title }}
        </p>
        <span class="source">飞笛智投</span>
      </div>
      <div class="details-content details-content-s">
        <div v-html="main.latestStatus0"></div>
        <div v-html="main.latestStatus1"></div>
        <div v-html="main.depthAnalysis.content"></div>
      </div>
    </div>

    <!-- k线图 -->
    <div class="title">{{main.cmsTopics[0].name}}</div>
    <echarts :option="echartOption" class-name="echarts gray-line"></echarts>

    <!-- 利好个股一览表 -->
    <div class="table-title">利好个股一览表</div>
    <table class="table">
      <tr>
        <th>个股</th>
        <th style="text-align: left;padding-left: 0.32rem">原因</th>
      </tr>
      <tr v-for="item in main.depthAnalysisPlateStocks">
        <td><p>{{item.stockName}}</p></td>
        <td v-html="item.reason"></td>
      </tr>
    </table>
  </div>
</template>

<script>
import moment from 'moment'
import Echarts from '@/components/Echarts.vue'

export default {
  components: {
    Echarts
  },
  data () {
    return {
      main: {},
      topicId: '',
      echartOption: {}
    }
  },
  created () {
    this.getMain()
  },
  methods: {
    getMain () {
      this.$http.get('/fidnews/v1/geek/v2/queryFutureDetailSearch', {
        params: {
          cmsContentId: this.$route.params.tagname
        }
      })
      .then((data) => {
        data = data.data[0]
        data.depthAnalysis.content = data.depthAnalysis.content.replace('<p><br></p>', '')
        data.contentTxt = data.contentTxt.replace('<p><br></p>', '')
        let arr = data.contentTxt.match(/<p[^>]*>(?:(?!<\/p>)[\s\S])*<\/p>/gi)
        data.latestStatus0 = arr[1]
        data.latestStatus1 = arr[0]
        this.topicId = data.cmsTopics[0].id
        this.$set(this, 'main', data)
        this.getActualIndex()
      })
    },
    splitData (data) {
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
    getActualIndex () {
      this.$http.get('/fidnews/v1/queryTopicHistoryIndex', {
        params: {
          topicId: this.topicId
        }
      })
      .then((data) => {
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
        this.$set(this, 'echartOption', option)
      })
    }
  },
  filters: {
    moment (value, param) {
      return moment(value).format(param)
    }
  }
}
</script>

<style scoped>
.title{
  font-size: 15px;
  text-align: center;
  font-weight: bold;
}
.box{
  padding-left: 0.44rem;
  padding-right: 0.44rem;
}
.details-hd{
  margin-top: 0.53rem;
  margin-bottom: 0.8rem;
}
.details-hd h1{
  font-size: 24px;
  margin-bottom: 0.53rem;
}
.date{
  display: inline-block;
  font-size: 12px;
  color: #2e2e37;
  border: 1px solid #f4ce46;
  border-radius:  0 0.05rem 0.05rem 0;
  border-left: 0;
  line-height: 0.48rem;
  padding: 0 0.15rem;
}
.date-text{
  display: inline-block;
  line-height: 0.48rem;
  background-color: #f4ce46;
  border: 1px solid #f4ce46;
  border-radius:  0.05rem 0 0 0.05rem;
  width: 0.99rem;
  text-align: center;
}
.source{
  color: #83839d;
  padding-left: 0.27rem;
}

.details-content{
  font-size: 14px;
  margin-top: 0.75rem;
  margin-bottom: 0.64rem;
}
.details-content div:nth-child(1){
  color: #f35b6a;
}
.details-content div:nth-child(2){
  color: #9a9a9a;
}
.details-content img{
  width: 100%;
  display: none;
  /*overflow: hidden;*/
}
.details-img{
  width: 100%;
  height: 10rem;
}

.charts-hd{
  margin-top: 0.5rem;
  text-align: center;
}
.details-intro{
  margin-top: 2.5rem;
  color: #4d4d4d;
  font-size: 0.82rem;
}
.details-intro2{
  margin-top: 0.5rem;
  color: #4d4d4d;
  font-size: 0.82rem;
}

.echarts {
  height: 7.46rem;
  width: 100%;
  margin-bottom: -2rem;
}

/*table*/
.table-title{
  font-size: 15px;
  color: #4e9df4;
  text-align: center;
  margin-top: 2.5rem;
}
.table{
  margin: 0 0.44rem;
  font-size: 15px;
  border: 1px solid #e2e2e2;
  border-collapse: collapse;
  border-spacing: 0;
}
.table th{
  border: 1px solid #e2e2e2;
  color: #1a1a1a;
  line-height: 0.93rem;
}
.table td{
  padding: 0.32rem;
  border: 1px solid #e2e2e2;
}
.table th:first-of-type{
  width: 52px;
}
.table tr td:first-of-type p{
  margin: 10px auto;
  width: 20px;
  line-height: 24px;
  color: #4e9df4;
}
</style>
