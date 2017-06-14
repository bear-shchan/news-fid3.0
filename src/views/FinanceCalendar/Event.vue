<template>
  <div>
    <div class="calendar-list">
      <div class="list-item layout-box"
        v-for="(item, index) in list"
        @click="gotoDetail(item.id)"
        >
          <div class="date" v-if="item.show_date_b">
            {{ item.show_date }}
          </div>
          <div class="date" v-else>
          </div>
          <ul class="text box-col">
            <li>
              <p class="tt">
                {{ item.events }}
                <a class="concept" v-if="item.concept">{{ item.concept }}</a>
              </p>
            </li>
          </ul>
      </div>
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
import moment from 'moment'
import Loadmore from '@/components/Loadmore.vue'

import { mapActions } from 'vuex'

export default {
  name: 'event',
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
    ...mapActions(['SET_EVENT_ITEM']),
    getData () {
      this.listBusy = true
      let dateBegin = moment().format('YYYY-MM-DD') + ' 00:00:00'
      this.$http.get('/fidnews/v1/calendarApp/event', {
        params: {
          orderSeq: 'asc',
          orderCol: 'released_date',
          number: 15,
          pageNo: this.pageNo,
          date_begin: dateBegin
        }
      })
      .then((data) => {
        var list = data.data
        if (data.number === 0) {
          this.done = true
          return
        }
        var len = list.length
        var i = 0
        var beforeTime = ''
        for (; i < len; i++) {
          // 处理数据
          list[i].show_date = (list[i].show_date).split(' ')[0].split('-')[1] + '-' + (list[i].show_date).split(' ')[0].split('-')[2]
          list[i].concept = list[i].concept.split('•')[1]
          if (beforeTime === list[i].show_date) {
            list[i].show_date_b = false
          } else {
            list[i].show_date_b = true
          }
          beforeTime = list[i].show_date
          // console.log(list[i].show_date_b)
        }
        if (this.pageNo !== 1) {
          var j = 0
          for (j; j < len; j++) {
            this.list.push(list[j])
          }
        } else {
          this.$set(this, 'list', list)
        }
        this.pageNo++
        this.listBusy = false
      })
    },
    gotoDetail (id) {
      var vm = this
      var i = 0
      var len = this.list.length
      for (; i < len; i++) {
        if (vm.list[i].id === id) {
          vm.SET_EVENT_ITEM(vm.list[i])
          this.$router.push('eventDetail')
          return
        }
      }
    }
  }
}
</script>

<style scoped>
.list-item{
  position: relative;
  padding-top: 0.53rem;
  font-size: 16px;
}
.list-item .date{
  text-indent: 0.4rem;
  width: 2.0rem;
}
.list-item .text{
  border-bottom: 1px solid #ececec;
  padding-bottom: 0.53rem;
}
.list-item .tt{
  width: 72%;
}
.concept{
  position: absolute;
  right: 0.4rem;
  top: 0.67rem;
  padding: 0 0.13rem;
  font-size: 10px;
  background-color: #f4ce46;
  line-height: 18px;
}
</style>
