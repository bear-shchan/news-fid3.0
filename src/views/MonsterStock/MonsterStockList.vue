<template>
  <div class="box">
    <template v-for="item in list">
      <div class="date-box">
        <i class="yellow-line"></i>
        <span class="date">{{ item.releaseTime | moment('YYYY-MM-DD') }}</span>
      </div>
      <ul class="list">
        <router-link tag="li" 
          class="list-item"
          v-for="i in item.stocks"
          :to="'/monsterStockDetail/' + i.id"
          key="i.id">
          <img class="img" :src="typeObj[i.type].icon">
          <div class="title-box dib">
            <p class="type">{{ typeObj[i.type].text }}</p>
            <p class="name">{{ i.stockName }}</p>
          </div>
          <p class="content dib" v-html="i.contentHtml"></p>
        </router-link>
      </ul>
    </template>
    <!-- 加载更多 -->
    <loadmore
      v-on:getData="getList"
      :loading="loading"
      :showLoading="this.pageNo !== 1"
      :done="done">
    </loadmore>
  </div>
</template>

<script>
import Loadmore from '@/components/Loadmore.vue'

export default {
  components: {
    Loadmore
  },
  data () {
    return {
      list: [],
      pageNo: 1,
      loading: false,
      done: false,
      typeObj: {
        '0': {
          text: '天地一号'
        },
        '1': {
          text: '五日最强'
        },
        '2': {
          text: '妖之红三兵'
        },
        '3': {
          text: '牛魔王'
        },
        '4': {
          text: '黑天鹅'
        },
        '5': {
          text: '壳资源大战'
        },
        '6': {
          text: '月度小红花'
        },
        '7': {
          text: '人气爆棚'
        },
        '8': {
          text: '上上签'
        },
        '9': {
          text: '最妖送转'
        },
        '10': {
          text: '龙虎之气'
        },
        '11': {
          text: '金蛋壳'
        }
      }
    }
  },
  created () {
    this.formatTypeObj()
    this.getList()
  },
  methods: {
    formatTypeObj () {
      for (var i in this.typeObj) {
        this.typeObj[i].icon = require(`../../assets/img/monster-list-icon${Number(i)}.png`)
      }
    },
    getList () {
      this.loading = true
      this.$http.get('/fidnews/v1/geek/v3/listMonsterStock', {
        params: {
          startPage: this.pageNo,
          pageSize: 10
        }
      })
      .then((res) => {
        const data = res.data
        if (res.num === 0) {
          this.done = true
          return
        }
        let list = data.map(i => {
          i.stocks.map(i => {
            i.contentHtml = (function (content) {
              let str = content.replace(/\d+\.\d+%|\d+%|\d+/g, function (v) {
                return `<i>${v}</i>`
              })
              return str
            })(i.content)
            return i
          })
          return i
        })
        // console.log(list)
        this.$set(this, 'list', this.list.concat(list))
        this.pageNo++
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
.dib{
  display: inline-block;
}

.box{
  background: #f5f5f5;
}
.date-box{
  padding-left: 0.4267rem;
  padding-top: 0.1333rem;
  padding-bottom: 0.1333rem;
  font-size: 16px;
}
.date-box .date{
  vertical-align: text-bottom;
}
.yellow-line{
  display: inline-block;
  height: 18px;
  width: 0.1333rem;
  background: #f4ce46;
  margin-right: 0.2133rem;
}

.list{
  margin-left: 0.2rem;
  margin-right: 0.2rem;
  margin-bottom: 0.2rem;
  border-radius: 3px;
  background-color: #fff;
}
.list-item{
  padding-left: 0.2667rem;
  padding-right: 0.4rem;
  padding-top: 0.3733rem;
  padding-bottom: 0.3733rem;
  position: relative;
}
.list-item + .list-item{
  border-top: 1px solid #e6e6e6;
}
.img{
  width: 0.72rem;
  height: 0.8rem;
  margin-right: 0.2667rem;
}
.title-box{
  /*margin-right: 0.5333rem;*/
  width: 2.2667rem;
}
.type{
  font-size: 12px;
  color: #f35b6a;
}
.name{
  font-size: 16px;
  line-height: 23px;
  color: #181818;
}
.content{
  position: absolute;
  left: 3.6133rem;
  font-size: 14px;
  color: #6b6b6b;
}
</style>
