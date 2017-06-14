<template>
  <div>
    <div class="box">
      <div class="details-hd">
        <h1 class="fs-36">
          {{ main.shortTitle }}
        </h1>
        <div class="p-source">
          <span class="news-date">{{ main.updatedDate }}</span>
          <span class="news-origin">飞笛智投{{ main.author }}</span>      
        </div>
        <div class="recoindex">
          <p class="yq-date" v-if="main.title">
            <span>预期时间：</span>
            {{ main.title }}
          </p>
            <p class="tj-index" v-if="main.importance != ''">
              <span>推荐指数：</span>
              <img :src="starImg">
            </p>
            <p class="chance-logic" v-if="main.chance_logic">
              <span>机会逻辑：</span> 
              <span class="chance-text">{{ main.chance_logic }}</span>
            </p>
        </div>
      </div>
      <div class="details-content details-content-s">
        <div v-html="main.latestStatus0"></div>
        <div v-html="main.latestStatus1"></div>
        <div v-html="main.content"></div>
      </div>
    </div>

    <!-- k线图 -->
    <div class="title">{{main.topicName}}</div>
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
      <div class="history" v-if="main.history_info">
        <p class="history-lanmu">历史消息</p>
        <ul v-if="main.history_info.length < 4">
          <li class="info-li" v-for="(item, index) in main.history_info" :key="index">
            <hr class="b-line" width="4" size="350" color="#fff" style="display: none;">
            <span class="i-circle"></span>
            <p class="history-info">
              {{ item }}
            </p>
          </li>
        </ul>
        <ul v-else>
          <li class="info-li" v-for="(item, index) in main.history_info" :key="index" v-if="index < 3" >
            <hr class="b-line" width="4" size="350" color="#fff" style="display: none;">
            <span class="i-circle"></span>
            <p class="history-info">
              {{ item }}
            </p>
          </li>
          <li :class="'info-li ' + isshow" data-isshow="1" v-else>
            <hr class="b-line" width="4" size="350" color="#fff" style="display: none;">
            <span class="i-circle"></span>
            <p class="history-info">
              {{ item }}
            </p>
          </li>
        </ul>
        <div class="show" id="show" @click="showHide">{{ isshowText }}</div>
      </div>
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
      echartOption: {},
      starImg: '',
      isshow: 'isshow',
      isshowText: '展开  ∨'
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
        console.log(data)
        data.depthAnalysis.content = data.depthAnalysis.content.replace('<p><br></p>', '')
        data.contentTxt = data.contentTxt.replace('<p><br></p>', '')
        let arr = data.contentTxt.match(/<p[^>]*>(?:(?!<\/p>)[\s\S])*<\/p>/gi)
        data.latestStatus0 = arr[1]
        data.latestStatus1 = arr[0]
        console.log(arr[0])
        this.topicId = data.cmsTopics[0].id
        data.topicName = data.cmsTopics[0].name
        data.content = data.depthAnalysis.content
        this.$set(this, 'main', data)
        this.starImg = require('../../assets/img/star_' + data.importance + '.png')
        data.updatedDate = moment(data.releasedTime).format('MM-DD HH:mm')
        if (data.history_info) {
          data.history_info = data.history_info.split('\r\n')
          if (data.history_info[data.history_info.length - 1] === '') {
            data.history_info = data.history_info.slice(0, data.history_info.length - 1)
          }
        }
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
    },
    showHide (event) {
      if (this.isshow === 'isshow') {
        this.$set(this, 'isshow', '')
        this.$set(this, 'isshowText', '收起  ∧')
      } else {
        this.$set(this, 'isshow', 'isshow')
        this.$set(this, 'isshowText', '展开  ∨')
      }
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
.news-date, .news-origin, .news-read {
  font-size: 14px;
  color: #999;
  margin-bottom: 0.13rem;
}
.news-origin {
  display: inline-block;
  padding-left: 0.27rem;
  padding-right: 0.4rem;
}
.news-read {
  padding-right: 0.4rem;
}
.recoindex {
  font-size: 18px;
  color: #000;
}
.recoindex p {
  padding-top: 0.53rem;
}
.chance-logic {
  display: flex;
}
.yq-date span, .tj-index span {
  width: 2.67rem;
}
.chance-text {
  flex: 1;
  background-color: #ffd345;
  border-radius: 0.11rem;
  padding: 0.27rem 0.21rem;
}
.history {
  border-top: 0.19rem solid #f7f7f7;
  margin-top: 0.8rem;
}
.history ul{
  padding-left: 0.45rem;
  padding-right: 0.32rem;
}
.history-lanmu {
  font-size: 17px;
  height: 1.17rem;
  line-height: 1.17rem;
  padding-left: 0.32rem;
  padding-right: 0.32rem;
  color: #4694f4;
}
.history-info {
  background-color: #fff;
  font-size: 18px;
  line-height: 0.72rem;
  color: #191919;
  position: relative;
  margin-left: 0.27rem;
  margin-bottom: 0.27rem;
}
.info-li {
  width: 100%;
  display: inline-block;
  border-left: 1px solid #4694f4;
}
.info-li:last-child {
  border-left: none;
}
.info-li:first-child {
  padding-top: 0.27rem;
  border-left: 1px solid #4694f4;
}
.i-circle {
  display: block;
  width: 0.27rem;
  height: 0.27rem;
  border-radius: 50%;
  background-color: #4694f4;
  position: absolute;
  left: 0.32rem;
  margin-top: 0.05rem;
}
.info-li:last-child {
  border-left: none;
}
.isshow {
  display: none;
}
.show {
  padding-top: 0.43rem;
  padding-bottom: 0.43rem;
  text-align: center;
  font-size: 16px;
  border-top: 0.03rem solid #e2e2e2;
  color: #4694f4
}
</style>
