<template>
  <div>
    <!-- <plate-header title="实时主题" type="gray" padding-left="0.45"></plate-header> -->

    <plate-loading :loading="loading">
      <topic-list :list="mainList"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="listBusy" 
        infinite-scroll-distance="350"
        infinite-scroll-immediate-check="false"></topic-list>
    </plate-loading>

  </div>
</template>

<script>
import jsonp from '@/api/jsonp'
import contrastDate from '@/assets/js/contrastDate.js'

import TopicList from '@/components/TopicList'
import PlateHeader from '@/components/PlateHeader'
import PlateLoading from '@/components/PlateLoading'

import { mapActions } from 'vuex'

export default {
  components: {
    TopicList,
    PlateHeader,
    PlateLoading
  },
  data () {
    return {
      mainList: [],
      apiOption: {
        'channelId': 2,
        'pageNum': 1
      },
      apiUrl: '//data.news.21fid.com/fidnews/v1/myAjax/geek/getContentListByPageForFund?user=fid&key=8429c35756037c35b6f8ff87ef1cc24e'
    }
  },
  created () {
    // this.REVERT_STATE()
    this.getData()
  },
  methods: {
    ...mapActions(['REVERT_STATE']),
    getData: function () {
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
            myData[i].releasedTime = contrastDate(myData[i].releasedTime)

            fundName = myData[i].fundName.replace('(', ' ')
            myData[i].fundName = fundName.split(')')[0]
            myData[i].topicName = myData[i].topicName.replace('飞笛', '主题')
          }
          vm.$set(vm, 'mainList', myData)
        }
      })
    },
    loadMore: function () {
      // 与其他的页面不同
      var vm = this
      this.listBusy = true
      vm.apiOption.pageNum = vm.apiOption.pageNum + 1
      jsonp({
        url: vm.apiUrl,
        option: vm.apiOption,
        callback: function (data) {
          this.listBusy = false
          var dataList = data.data
          var fundName
          for (var i = 0, len = dataList.length; i < len; i++) {
            dataList[i].releasedTime = contrastDate(dataList[i].releasedTime)

            fundName = dataList[i].fundName.replace('(', ' ')
            dataList[i].fundName = fundName.split(')')[0]
            dataList[i].topicName = dataList[i].topicName.replace('飞笛', '主题')

            vm.mainList.push(dataList[i])
          }
        }
      })
    }
  },
  computed: {
    loading () {
      return !this.mainList[0]
    }
  }
}
</script>

<style scoped>

</style>
