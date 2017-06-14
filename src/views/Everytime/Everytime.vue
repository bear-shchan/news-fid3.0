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
            <span class="date">{{ item.releasedDateFormatHM }}</span>
            <span v-if="item.title != '' && item.title != '快讯'">
              {{ item.title }}
            </span>
            <span v-else>快讯</span>
          </p>
          <p class="description list-intercept" 
            :class="{'list-intercept-false' : !item.listIntercept}">
            {{ item.content }}
          </p>
          <!-- 标签 -->
          <template v-if="item.subject != ' ' && item.subject != undefined">
            <router-link class="subject-link" 
              :to="'everytimeTag/' + item.subject"
              >
              #{{ item.subject }}#
            </router-link>
          </template>
          <!-- 笑脸 -->
          <template v-if="item.liduolikong">
            <div class="message-index" v-if="item.liduolikong.data">
              <span @click="gotoDetail(item.liduolikong.data[0])">
                <img class="icon" :src="item.liduolikong.icon"><span class="text">
                {{item.liduolikong.data[0].name}}</span>
              </span>
            </div>
          </template>
        </div>
      </li>
    </ul>
    <!-- 加载更多 -->
    <loadmore
      v-on:getData="getEveryTime"
      :loading="listBusy"
      :showLoading="option.pageNo !== 1">
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
  },
  data () {
    return {
      mainList: [],
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
        pageNo: 1,
        pageSize: 15
      },
      check: false,
      listLoaded: false,
      listBusy: false,
      icon: {
        '0': 'likong@2x',
        '1': 'liduo@2x',
        '2': 'lizhong'
      }
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
      // if (this.$route.params.tagName) {
      //   this.option.subjects = this.$route.params.tagName
      // }
      this.$http.get('/fidnews/v1/geek/v1/hybridInfo', {
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
        var list = data.data
        // var msgDate = 0
        for (var i = 0, len = list.length; i < len; i++) {
          list[i].releasedDateFormatHM = moment(list[i].releaseTime).format('HH:mm')
          if (moment(list[i].releaseTime).format('M.D') < moment().format('M.D')) {
            list[i].releasedDateFormatHM = moment(list[i].releaseTime).format('MM.DD HH:mm')
          }
          list[i].listIntercept = true
          // format liduolikong icon
          if (list[i].liduolikong && list[i].liduolikong.data) {
            let type = list[i].liduolikong.type
            let icon = vm.icon[type]
            list[i].liduolikong.icon = require('@/assets/img/' + icon + '.png')
          }
        }
        if (vm.option.pageNo === 1) {
          vm.$set(vm, 'mainList', list)
        } else {
          for (let i = 0, len = list.length; i < len; i++) {
            vm.mainList.push(list[i])
          }
        }
        vm.option.pageNo++
        vm.listBusy = false
      }
    },
    gotoDetail (item) {
      if (item.id.indexOf('S') !== -1) {
        this.$router.push('/singleStockDetail/information/' + item.id)
      } else {
        this.$router.push('/subjectTrackDetail/' + item.id)
      }
    },
    // changeImportance: function (imp) {
    //   this.option.pageNo = 1
    //   if (this.apiOption.importance === imp || imp === -1) {
    //     this.checkedActive = -1
    //     delete this.apiOption.importance
    //     delete this.loadMoreOption.importance
    //     delete this.refreshOption.importance
    //     this.getEveryTime(this.apiOption)
    //     return
    //   }
    //   console.log(imp)
    //   this.apiOption.importance = imp
    //   this.refreshOption.importance = imp
    //   this.loadMoreOption.importance = imp
    //   this.getEveryTime(this.apiOption)
    // },
    // autoRefresh: function () {
    //   var vm = this
    //   vm.check = !vm.check
    //   clearInterval(vm.timer)
    //   function callback (data) {
    //     if (!data.page.totalCount) return
    //     let list = data.page.list
    //     let len = list.length
    //     for (let i = 0; i < len; i++) {
    //       // 2.0
    //       list[i].releasedDateFormatYMD = moment(list[i].releasedDate).format('YYYY-MM-DD')
    //       list[i].releasedDateFormatHM = moment(list[i].releasedDate).format('HH:mm')
    //       vm.mainList.unshift(list[i])
    //     }
    //   }
    //   function autoRefreshCb () {
    //     vm.refreshOption.beginTimeLong = vm.beginTime
    //     vm.ajax(vm.refreshOption, callback)
    //   }
    //   if (vm.check) {
    //     vm.timer = setInterval(autoRefreshCb, 10000)
    //   }
    // },
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
  line-height: 0;
  margin-top: 0.27rem;
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
