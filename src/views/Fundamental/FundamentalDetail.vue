<template>
  <div>
    <header class="b-head">
      <ul class="b-stock">
        <li class="b-stockname">{{ data.name }}</li>
        <li class="b-stocknews">{{ data.description }}
        </li>
        <li class="b-shuoming">
          <a :href="data.explainUrl" class="shuoming" v-if="data.explainUrl">
            <img src="../../assets/img/shuoming@2x.png">
          </a>
        </li>
      </ul>
    </header>
    <div class="stock-num">
      入选股票<span>{{ data.stockCount }} 支</span>
    </div>
    <div class="fundamental">
      <div class="b-txt1">基本面</div>
      <ul class="b-income">
          <li v-for="item in data.regulation">
            {{ item }}
          </li>
      </ul>
    </div>
    <div id="stocks">
      <div  class="bar">
        <ul>
          <li>股票/代码</li>
          <li>最新</li>
          <li>涨跌幅</li>
        </ul>
      </div>
      <div class="content">
        <ul class="byDate" style="border-bottom: 2px solid #f7f7f7;">
          <router-link :to="'/singleStockDetail/information/' + item.code" v-for="item in listBydate" :key="item.code">
            <li class="contentlist">
              <a class="name" href="javascript:void(0);">
                <span class="stockname">{{ item.name }}</span><br>
                <span class="code">{{ code(item.code) }}</span>
              </a>
              <a class="new" href="javascript:void(0);"  v-stock-color="item.zdf">{{ item.zxj }}</a>
              <a class="percent" href="javascript:void(0);"  v-stock-color="item.zdf">{{ item.zdf | toFixed }}</a>
            </li>
          </router-link>
        </ul>
        <ul class="byZdf">
          <router-link :to="'/singleStockDetail/information/' + item.code" v-for="item in listByzdf" :key="item.code">
            <li class="contentlist">
              <a class="name" href="javascript:void(0);">
                <span class="stockname">{{ item.name }}</span><br>
                <span class="code">{{ code(item.code) }}</span>
              </a>
              <a class="new" href="javascript:void(0);"  v-stock-color="item.zdf">{{ item.zxj }}</a>
              <a class="percent" href="javascript:void(0);"  v-stock-color="item.zdf">{{ item.zdf | toFixed }}</a>
            </li>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: '',
      listBydate: '',
      listByzdf: ''
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$http.get('/fidnews/v1/geek/v2/getCompanyTemperamentDetailNew', {
        params: {
          id: this.$route.params.id
        }
      })
      .then(res => {
        console.log(res)
        let companyTemperament = res.data.companyTemperament
        companyTemperament.regulation = companyTemperament.regulation.split('|')
        this.$set(this, 'data', companyTemperament)
        let orderByDate = res.data.orderByDateList
        let orderByZdf = res.data.orderByZdfList
        if (res) {
          let stockscode1 = []
          for (let i = 0; i < orderByDate.length; i++) {
            stockscode1.push(orderByDate[i].windCode)
          }
          this.stocksList(stockscode1, 0)
          let stockscode2 = []
          for (let i = 0; i < orderByZdf.length; i++) {
            stockscode2.push(orderByZdf[i].windCode)
          }
          this.stocksList(stockscode2, 1)
        }
      })
    },
    stocksList (stockscode, type) {
      let _this = this
      let dataTypeStr = []
      for (let i = 0; i < stockscode.length; i++) {
        dataTypeStr.push(1)
      }
      this.$http.get('/fidnews/v1/ac/queryStockList', {
        params: {
          dataTypeStr: dataTypeStr.join(','),
          codeStr: stockscode.join(',')
        }
      })
      .then(res => {
        if (type === 0) {
          this.$set(this, 'listBydate', res.data)
        } else {
          this.$set(this, 'listByzdf', res.data.sort(_this.compare('zdf')))
        }
      })
    },
    compare (pro) {
      return function (a, b) {
        var value1 = a[pro]
        var value2 = b[pro]
        return value2 - value1
      }
    },
    code (value) {
      return value.split('.')[0]
    }
  }
}
</script>

<style scoped>
  .b-head{
    width: 100vw;
    height: 5.01rem;
    background: url('../../assets/img/bj446.png') no-repeat;
    background-size: cover;
    position: relative;
  }
  .b-stock{
    position: absolute;
    top: 1.2rem;
    width: 100%;
  }
  .b-stockname{
    clear: both;
    width: 100%;
    font-size: 30px;
    color: #fff;
    text-align: center;
  }
  .b-stocknews{
    font-size: 15px;
    color: #eee;
    padding: 0.67rem 0.53rem 0px 0.75rem;
    text-align: center;
  }
  .stock-num{
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    padding-left: 0.32rem; 
    font-size: 14px;
    color: #191919;
    border-bottom: 1px solid #e2e2e2;
  }
  .stock-num span{
    font-size: 14px;
    color: #9a9a9a;
    padding-left: 0.53rem;
  }
  .b-txt1{
    font-size: 14px;
    color: #191919;
    padding-left: 0.69rem;
    float: left;
  }
  .fundamental{
    padding-top: 0.4rem;
    padding-bottom: 0.24rem;
  }
  .b-income{
    padding-left: 0.64rem;
  }
  .b-income li{
    font-size: 14px;
    color: #9a9a9a;
    padding-bottom: 0.29rem;
    padding-left: 1.76rem;
    padding-right: 0.32rem;
  }
  .b-shuoming{
    height: 0.8rem;
    text-align: right;
  }
  .shuoming img{
    width: 0.8rem;
    height: 0.8rem;
    padding-right: 0.13rem;
  }
  .bar {
    width: 100%;
    height: 0.99rem;
    background: #fff;
    line-height: 37px;
    border-bottom: 0.03rem solid #ececec;
    border-top: 0.27rem solid #f7f7f7;
  }
  .bar ul {
    padding-left: 0.4rem;
    padding-right: 0.4rem;
  }
  .bar ul li {
    float: left;
    text-align: right;
    font-size: 14px;
    color: #2e2e37;
  }
  .bar ul li:first-child {
    text-align: left;
  }
  .bar ul li:first-child, .name {
    width: 30%;
  }
  .bar ul li:nth-child(2), .new {
    width: 25%;
  }
  .bar ul li:nth-child(3), .percent {
    width: 45%;
  }
  .content ul {
    padding-left: 0.4rem;
    padding-right: 0.4rem;
  }
  .contentlist {
    height: 1.09rem;
    margin-top: 0.4rem;
    margin-bottom: 0.8rem;
  }
  .contentlist a {
    float: left;
    display: block;
    font-size: 16px;
  }
  .stockname {
    color: #2e2e37;
    text-align: left;
  }
  .name .code {
    font-size: 12px;
    color: #66667c;
  }
  .new, .percent, .fiveday  {
    text-align: right;
  }
</style>
