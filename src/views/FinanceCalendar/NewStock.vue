<template>
  <div>
    <div class="calendar-list">
      <div class="list-item layout-box"
        v-for="(item, index) in list"
        @click="gotoDetail(item.id)"
        >
          <div class="date" v-if="item.stop_date_b">
            {{ item.stop_dateFormat }}
          </div>
          <div class="date" v-else>
          </div>
          <ul class="text box-col">
            <li>
              {{ item.stock_name }}【{{ item.stock_code }}】
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
      this.$http.get('/fidnews/v1/calendar/new_stocks', {
        params: {
          size: 15,
          pageNo: this.pageNo
        }
      })
      .then((data) => {
        if (data.num === 0) {
          this.done = true
          return
        }
        var list = data.data
        var len = list.length
        var i = 0
        var beforeTime = ''
        for (; i < len; i++) {
          // 处理数据
          list[i].compare_date = moment(list[i].purchase_date).format('MM-DD')
          if (beforeTime === list[i].compare_date) {
            list[i].stop_date_b = false
          } else {
            list[i].stop_date_b = true
          }
          beforeTime = list[i].compare_date

          // 2.0
          list[i].stop_dateFormat = moment(list[i].purchase_date).format('MM-DD')
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
