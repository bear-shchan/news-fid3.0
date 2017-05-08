<template>
  <div class="box">
    <router-link class="list" to="/newbieFinanceSecond/基础名词/2"  v-for="item in listArr"
      key="item.id">
      <div class="topic">
        <div class="text">
          <p class="name"> {{ item.topicName }}</p>
          <p class="descri">{{ item.introduction }}</p>
        </div>
        <img :src="item.topicImageUrl">
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: '',
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
      this.$http.get('/fidnews/v1/geek/v3/queryHotTopicListIncludeBellwetherStock', {
        params: {
          user: 'geek',
          queryOther: 1,
          key: '4c039f2967c4d93e9674ffb037724187'
        }
      })
      .then((res) => {
        let stockWindCodeArr = []
        for (var i = 0; i < res.data.length; i++) {
          for (var j = 0; j < res.data[i].bellwetherStockList.length; j++) {
            stockWindCodeArr.push(res.data[i].bellwetherStockList[j].stockWindCode)
          }
        }
        let listArr = res.data
        this.getStockPercent(stockWindCodeArr, listArr)
      })
    },
    getStockPercent (stockWindCodeArr, listArr) {
      this.$http.get('/fidnews/v1/geek/v2/getStockInfoByOtherInterface', {
        params: {
          stockCodes: stockWindCodeArr.join()
        }
      })
      .then((res) => {
        let percentData = []
        for (var k = 0; k < res.data.length; k++) {
          percentData[res.data[k].symbol + '.' + res.data[k].type] = res.data[k].percent
        }
        for (var i = 0; i < listArr.length; i++) {
          for (var j = 0; j < listArr[i].bellwetherStockList.length; j++) {
            listArr[i].bellwetherStockList[j].percent = ((percentData[listArr[i].bellwetherStockList[j].stockWindCode]) * 100).toFixed(2)
          }
        }
        this.listArr = listArr
      })
    }
  }
}
</script>

<style scoped>
  .box {
    padding-left: 0.4rem;
    padding-right: 0.4rem;
  }
  .list {
    width: 100%;
    display: inline-block;
  }
  .topic {
    display: flex;
    padding-top: 0.53rem;
    padding-bottom: 0.53rem;
    border-bottom: 1px solid #ececec;
  }
  .text {
    flex-grow: 1;
  }
  .topic img {
    width: 3.07rem;
    height: 2.35rem;
    margin-left: 0.27rem;
  }
  .name {
    font-size: 17px;
    color: #2e2e37;
    margin-top: -0.08rem;
  }
  .descri {
    font-size: 14px;
    color: #83839d;
  }
</style>
