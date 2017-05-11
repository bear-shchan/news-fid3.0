<template>
  <div>
    <list :main-list="mainList"
      lisg-type="link"
      link-path="/reportDetail/"
      v-infinite-scroll="getMain" 
      infinite-scroll-disabled="listBusy"
      infinite-scroll-distance="350"
      infinite-scroll-immediate-check="false"></list>
  </div>
</template>

<script>
import List from '@/components/List.vue'

export default {
  name: 'Report',
  components: {
    List
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
  methods: {
    getMain () {
      this.listBusy = true
      if (!this.firstRequest) {
        this.params.beginTimeLong = this.lastBeginTime
      }
      this.$http.get('/fidnews/v1/myAjax/getContentByTime', {
        params: this.params
      })
      .then((data) => {
        let list = data.page.dataList

        for (let i = 0, len = list.length; i < len; i++) {
          list[i].listIntercept = false
        }

        if (this.firstRequest) {
          this.$set(this, 'mainList', list)
          this.firstRequest = false
        } else {
          for (let i = 0, len = list.length; i < len; i++) {
            this.mainList.push(list[i])
          }
        }
        this.listBusy = false
      })
    }
  },
  computed: {
    lastBeginTime: function () {
      var len = this.mainList.length - 1
      return this.mainList[len].releasedDate
    }
  }
}
</script>

<style scoped>

</style>
