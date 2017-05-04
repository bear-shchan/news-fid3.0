<template>
  <div>
    <!-- 筛选块 -->
    <div class="filter-box clearfix">
     <!--  <label class="main-filter" v-on:touchstart="autoRefresh">
        <span class="text">自动刷新</span>
        <input type="checkbox">
        <span class="box"></span>
      </label> -->
      <!-- 重要性单选框 -->
      <importance-radios></importance-radios>
    </div>

    <!-- Loading -->
    <!-- <list-loading :list-loaded="listLoaded"></list-loading> -->

    <!-- 列表项 -->
    <ul class="main-list"
      v-infinite-scroll="getEveryTime" 
      infinite-scroll-disabled="listBusy" 
      infinite-scroll-distance="10"
      infinite-scroll-immediate-check="false"
      >
      <li class="list-item" v-for="(item, index) in mainList" 
        @click="changeIntercept(index)">
        <div :class="'importance-' + item.featureObj.importance ">
          <p class="title">
            <span class="date">{{ item.releasedDateFormatHM }}</span>
            <span v-if="item.title != '' && item.title != '快讯'">
              【{{ item.title }}】
            </span>
            <span v-else>快讯</span>
          </p>
          <p class="description list-intercept" 
            :class="{'list-intercept-false' : !item.listIntercept}">
            {{ item.description }}
          </p>
          <!-- 标签 -->
          <template v-if="item.subjects != ' ' && item.subjects != undefined">
            <router-link class="subject-link" 
              :to="'everytimeTag/' + item.subjects"
              >
              #{{ item.subjects }}#
            </router-link>
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from 'moment'
// import ListLoading from '../components/ListLoading.vue'
import ImportanceRadios from '../components/ImportanceRadios.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    ImportanceRadios
    // ListLoading
  },
  data () {
    return {
      mainList: [],
      headerDate: '',
      apiOption: {
        'channelId': 6
      },
      firstRequest: true,
      refreshOption: {
        'bigReleasedDate': 1,
        'beginTimeLong': '',
        'order': 1,
        'channelId': 6
      },
      loadMoreOption: {
        'beginTimeLong': '',
        'channelId': 6
      },
      check: false,
      listLoaded: false,
      listBusy: false
    }
  },
  created () {
    this.getEveryTime(this.apiOption)
    this.REVERT_STATE()
  },
  methods: {
    ...mapActions(['REVERT_STATE', 'TOGGLE_LIST_BUSY']),
    ajax: function (Option, cb) {
      this.$http.get('/fidnews/v1/myAjax/getContentByTime', {
        params: Option
      })
      .then(data => {
        cb(data)
      })
    },
    getEveryTime: function (Option) {
      var vm = this
      vm.listBusy = true
      if (!this.firstRequest && !Option) {
        this.loadMoreOption.beginTimeLong = this.lastBeginTime
        this.ajax(this.loadMoreOption, callback)
      } else if (this.getImportance !== -1) {
        this.ajax(Option, callback)
      } else {
        this.ajax(Option, callback)
      }

      function callback (data) {
        var dataList = data.page.dataList
        // var msgDate = 0
        for (var i = 0, len = dataList.length; i < len; i++) {
          dataList[i].releasedDateFormatHM = moment(dataList[i].releasedDate).format('HH:mm')
          if (moment(dataList[i].releasedDate).format('M.D') < moment().format('M.D')) {
            dataList[i].releasedDateFormatHM = moment(dataList[i].releasedDate).format('MM.DD HH:mm')
          }
          dataList[i].listIntercept = true
        }
        if (!vm.firstRequest) {
          for (let i = 0, len = dataList.length; i < len; i++) {
            vm.mainList.push(dataList[i])
          }
        } else {
          vm.$set(vm, 'mainList', dataList)
          vm.firstRequest = false
        }
        vm.listBusy = false
      }
    },
    changeImportance: function (imp) {
      this.firstRequest = true
      if (this.apiOption.importance === imp || imp === -1) {
        this.checkedActive = -1
        delete this.apiOption.importance
        delete this.loadMoreOption.importance
        delete this.refreshOption.importance
        this.getEveryTime(this.apiOption)
        return
      }
      console.log(imp)
      this.apiOption.importance = imp
      this.refreshOption.importance = imp
      this.loadMoreOption.importance = imp
      this.getEveryTime(this.apiOption)
    },
    autoRefresh: function () {
      var vm = this
      vm.check = !vm.check
      clearInterval(vm.timer)
      function callback (data) {
        if (!data.page.totalCount) return
        let dataList = data.page.dataList
        let len = dataList.length
        for (let i = 0; i < len; i++) {
          // 2.0
          dataList[i].releasedDateFormatYMD = moment(dataList[i].releasedDate).format('YYYY-MM-DD')
          dataList[i].releasedDateFormatHM = moment(dataList[i].releasedDate).format('HH:mm')
          vm.mainList.unshift(dataList[i])
        }
      }
      function autoRefreshCb () {
        vm.refreshOption.beginTimeLong = vm.beginTime
        vm.ajax(vm.refreshOption, callback)
      }
      if (vm.check) {
        vm.timer = setInterval(autoRefreshCb, 10000)
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
  beforeDestroy () {
    // 销毁定时器(自动刷新)
    // this.time = false
    if (this.timer) {
      clearTimeout(this.timer)
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
  /*重要性列表颜色*/
.main-list .list-item .importance-2 .title,
.main-list .list-item .importance-2 .description{
  color: #e2666d;
}
.main-list .list-item .importance-3 .title{

}
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
