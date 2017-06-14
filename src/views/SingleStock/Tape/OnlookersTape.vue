<template>
  <div>
    <imgs-list :list-arr="list" path="/onlookersTapeDetail/"></imgs-list>
    <!-- 加载更多 -->
    <loadmore
      v-on:getData="getList"
      :loading="loading"
      :showLoading="!firstRequest">
    </loadmore>
  </div>
</template>

<script>
import ImgsList from '@/components/ImgsList.vue'
import Loadmore from '@/components/Loadmore.vue'

import contrastDate from '@/assets/js/contrastDate.js'

export default {
  components: {
    ImgsList,
    Loadmore
  },
  data () {
    return {
      list: [],
      firstRequest: true,
      doneText: '没有更多数据',
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
</style>
