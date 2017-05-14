<template>
  <div class="box">
    <router-link :to="'/SubjectTrackDetail/' + item.id" class="list" v-for="item in listArr" :key="item.id">
      <div class="topic layout-box">
        <img :src="item.topicImageUrl">
        <div class="box-col">
          <p class="name"> {{ item.topicName }}</p>
          <p class="descri">{{ item.introduction }}</p>
        </div>
      </div>
      <div class="longtou">
        <ul>
          <li v-for="stock in item.bellwetherStockList">
            <span class="tou">龙头</span>
            <span class="sotck">{{ stock.stockName }}</span>
            <span v-if="stock.percent > 0" class="sotck red" >+{{ stock.percent }}</span>
            <span v-else-if="stock.percent == 0" class="sotck gray" >{{ stock.percent }}</span>
            <span v-else class="sotck green" >{{ stock.percent }}</span>
          </li>
        </ul>
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
    padding: 0.27rem 0.2rem;
    background-color: #f7f7f7;
  }
  .list {
    width: 100%;
    background-color: #fff;
    display: inline-block;
    margin-bottom: 0.27rem;
  }
  .topic img {
    width: 1.6rem;
    height: 1.6rem;
    margin-left: 0.27rem;
    margin-top: 0.23rem;
    margin-right: 0.53rem;
  }
  .name {
    font-size: 17px;
    color: #1a1a1a;
    margin-top: 0.09rem;
    
  }
  .descri {
    font-size: 12px;
    color: #6a6a6a;
  }
  .longtou {
    margin-left: 2.4rem;
    margin-top: 0.09rem;
    margin-bottom: 0.19rem;
  }
  .longtou ul li {
    float: left;
    margin-bottom: 0.19rem;
    padding-right: 0.2rem;
  }
  .tou {
    width: 0.87rem;
    height: 0.35rem;
    font-size: 12px;
    color: #fff;
    padding: 0 0.08rem;
    margin-bottom: 0.27rem;
    background-color: #f35b6a;
    text-align: center;
    border-radius: 0.05rem;
  }
  .sotck {
    font-size: 12px;
    color: #191919;
    padding-left: 0.13rem;  
  }
  .percent {
    font-size: 12px;
    padding-left: 0.29rem;
  }
  .red {
    color: #ff737b;
  }
  .green {
    color: #4a9a69;
  }
  .gray{
    color:#999;
  }
</style>
