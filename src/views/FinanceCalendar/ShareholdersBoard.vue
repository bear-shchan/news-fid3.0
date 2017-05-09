<template>
  <div>
    <div class="calendar-list"
      v-infinite-scroll="getData"
      infinite-scroll-disabled="listBusy" 
      infinite-scroll-distance="100"
      infinite-scroll-immediate-check="false">
      <ul class="main-list">
        <li class="list-item" v-for="(item, index) in list">
          <p class=" line-clamp" :class="{ 'display-show' : item.displayBtn }"
            @click="changeDisplay(index)">
            <span class="date">{{ item.meeting_dateFormat }}</span>【{{ item.company_name }}】 {{ item.message }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      list: [],
      listBusy: false,
      pageNo: 1
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
        this.listBusy = false
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
          this.pageNo++
          return
        }
        this.pageNo++
        this.$set(this, 'list', list)
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
