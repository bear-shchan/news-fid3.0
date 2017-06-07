<template>
  <div>
    <div class="calendar-list">
      <div class="list-item layout-box"
        v-for="(item, index) in list"
        @click="gotoDetail(item.id)"
        >
          <div class="date" v-if="item.show_date_b">
            {{ item.showDate }}
          </div>
          <div class="date" v-else>
          </div>
          <ul class="text box-col">
            <li>
              <p class="title">
                {{ item.country }}
                <span class="fr">{{item.showTime}}</span>
              </p>
              <p class="desc">
                {{ item.item }}
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
    ...mapActions(['SET_CALENDAR_ITEM']),
    getData () {
      this.listBusy = true
      this.$http.get('/fidnews/v1/calendar/economic_datas', {
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
          list[i].showDate = (list[i].show_date).split(' ')[0].split('-')[1] + '-' + (list[i].show_date).split(' ')[0].split('-')[2]
          if (beforeTime === list[i].showDate) {
            list[i].show_date_b = false
          } else {
            list[i].show_date_b = true
          }
          beforeTime = list[i].showDate
          //
          list[i].showTime = (list[i].show_date).split(' ')[1].substr(0, 5)
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
          vm.list[i].description_paraphrase = vm.list[i].description.split('： ')[1].split('主指标关注原因')
          vm.list[i].description_reason = vm.list[i].description.split('： ')[2]
          console.log(vm.list[i].description_reason)
          vm.SET_CALENDAR_ITEM(vm.list[i])
          // router.push('dataDetail')
          this.$router.push('dataDetail')
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
  color: #2e2e37;
}
.list-item .date{
  text-indent: 0.4rem;
  width: 2.0rem;
}
.list-item .text{
  border-bottom: 1px solid #ececec;
  padding-bottom: 0.53rem;
}

.title{
  padding-right: 0.4rem;
  font-size: 12px;
  color: #66667a;
}
.desc{
  width: 90%;
  line-height: 23px;
}
</style>
