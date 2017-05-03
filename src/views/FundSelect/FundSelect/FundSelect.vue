<template>
  <div>  <!-- v-show="!getSpinner" -->
    <!-- 轮播图 -->
    <swipe-list :hot-list="hotList" :details="details"></swipe-list>
    <!-- 实时主题&&主题指数 -->
    <real-time-topic :list="mainList"></real-time-topic>

    <!-- <main-list :main-list="mainList"
      :details="details"
      class="main-list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="getListBusy" 
      infinite-scroll-distance="10"
      infinite-scroll-immediate-check="false"></main-list> -->
  </div>
</template>

<script>
import jsonp from '@/api/jsonp.js'
import contrastDate from '@/assets/js/contrastDate.js'
// import MainList from '@/components/MainList.vue'
import RealTimeTopic from './components/RealTimeTopic.vue'
import SwipeList from '@/components/SwipeList.vue'

import { mapActions } from 'vuex'

export default {
  components: {
    RealTimeTopic,
    SwipeList
  },
  data () {
    return {
      details: 'fundSelectDetails',
      hotList: [],
      hotOption: {
        user: 'fid',
        key: '8429c35756037c35b6f8ff87ef1cc24e'
      },
      hotUrl: '//data.news.21fid.com/fidnews/v1/myAjax/geek/getHotTopicForFund',
      mainList: [],
      apiOption: {
        'channelId': 2,
        'pageNum': 1
      },
      updown: false,
      apiUrl: '//data.news.21fid.com/fidnews/v1/myAjax/geek/getContentListByPageForFund?user=fid&key=8429c35756037c35b6f8ff87ef1cc24e'
    }
  },
  created () {
    this.getHotTopic()
    // this.REVERT_STATE()
  },
  methods: {
    ...mapActions(['REVERT_STATE']),
    getHotTopic: function () {
      let vm = this
      jsonp({
        url: vm.hotUrl,
        option: vm.hotOption,
        callback: function (data) {
          var Data = data.data
          for (var i in Data) {
            Data[i].topicName = Data[i].topicName.replace('飞笛', '主题')
          }
          vm.$set(vm, 'hotList', Data)
          vm.getEveryTime()
        }
      })
    },
    getEveryTime: function (Option) {
      let vm = this
      jsonp({
        url: vm.apiUrl,
        option: vm.apiOption,
        callback: function (data) {
          // 分裂fundName
          var myData = data.data
          var i = 0
          var len = myData.length
          var fundName
          for (; i < len; i++) {
            // fundName = myData[i].fundName.split('(')
            // fundName[1] = '(' + fundName[1]
            // myData[i].fundName = fundName[0] + '<br />' + fundName[1]
            // console.log(contrastDate)
            myData[i].releasedTime = contrastDate(myData[i].releasedTime)

            fundName = myData[i].fundName.replace('(', ' ')
            myData[i].fundName = fundName.split(')')[0]
            myData[i].topicName = myData[i].topicName.replace('飞笛', '主题')
          }
          vm.$set(vm, 'mainList', myData)
        }
      })
    }
  },
  beforeDestroy () {
    this.getHotTopic = null
    this.getEveryTime = null
  }
}
</script>

<style>
.main-header .hot-fund{
  color: #4180a4;
}
/*.hot-img{
  height: 1rem;
}*/
</style>
