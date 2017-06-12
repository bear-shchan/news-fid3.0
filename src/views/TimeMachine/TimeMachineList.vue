<template>
  <div class="box">
    <ul class="list">
      <router-link tag="li" class="list-item"
<<<<<<< HEAD
        :to="'/timeMachineDetail/radar/' + item.ssId"
        v-for="item in list">
=======
        :to="'/timeMachineDetail/' + item.ssId"
        v-for="item in list"
        key="item.ssid">
>>>>>>> d44532042f49d12472d12a3a68be66daa07dbb35
        <p>
          <span class="name">{{item.referStockName}}</span>
          <span class="data">0.25%</span>
        </p>
        <p>
          <i class="icon-face"></i>
          <span class="date">{{item.releasedDate | contrastDate}}</span>
        </p>
        <div class="gray-box">
          <i class="gray-box-icon"></i>
          <span>{{item.content}}</span>
        </div>
        <div class="strategy">
          <span class="strategy-text">{{item.strategyName}}</span>
        </div>
      </router-link>
    </ul>
    <!-- 加载更多 -->
    <loadmore
      v-on:getData="getData"
      :loading="listBusy"
      :showLoading="pageNum !== 1">
    </loadmore>
  </div>
</template>

<script>
import Loadmore from '@/components/Loadmore'
export default {
  components: {
    Loadmore
  },
  data () {
    return {
      list: [],
      listBusy: false,
      done: false,
      pageNum: 1
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$http.get('/fidnews/v1/geek/v6/eventDrive/paging', {
        params: {
          pageSize: 20,
          pageNum: this.pageNum
        }
      })
      .then(res => {
        let list = res.eventDrive
        this.$set(this, 'list', this.list.concat(list))
        this.pageNum++
        this.listBusy = false
      })
    }
  }
}
</script>

<style scoped>
.box{
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding-top: 0.2667rem;
  background: #f5f5f5;
}
.list-item{
  position: relative;
  border-radius: 5px;
  background: #fff;
  padding-top: 0.2667rem;
  padding-bottom: 0.2667rem;
  padding-left: 0.3333rem;
  padding-right: 0.3333rem;
  margin-bottom: 0.2667rem;
}
.name{
  font-size: 18px;
}
.data{
  font-size: 16px;
  color: #fe5555;
}
.icon-face{
  display: inline-block;
  background: url(../../assets/img/liduo@2x.png);
  background-size: 13px;
  width: 13px;
  height: 13px;
  vertical-align: middle;
}
.date{
  font-size: 12px;
  color: #8a8a8a;
  vertical-align: middle;
}
.gray-box{
  border-radius: 5px;
  background: #f5f5f5;
  margin-top: 0.2667rem;
  padding: 0.2667rem;
  font-size: 14px;
  color: #515151;
}
.gray-box-icon{
  background: url(../../assets/img/icon-information.png);
  background-size: contain;
  background-repeat: no-repeat;
  vertical-align: middle;
  width: 15px;
  height: 15px;
  display: inline-block;
}
.strategy{
  background: url(../../assets/img/strategy-bg.png);
  background-repeat: no-repeat;
  background-size: contain;
  text-align: center;
  position: absolute;
  top: 20px;
  right: 0;
  margin-right: -0.1867rem;
  font-size: 15px;
  line-height: 15px;
  color: #fff;
  width: 80px;
  height: 30px;
  padding-top: 5px;
}
</style>
