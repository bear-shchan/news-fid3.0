<template>
  <div>
    <!-- 筛选块 -->
    <!-- <div class="filter-box clearfix">
      <label class="main-filter" v-on:touchstart="autoRefresh">
        <span class="text">自动刷新</span>
        <input type="checkbox">
        <span class="box"></span>
      </label>
      <importance-radios></importance-radios>
    </div> -->

    <!-- Loading -->
    <!-- <list-loading :list-loaded="listLoaded"></list-loading> -->

    <!-- 列表项 -->
    <ul class="main-list">
      <li class="list-item" v-for="(item, index) in mainList" 
        @click="changeIntercept(index)">
        <div :class="'importance-' + item.importance ">
          <p class="title">
            <span class="date">{{ item.releasedDate | moment('HH:mm') }}</span>
            <span v-if="item.title != '' && item.title != '快讯'">
              {{ item.title }}
            </span>
            <span v-else>快讯 </span>
          </p>
          <p class="description list-intercept" 
            :class="{'list-intercept-false' : !item.listIntercept}">
            {{ item.description }}
          </p>
        </div>
      </li>
    </ul>
    <!-- 加载更多 -->
    <loadmore
      v-on:getData="getEveryTime"
      :loading="listBusy"
      :showLoading="!firstRequest">
    </loadmore>
  </div>
</template>

<script>
import moment from 'moment'
import Loadmore from '@/components/Loadmore.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Loadmore
    // ListLoading
  },
  data () {
    return {
      mainList: [],
      headerDate: '',
      // apiOption: {
      //   'channelId': 6
      // },
      // firstRequest: true,
      // refreshOption: {
      //   'bigReleasedDate': 1,
      //   'beginTimeLong': '',
      //   'order': 1,
      //   'channelId': 6
      // },
      // loadMoreOption: {
      //   'beginTimeLong': '',
      //   'channelId': 6
      // },
      option: {
        // 'beginTimeLong': '',
        'channelId': 6,
        'subjects': ''
      },
      check: false,
      listLoaded: false,
      listBusy: false,
      firstRequest: true,
      done: false
    }
  },
  created () {
    this.getEveryTime()
    this.REVERT_STATE()
  },
  // beforeDestroy () {
  //   this.REVERT_STATE()
  // },
  methods: {
    ...mapActions(['REVERT_STATE']),
    ajax: function (cb) {
      if (this.done) return
      if (!this.firstRequest) {
        var lastBeginTime = this.mainList[this.mainList.length - 1].releasedDate
        this.option.beginTimeLong = lastBeginTime
      }
      this.option.subjects = this.$route.params.tagName
      this.$http.get('/fidnews/v1/myAjax/getContentByTime', {
        params: this.option
      })
      .then(data => {
        cb(data)
      })
    },
    getEveryTime: function () {
      var vm = this
      vm.listBusy = true
      this.ajax(callback)

      function callback (data) {
        if (data.page.dataList[0] === undefined) this.done = true
        vm.listBusy = false
        var list = data.page.dataList
        // var msgDate = 0
        for (var i = 0, len = list.length; i < len; i++) {
          list[i].releasedDateFormatHM = moment(list[i].releaseTime).format('HH:mm')
          if (moment(list[i].releaseTime).format('M.D') < moment().format('M.D')) {
            list[i].releasedDateFormatHM = moment(list[i].releaseTime).format('MM.DD HH:mm')
          }
          list[i].listIntercept = true
        }
        if (vm.firstRequest) {
          vm.$set(vm, 'mainList', list)
          vm.firstRequest = !vm.firstRequest
        } else {
          for (let i = 0, len = list.length; i < len; i++) {
            vm.mainList.push(list[i])
          }
        }
      }
    },
    changeIntercept (b) {
      this.mainList[b].listIntercept = !this.mainList[b].listIntercept
    }
  },
  watch: {
    getImportance: function () {
      this.changeImportance(this.getImportance)
    }
  },
  computed: {
    ...mapGetters(['getImportance']),
    beginTime: function () {
      return this.mainList[0].releasedDate
    },
    lastBeginTime: function () {
      var len = this.mainList.length - 1
      return this.mainList[len].releasedDate
    }
  }
}
</script>

<style scoped>
.filter-box{
  line-height: 1.12rem;
  background-color: #f7f7f7;
  color: #4c4c4c;
  font-size: 12px;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
}
.main-filter .text{
  margin-right: 0.11rem;
}
.main-filter input[type=checkbox] {
  display: none;
}
.main-filter .box{
  -webkit-transition: background-color .3s;
  transition: background-color .3s;
  display: inline-block;
  vertical-align: middle;
  width: 0.67rem;
  border-radius: 12px;
  background-color: #66667a;
  box-shadow: 0 0 2px rgba(0,0,0,.3);
  height: 0.4rem;
  cursor: pointer;
}
.main-filter .box:after {
  -webkit-transition: margin .3s;
  transition: margin .3s;
  display: block;
  content: "";
  text-align: center;
  margin-top: 0.01rem;
  margin-left: 0.05rem;
  line-height: 0.4rem;
  width: 0.37rem;
  height: 0.37rem;
  border-radius: 50%;
  background-color: #f4ce46;
  /*border: 1px solid #ddd;*/
}
.main-filter input[type=checkbox]:checked+.box:after, .main-filter.active .box:after {
  margin-left: 0.24rem;
  content: "";
}
.main-filter input[type=checkbox]:checked+.box, .switch-box.active .box {
  /*background-color: #417fa3;*/
}

/*资讯列表*/
.main-list{
  padding-left: 0.4rem;
  padding-right: 0.4rem;
}
.main-list .list-item{
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #ececec;
}
.main-list .list-item .title{
  color: #2e2e37;
  font-size: 16px;
  line-height: 23px;
}
.main-list .list-item .date{
  color: #e2666d;
}
.main-list .list-item .description{
  font-size: 14px;
  line-height: 20px;
  color: #83839d;
  padding-top: 4px;
}
.main-list .list-item .subject-link{
  font-size: 14px;
  line-height: 27px;
  color: #4694f4;
}
.list-item .message-index{
  margin-top: 0.27rem;
  line-height: 0;
}
.list-item .message-index .icon{
  width: 0.4rem;
  height: 0.4rem;
  margin-right: 0.13rem;
  vertical-align: text-bottom;
}
.list-item .message-index .text{
  display: inline-block;
  font-size: 10px;
  line-height: 0.48rem;
  color: #2e2e37;
  background-color: #f4ce46;
  color: #2e2e37;
  padding-left: 0.13rem;
  padding-right: 0.13rem;
}

  /*重要性列表颜色*/
.main-list .list-item .importance-2 .title,
.main-list .list-item .importance-2 .description{
  color: #e2666d;
}
/*.main-list .list-item .importance-3 .title{
  color: #e2666d;
  font-weight: bold;
}*/
  /*截取资讯长度和展示全部*/
.list-intercept{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
}
.list-intercept-false {
  -webkit-line-clamp: 100;
}
</style>
