<template>
  <div>
    <ul class="main-list"
      :main-list="mainList"
      v-infinite-scroll="getMain" 
      infinite-scroll-disabled="listBusy"
      infinite-scroll-distance="350"
      infinite-scroll-immediate-check="false">
      <li class="list-item" v-for="item in mainList" @click="goToDetail(item)">
        <div>
          <p class="title" v-if="item.title != '' && item.title != '快讯'">
            {{ item.title }}
          </p>
        </div>
        <p class="date">
          {{ item.releaseTime | moment('MM.DD HH:mm') }}
        </p>
      </li>
    </ul>
    <no-data-img text="暂无相关公告"
      :show="!mainList[0] && !listBusy">
      <img class="no-data-img" src="../../assets/img/no-announcement.png">
    </no-data-img>
  </div>
</template>

<script>
import NoDataImg from './components/NoDataImg'

export default {
  components: {
    NoDataImg
  },
  data () {
    return {
      mainList: [],
      params: {
        code: this.$route.params.tagName
        // lastReportTime: ''
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
        this.params.lastReportTime = this.lastBeginTime
      }
      this.$http.get('/fidnews/v1/geek/v3/queryStockReportList', {
        params: this.params
      })
      .then((data) => {
        let list = data.data

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
    },
    goToDetail (item) {
      this.$router.push({ path: '/singleStockAnnouncement/' + item.id })
    }
  },
  computed: {
    lastBeginTime: function () {
      var len = this.mainList.length - 1
      return this.mainList[len].lastReportTime
    }
  }
}
</script>

<style scoped>
.main-list{
  padding: 0 0.4rem;
}
.main-list .list-item:first-of-type{
  padding-top: 0.53rem;
}
.main-list .list-item{
  padding-bottom: 1.07rem;
}
.main-list .list-item .title{
  line-height: 22px;
  font-size: 15px;
  color: #2e2e37;
}
.main-list .list-item .date{
  text-align: right;
  font-size: 12px;
  line-height: 22px;
  color: #66667a;
}
</style>
