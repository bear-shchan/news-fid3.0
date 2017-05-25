<template>
  <div>
    <!--<simple-list :main-list="mainList"
      lisg-type="link"
      link-path="/reportDetail/"
      v-infinite-scroll="getMain" 
      infinite-scroll-disabled="listBusy"
      infinite-scroll-distance="350"
      infinite-scroll-immediate-check="false"></simple-list>-->

    <simple-list :main-list="mainList"
      lisg-type="link"
      link-path="/TransactionDetail/">
    </simple-list>
  </div>
</template>

<script>
import SimpleList from '@/components/SimpleList.vue'

export default {
  name: 'Transaction',
  components: {
    SimpleList
  },
  data () {
    return {
      mainList: [],
      params: {
        channelId: 11
        // beginTimeLong: ''
      },
      firstRequest: true,
      listBusy: false
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
      // this.listBusy = true
      this.$http.get('/fidnews/v1/geek/v3/queryOnlookersYiDongList')
      .then((data) => {
        let list = data.data

        for (let i = 0, len = list.length; i < len; i++) {
          list[i].listIntercept = false
          list[i].releasedDate = list[i].time
        }
        this.$set(this, 'mainList', list)

        // if (this.firstRequest) {
        //   this.$set(this, 'mainList', list)
        //   this.firstRequest = false
        // } else {
        //   for (let i = 0, len = list.length; i < len; i++) {
        //     this.mainList.push(list[i])
        //   }
        // }
        // this.listBusy = false
      })
    }
  }
  // computed: {
  //   lastBeginTime: function () {
  //     var len = this.mainList.length - 1
  //     return this.mainList[len].releasedDate
  //   }
  // }
}
</script>

<style scoped>

</style>
