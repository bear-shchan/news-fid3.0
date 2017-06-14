<template>
  <div>
    <!-- 列表项 -->
    <ul class="main-list">
      <li class="list-item" v-for="(item, index) in mainList" @click="goToDetail(item)">
        <div>
          <p class="title fwb" v-if="item.title != '' && item.title != '快讯'">
            {{ item.title }}
          </p>
          <span :class="'importance-' + item.importance || item.featureObj.importance ">
            <p class="description list-intercept"
            :class="{ 'list-intercept-false' : item.listIntercept }"
            @click="changeIntercept(index)" >
              {{ item.description }}
            </p>
          </span>
        </div>
        <p class="date" v-if="contrastDate(item.releasedDate)">
          {{ item.releasedDate | moment('HH:mm') }}
        </p>
        <!--<p class="date" v-else-if="item.time">
          {{ item.time | moment('MM.DD HH:mm') }}
        </p>-->
        <p class="date" v-else>
          {{ item.releasedDate | moment('MM.DD HH:mm') }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
    }
  },
  props: {
    mainList: {
      type: Array,
      required: true
    },
    lisgType: String,
    linkPath: String
  },
  methods: {
    contrastDate (date) {
      if (moment(date).format('M.D') < moment().format('M.D')) {
        return false
      } else {
        return true
      }
    },
    changeIntercept (b) {
      if (this.lisgType === 'link') return
      this.mainList[b].listIntercept = !this.mainList[b].listIntercept
    },
    goToDetail (item) {
      if (this.lisgType !== 'link') return
      this.$router.push({ path: this.linkPath + item.id })
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
.main-list .list-item:last-child{
  padding-bottom: .07rem;
}
.main-list .list-item .title{
  line-height: 23px;
  font-size: 16px;
  color: #2e2e37;
}
.main-list .list-item .description{
  margin-top: 4px;
  line-height: 20px;
  font-size: 14px;
  color: #83839d;
}
.main-list .list-item .date{
  text-align: right;
  font-size: 14px;
  line-height: 24px;
  color: #83839d;
}
.main-list .list-item .importance-2 .description{
  color: #e2666d;
}
.main-list .list-item .importance-3 .description{
  color: #e2666d;
  font-weight: bold;
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
