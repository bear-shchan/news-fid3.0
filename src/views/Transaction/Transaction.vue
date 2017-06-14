<template>
  <div>
    <!--<simple-list :main-list="mainList"
      lisg-type="link"
      link-path="/TransactionDetail/"
      v-infinite-scroll="getMain" 
      infinite-scroll-disabled="listBusy"
      infinite-scroll-distance="350"
      infinite-scroll-immediate-check="false"></simple-list>-->

    <simple-list :main-list="mainList"
      lisg-type="link"
      link-path="/TransactionDetail/">
    </simple-list>
    <!-- 加载更多 -->
    <loadmore
      v-on:getData="getMain"
      :loading="loading"
      :showLoading="!firstRequest">
    </loadmore>
  </div>
</template>

<script>
import SimpleList from '@/components/SimpleList.vue'
import Loadmore from '@/components/Loadmore.vue'

export default {
  name: 'Transaction',
  components: {
    SimpleList,
    Loadmore
  },
  data () {
    return {
      mainList: [],
      firstRequest: true,
      loading: false,
      releaseTime: ''
    }
  },
  created () {
    this.getMain()
  },
  beforeRouteUpdate (to, from, next) {
    this.getMain()
    next()
  },
  // mounted () {
  //   this.getMain()
  // },
  methods: {
    getMain () {
      this.loading = true
      this.$http.get('/fidnews/v1/geek/v3/queryOnlookersAllYiDongList', {
        params: {
          num: 20,
          releaseTime: this.releaseTime
        }
      })
      .then((data) => {
        let list = data.data

        for (let i = 0, len = list.length; i < len; i++) {
          list[i].listIntercept = false
          list[i].releasedDate = list[i].time
        }

        if (this.firstRequest) {
          this.$set(this, 'mainList', list)
          this.firstRequest = false
        } else {
          for (let i = 0, len = list.length; i < len; i++) {
            this.mainList.push(list[i])
          }
        }
        let len = this.mainList.length - 1
        this.releaseTime = this.mainList[len].releasedDate
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
