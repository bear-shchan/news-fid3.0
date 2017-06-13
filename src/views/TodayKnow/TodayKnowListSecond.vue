<template>
  <div>
    <imgs-list :list-arr="list" path="/todayKnowDetail/"></imgs-list>
    <loadmore
      v-on:getData="getList"
      :loading="loading"
      :showLoading="!firstRequest"
      :done="done">
    </loadmore>
  </div>
</template>

<script>
import contrastDate from '@/assets/js/contrastDate.js'
import ImgsList from '@/components/ImgsList.vue'
import Loadmore from '@/components/Loadmore.vue'
export default {
  name: '',
  components: {
    ImgsList,
    Loadmore
  },
  data () {
    return {
      list: [],
      publishTime: '',
      firstRequest: true,
      doneText: '没有更多数据',
      loading: false,
      done: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.loading = true
      this.$http.get('/fidnews/v1/geek/v3/queryFocusTodayListByPro', {
        params: {
          user: 'fidinner',
          key: 'ab54eae187cd5cf4e89fed7a4e62586e',
          publishTime: this.publishTime,
          proId: this.$route.params.tagname,
          size: 10
        }
      })
      .then((res) => {
        let data = res.data
        if (data.length === 0) {
          this.done = true
          return
        }
        for (let i = 0, len = data.length; i < len; i++) {
          data[i].date = contrastDate(data[i].publishTime)
          data[i].pictureUrl = data[i].pictureUrl.split(';')
          data[i].pictureNum = data[i].pictureUrl.length
        }
        if (this.firstRequest) {
          this.firstRequest = false
        }
        this.$set(this, 'list', this.list.concat(data))
        this.publishTime = this.list[this.list.length - 1].publishTime
        this.loading = false
        console.log(data)
      })
    }
  }
}
</script>

<style scoped>
  .box {
    padding-left: 0.4rem;
    padding-right: 0.4rem;
  }
</style>
