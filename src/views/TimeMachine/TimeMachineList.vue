<template>
  <div class="box">
    <ul class="list">
      <router-link tag="li" class="list-item"
        :to="'/timeMachineDetail/radar/' + item.id"
        v-for="item in list"
        key="item.ssid">
        <p>
          <span class="name">{{item.stockName}}</span>
          <span class="data"
            v-show="typeof item._price === 'number'"
            :class="[{'red' : item._price > 0}, {'green' : item._price < 0}]">
            {{item._price | toFixed}}
          </span>
        </p>
        <p>
          <i class="icon-face"></i>
          <span class="date">{{item.releasedDate | contrastDate}}</span>
        </p>
        <div class="gray-box">
          <template v-if="item.digest">
            <i class="gray-box-icon gray-icon-radar"></i>
            <span>{{item.digest}}</span>
          </template>
          <div v-else
            class="list-intercept-3">
            <i class="gray-box-icon gray-icon-information"></i>
            <span>{{item.content}}</span>
          </div>
        </div>
        <div class="strategy">
          <span class="strategy-text">{{item.conceptName}}</span>
        </div>
      </router-link>
    </ul>
    <!-- 加载更多 -->
    <loadmore
      v-on:getData="getData"
      :loading="listBusy"
      :showLoading="!firstRequest">
    </loadmore>
  </div>
</template>

<script>
import {getPercent} from '@/api'
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
      firstRequest: true,
      lastTime: ''
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.listBusy = true
      this.$http.get('/fidnews/v1/geek/v2/getMsgChooseStockList', {
        params: {
          size: 20,
          lastTime: this.lastTime
        }
      })
      .then(res => {
        if (this.firstRequest) {
          this.firstRequest = false
        }
        let list = res.data
        this.$set(this, 'list', this.list.concat(list))
        this.lastTime = list[list.length - 1].releasedDate
        this.listBusy = false
        this.getPercent()
      })
    },
    getPercent () {
      let stockCodesStr = ''
      this.list.map(i => {
        stockCodesStr += `,${i.stockWindCode}`
      })
      stockCodesStr = stockCodesStr.substr(1, stockCodesStr.length)
      getPercent(stockCodesStr)
      .then(data => {
        let list = this.list.map((i) => {
          i._price = (function () {
            let percent = ''
            data.map(j => {
              if (i.stockCode === j.symbol) {
                percent = j.percent
              }
            })
            return percent
          })()
          return i
        })
        this.$set(this, 'list', list)
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
  color: #606060;
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
.gray-icon-information {
  background: url(../../assets/img/icon-information.png);  
}
.gray-icon-radar {
  background: url(../../assets/img/icon-radar.png);  
}
.gray-box-icon{
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

.red{color: #f35b6a;}
.green{color: #199d64;}
</style>
