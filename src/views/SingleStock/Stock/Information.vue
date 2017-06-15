<template>
  <div>
    <ul class="main-list">
      <li class="list-item" v-for="(item, index) in mainList" 
        @click="changeIntercept(index)">
        <div :class="'importance-' + item.importance ">
          <p class="title">
            <span v-if="item.title != '' && item.title != '快讯'">
              {{ item.title }}
            </span>
            <span v-else>快讯</span>
          </p>
          <p class="description list-intercept" 
            :class="{'list-intercept-false' : !item.listIntercept}">
            {{ item.content }}
          </p>
          <div class="message-index">
            <!-- 标签 -->
            <template v-if="item.subject != ' ' && item.subject != undefined">
              <router-link tag="span" class="subject-link" 
                :to="'/everytimeTag/' + item.subject"
                >
                #{{ item.subject }}#
              </router-link>
            </template>
            <!-- 笑脸 -->
            <span v-if="item.liduolikong && item.liduolikong.data"
              @click="gotoDetail(item.liduolikong.data[0])">
              <img class="icon" :src="item.liduolikong.icon"><span class="text">
              {{item.liduolikong.data[0].name}}</span>
            </span>
            <span class="date">{{ item.releaseTime | moment('MM-DD HH:mm') }}</span>
          </div>
        </div>
      </li>
    </ul>
    <!-- 加载更多 -->
    <loadmore
      v-on:getData="getMain"
      :loading="listBusy"
      :showLoading="option.pageNo !== 1">
    </loadmore>
    <!-- 无消息展示板块 -->
    <no-data-img text="暂无相关资讯"
      :show="!mainList[0] && !listBusy">
      <img class="no-data-img" src="../../../assets/img/no-information.png">
    </no-data-img>
  </div>
</template>

<script>
import NoDataImg from '../components/NoDataImg'
import Loadmore from '@/components/Loadmore.vue'

export default {
  components: {
    NoDataImg,
    Loadmore
  },
  data () {
    return {
      mainList: [],
      option: {
        pageNo: 1,
        pageSize: 15,
        stockId: this.$route.params.tagName
      },
      listBusy: false,
      icon: {
        '0': require('@/assets/img/likong@2x.png'),
        '1': require('@/assets/img/liduo@2x.png'),
        '2': require('@/assets/img/lizhong.png')
      }
    }
  },
  created () {
    this.getMain()
  },
  methods: {
    getMain () {
      this.listBusy = true
      this.$http.get('/fidnews/v1/geek/v2/stockInfo', {
        params: this.option
      })
      .then(data => {
        this.listBusy = false
        data = data.data.information.data
        let list = data.map((item) => {
          item.listIntercept = true
          if (item.liduolikong && item.liduolikong.data) {
            let type = item.liduolikong.type
            item.liduolikong.icon = this.icon[type]
          }
          return item
        })
        if (this.option.pageNo === 1) {
          this.$set(this, 'mainList', list)
        } else {
          for (let i = 0, len = list.length; i < len; i++) {
            this.mainList.push(list[i])
          }
        }
        this.option.pageNo++
      })
    },
    changeIntercept (b) {
      this.mainList[b].listIntercept = !this.mainList[b].listIntercept
    },
    gotoDetail (item) {
      if (item.id.indexOf('S') !== -1) {
        this.$router.push('/singleStockDetail/information/' + item.id)
      } else {
        this.$router.push('/subjectTrackDetail/' + item.id)
      }
    }
  }
}
</script>

<style scoped>
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
  font-size: 14px;
  color: #4c4c4c;
  float: right;
  margin-top: 8px;
}
.main-list .list-item .description{
  font-size: 14px;
  line-height: 20px;
  color: #83839d;
  padding-top: 4px;
}
.main-list .list-item .subject-link{
  font-size: 14px;
  line-height: 16px;
  color: #4694f4;
}
.list-item .message-index{
  line-height: 0;
  margin-top: 0.27rem;
  min-height: 0.4rem;
}
.list-item .message-index .icon{
  width: 0.4rem;
  height: 0.4rem;
  margin-right: 0.13rem;
  vertical-align: middle;
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
  vertical-align: middle;
}

  /*重要性列表颜色*/
.main-list .list-item .importance-2 .title,
.main-list .list-item .importance-2 .description{
  color: #e2666d;
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
