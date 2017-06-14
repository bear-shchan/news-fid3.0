<template>
  <div>
    <div class="calendar-list">
      <ul class="main-list">
        <li class="list-item" v-for="(item, index) in list">
          <p class="list-intercept-3" :class="{ 'list-intercept-false' : item.displayBtn }"
            @click="changeDisplay(index)">
            <span class="date">{{ item.meeting_dateFormat }}</span>【{{ item.company_name }}】 {{ item.message }}
          </p>
        </li>
      </ul>
    </div>
    <!-- 加载更多 -->
    <loadmore
      v-on:getData="getData"
      :loading="listBusy"
      :showLoading="pageNo !== 1"
      :done="done">
    </loadmore>
  </div>
</template>

<script>
import Loadmore from '@/components/Loadmore.vue'
import moment from 'moment'

export default {
  components: {
    Loadmore
  },
  data () {
    return {
      list: [],
      listBusy: false,
      pageNo: 1,
      done: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.listBusy = true
      this.$http.get('/fidnews/v1/calendarApp/holders_meeting', {
        params: {
          orderCol: 'meeting_date',
          orderSeq: 'asc',
          date_begin: moment().format('YYYY-MM-DD'),
          number: 15,
          pageNo: this.pageNo
        }
      })
      .then((data) => {
        if (data.number === 0) {
          this.done = true
          return
        }
        var list = data.data
        var len = list.length
        var i = 0
        for (; i < len; i++) {
          // 处理数据
          list[i].compare_date = moment(list[i].compare_date).format('MM-DD')
          list[i].displayBtn = false
          list[i].meeting_dateFormat = moment(list[i].meeting_date).format('MM-DD') // L12
        }
        if (this.pageNo !== 1) {
          var j = 0
          for (j; j < len; j++) {
            list[j].displayBtn = false
            this.list.push(list[j])
          }
        } else {
          this.$set(this, 'list', list)
        }
        this.pageNo++
        this.listBusy = false
      })
    },
    changeDisplay: function (b) {
      // console.log(this.list[b].displayBtn)
      if (this.list[b].displayBtn === true) {
        this.list[b].displayBtn = false
      } else {
        this.list[b].displayBtn = true
      }
    }
  }
}
</script>

<style scoped>
.main-list{
  font-size: 16px;
  line-height: 23px;
  padding: 0 0.4rem;
  color: #2e2e37;
}
.list-item{
  border-bottom: 1px solid #ececec;
  padding: 0.53rem 0;
}
.date{
  color: #e2666d;
}
</style>
