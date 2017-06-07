<template>
  <div>
    <!-- <plate-header title="实时主题" type="gray" padding-left="0.45"></plate-header> -->
    <topic-list :list="mainList"></topic-list>
    <!-- 加载更多 -->
    <loadmore
      v-on:getData="getData"
      :loading="listBusy"
      :showLoading="apiOption.pageNum !== 1"
      :done="done">
    </loadmore>

  </div>
</template>

<script>
import jsonp from '@/api/jsonp'
import contrastDate from '@/assets/js/contrastDate.js'

import TopicList from '@/components/TopicList'
// import PlateHeader from '@/components/PlateHeader'
import Loadmore from '@/components/Loadmore.vue'

import { mapActions } from 'vuex'

export default {
  components: {
    TopicList,
    // PlateHeader,
    Loadmore
  },
  data () {
    return {
      mainList: [],
      listBusy: false,
      done: false,
      apiOption: {
        'channelId': 2,
        'pageNum': 1
      },
      apiUrl: '//data.news.21fid.com/fidnews/v1/myAjax/geek/getContentListByPageForFund?user=fid&key=8429c35756037c35b6f8ff87ef1cc24e'
    }
  },
  created () {
    this.getData()
  },
  methods: {
    ...mapActions(['REVERT_STATE']),
    getData: function () {
      var vm = this
      this.listBusy = true
      jsonp({
        url: vm.apiUrl,
        option: vm.apiOption,
        callback: function (data) {
          if (data.num === 0) {
            this.done = true
            return
          }
          var dataList = data.data
          var fundName
          for (var i = 0, len = dataList.length; i < len; i++) {
            dataList[i].releasedTime = contrastDate(dataList[i].releasedTime)

            fundName = dataList[i].fundName.replace('(', ' ')
            dataList[i].fundName = fundName.split(')')[0]
            dataList[i].topicName = dataList[i].topicName.replace('飞笛', '主题')
          }
          if (vm.apiOption.pageNum === 1) {
            vm.$set(vm, 'mainList', dataList)
          } else {
            vm.$set(vm, 'mainList', vm.mainList.concat(dataList))
          }
          vm.apiOption.pageNum = vm.apiOption.pageNum + 1
          vm.listBusy = false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
