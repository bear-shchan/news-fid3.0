<template>
  <div>
    <imgs-list :list-arr="list" path="/onlookersTapeDetail/"></imgs-list>
    <!-- 加载更多 -->
    <mugen-scroll
      class="dropload-down"
      :handler="getList"
      :should-handle="!loading"
      scroll-container="scrollContainer">
      <img class="loading-icon" src="../../../assets/img/loading.gif">
      {{ droploadDownText }}
    </mugen-scroll>
  </div>
</template>

<script>
import imgsList from '@/components/imgsList.vue'
import MugenScroll from 'vue-mugen-scroll'

import contrastDate from '@/assets/js/contrastDate.js'

export default {
  components: {
    imgsList,
    MugenScroll
  },
  data () {
    return {
      list: [],
      firstRequest: true,
      droploadDownText: '正在加载中...',
      loading: false,
      releaseTime: ''
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.loading = true
      this.$http.get('/fidnews/v1/geek/v2/queryOnlookersMarketMixedList', {
        params: {
          releaseTime: this.releaseTime,
          pageSize: 10
        }
      })
      .then((res) => {
        let data = res.data
        data = data.map(i => {
          i.title = i.content
          i.date = contrastDate(i.time)
          i.pictureUrl = i.pictureUrl.split(';')
          i.pictureNum = i.pictureUrl.length
          return i
        })
        if (this.firstRequest) {
          this.$set(this, 'list', data)
          this.firstRequest = false
        } else {
          for (let i = 0, len = data.length; i < len; i++) {
            this.list.push(data[i])
          }
        }
        this.releaseTime = this.list[this.list.length - 1].time
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
.dropload-down {
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #999;
}
.dropload-down .loading-icon {
  width: 14px;
  height: 14px;
  vertical-align: middle;
  padding-right: 4px;
}
</style>
