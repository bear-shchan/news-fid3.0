<template>
  <div>
    <simple-list :main-list="mainList"
      lisg-type="link"
      link-path="/HKStocksDetail/">
    </simple-list>
    <!-- 加载更多 -->
    <loadmore
      v-on:getData="getMain"
      :loading="listBusy"
      :showLoading="!firstRequest">
    </loadmore>
  </div>
</template>

<script>
import SimpleList from '@/components/SimpleList.vue'
import Loadmore from '@/components/Loadmore.vue'

export default {
  name: 'Report',
  components: {
    SimpleList,
    Loadmore
  },
  data () {
    return {
      mainList: [],
      pageNum: 1,
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
      this.$http.get('http://120.76.220.55:8081/ChinaConceptStock/hkStock/getHkStockNewsList.do', {
        params: {
          pageNum: this.pageNum
        }
      })
      .then((data) => {
        let list = data.data

        for (let i = 0, len = list.length; i < len; i++) {
          list[i].listIntercept = false
          list[i].releasedDate = list[i].contentTime
        }

        if (this.firstRequest) {
          this.$set(this, 'mainList', list)
          this.firstRequest = false
        } else {
          for (let i = 0, len = list.length; i < len; i++) {
            this.mainList.push(list[i])
          }
        }
        this.pageNum++
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
