<template>
  <div class="box">
    <div class="clearfix">
      <router-link tag="div" :to="'/fundamentalDetail/' + item.id" 
        v-for="item in listArr" class="item" :class="{gray: item.gray}" key="item.latestTime">
        <p class="topic">{{item.name}}({{item.stockCount}})</p>
        <p class="time">{{item.descriptionList}}</p>
        <p class="title list-intercept-2">{{item.regulation}}</p>
        <p class="date"
          :class="[{'red' : item._price > 0}, {'green' : item._price < 0}]"
          @click.stop="gotoSingleStockDetail(item.newStockWindCode)">
          {{item.newStockName}}
          <span v-if="typeof item._price === 'number'">{{item._price | toFixed}}</span>
        </p>
      </router-link>
    </div>
  </div>
</template>

<script>
import {getPercent} from '@/api'

export default {
  data () {
    return {
      listArr: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.$http.get('/fidnews/v1/geek/v2/getCompanyTemperamentList')
      .then((res) => {
        let data = res.data
        // set
        this.$set(this, 'listArr', this.listArr.concat(data))
        this.getPrice()
      })
    },
    getPrice () {
      let stockCodesStr = ''
      this.listArr.map(i => {
        stockCodesStr += `,${i.newStockWindCode}`
      })
      stockCodesStr = stockCodesStr.substr(1, stockCodesStr.length)
      // console.log(stockCodesStr)
      getPercent(stockCodesStr)
      .then(data => {
        let list = this.listArr.map((i) => {
          i._price = (function () {
            let percent = ''
            data.map(j => {
              if (i.newStockCode === j.symbol) {
                percent = j.percent
              }
            })
            return percent
          })()
          return i
        })
        this.$set(this, 'listArr', list)
      })
    },
    gotoSingleStockDetail (windCode) {
      this.$router.push('singleStockDetail/information/' + windCode)
    }
  }
}
</script>

<style scoped>
.box{
  padding-top: 0.43rem;
  padding-bottom: 0.43rem;
  padding-left: 0.64rem;
  padding-right: 0.64rem;
  background-color: #f5f5f5;
}
.item{
  position: relative;
  float: left;
  width: 42%;
  height: 4.37rem;
  background-color: #fff;
  border-radius: 0.11rem;
  padding-top: 0.67rem;
  /*padding-bottom: 0.53rem;*/
  padding-left: 3%;
  padding-right: 3%;
  text-align: center;
  margin-right: 4%;
  margin-bottom: 0.32rem;
}
.item:nth-child(2n){
  margin-right: 0;
}
.topic{
  font-size: 15px;
  line-height: 15px;
  border-bottom: 1px solid #e2e2e2;
  padding-bottom: 0.35rem;
  color: #4e4e4e;
}
.time{
  font-size: 16px;
  line-height: 16px;
  margin-top: 0.35rem;
  margin-bottom: 0.43rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.title{
  font-size: 12px;
  color: #606060;
}
.date{
  font-size: 12px;
  position: absolute;
  bottom: 0.4rem;
  left: 50%;
  transform: translate(-50%);
  color: #606060;
  white-space: nowrap;
}

.red{color: #f35b6a;}
.green{color: #199d64;}

.gray .date,
.gray .topic,
.gray .title,
.gray .time{
  color: #999;
}
</style>
