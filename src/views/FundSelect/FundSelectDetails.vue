<template>
  <div>
    <div class="box">
      <div class="details-hd">
        <h1 class="fs-36">
          {{ main.title }}
        </h1>
        <p class="date">
          {{ main.releasedTime }}
          <span>|</span>
          {{ main.topicName }}
        </p>
      </div>
      <div class="details-content">
        <img class="details-img" :src="'http://120.76.76.152/mfs' + main.img">
        <div v-html="main.content"></div>
      </div>
    </div>

    <!-- k线图 -->
    <plate-header :title="main.topicName" :gray-line="true" type="high"></plate-header>
    <charts-kline class="charts" :topic-id="topicId"></charts-kline>

    <!-- 关联基金 -->
    <related-fund :topic-name="main.topicName"></related-fund>

  </div>
</template>

<script>
import jsonp from '@/api/jsonp.js'
import moment from 'moment'
import ChartsKline from '@/components/ChartsKline.vue'
import PlateHeader from '@/components/PlateHeader'
import RelatedFund from '@/components/RelatedFund'

export default {
  components: {
    ChartsKline,
    PlateHeader,
    RelatedFund
  },
  data () {
    return {
      main: {},
      mainAssTopicFundListLength: '',
      topicId: '',
      apiOption: {
        dealHtml: 1
        // contentId = this.$route.params.tagname
      },
      apiUrl: '//data.news.21fid.com/fidnews/v1/myAjax/geek/getContentDetailByIdForFund?user=fid&key=8429c35756037c35b6f8ff87ef1cc24e'
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': function () {
      this.getMain()
    }
  },
  created () {
    this.getMain()
  },
  methods: {
    getMain: function () {
      let vm = this
      vm.apiOption.contentId = this.$route.params.tagname
      jsonp({
        url: vm.apiUrl,
        option: vm.apiOption,
        callback: function (data) {
          var myData = data.data
          var lenD = myData.assTopicFundList.length
          var i = 0
          for (; i < lenD; i++) {
            myData.assTopicFundList[i].fundCodeNum = myData.assTopicFundList[i].fundCode.split('.')[0]
            myData.assTopicFundList[i].compatibility = (myData.assTopicFundList[i].compatibility).toFixed(2) + '%'
          }
          // 截取信息
          var content = myData.content
          content = content.replace(/<p>/g, ' ')
          content = content.replace(/<\/p>/g, '<br />')
          var len = content.match(/<br \/>/g).length
          if (len > 2) {
            for (var j = 2; j < len; j++) {
              var pos = content.lastIndexOf('<br />')
              content = content.substring(0, pos)
            }
            myData.content = content.substring(0, content.lastIndexOf('<br />'))
          }
          vm.$set(vm, 'topicId', myData.topicId)
          // console.log(vm.topicId)
          // 2.0
          myData.releasedTime = moment(myData.releasedTime).format('YYYY-MM-DD HH:mm')
          vm.$set(vm, 'main', myData)
          vm.$set(vm, 'mainAssTopicFundListLength', myData.assTopicFundList.length)
        }
      })
    }
  }
  // filters: {
  //   percentage: function (data) {
  //     let num = data * 100
  //     return num.toFixed(2) + '%'
  //   }
  // }
}
</script>

<style scoped>
.box{
  padding-left: 0.44rem;
  padding-right: 0.44rem;
}
.details-hd{
  margin-top: 0.42rem;
  margin-bottom: 0.2rem;
  border-bottom: 1px solid #eee;
}
.details-hd h1{
  font-size: 25px;
  margin-bottom: 0.28rem;
}
.date{
  font-size: 15px;
  color: #666;
}

.details-content{
  font-size: 14px;
  margin-top: 0.4rem;
  margin-bottom: 0.36rem;
}
.details-img{
  width: 100%;
  height: 5.4rem;
}
/*.details-content p{
  line-height: 0.9rem;
  margin-bottom: 1.125rem;
}*/
.charts-hd{
  margin-top: 0.27rem;
  text-align: center;
}
.details-intro{
  margin-top: 1.35rem;
  color: #4d4d4d;
  font-size: 0.44rem;
}
.details-intro2{
  margin-top: 0.27rem;
  color: #4d4d4d;
  font-size: 0.44rem;
}
</style>
