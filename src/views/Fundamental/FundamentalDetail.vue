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
          <router-link to="/">
            <li class="contentlist">
              <a class="name" href="javascript:void(0);">
                <span class="stockname">1</span><br>
                <span class="code">1</span>
              </a>
              <a class="new" href="javascript:void(0);">1</a>
              <a class="percent" href="javascript:void(0);">1</a>
            </li>
          </router-link>
        </ul>
        <ul class="byZdf">
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: ''
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
      let dataTypeStr = []
      for (let i = 0; i < stockscode.length; i++) {
        dataTypeStr.push(1)
      }
      console.log(dataTypeStr)
      this.$http.get('/fidnews/v1/ac/queryStockList', {
        params: {
          dataTypeStr: dataTypeStr,
          codeStr: stockscode
        }
      })
      .then(res => {
        console.log(res)
      })
    },
    compare (pro) {
      return function (a, b) {
        var value1 = a[pro]
        var value2 = b[pro]
        return value2 - value1
      }
    }
  }
}
</script>

<style scoped>
  .b-head{
    width: 100vw;
    height: 188px;
    background: url('../../assets/img/bj446.png') no-repeat;
    background-size: cover;
    position: relative;
  }
  .b-stock{
    position: absolute;
    top: 45px;
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
    padding: 25px 20px 0px 28px;
    text-align: center;
  }
  .stock-num{
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 12px; 
    font-size: 14px;
    color: #191919;
    border-bottom: 1px solid #e2e2e2;
  }
  .stock-num span{
    font-size: 14px;
    color: #9a9a9a;
    padding-left: 20px;
  }
  .b-txt1{
    font-size: 14px;
    color: #191919;
    padding-left: 26px;
    float: left;
  }
  .fundamental{
    padding-top: 15px;
    padding-bottom: 9px;
  }
  .b-income{
    padding-left: 24px;
    /*float: left;*/
  }
  .b-income li{
    font-size: 14px;
    color: #9a9a9a;
    padding-bottom: 11px;
    padding-left: 66px;
    padding-right: 12px;
  }
  .b-shuoming{
    height: 30px;
    text-align: right;
  }
  .shuoming img{
    width: 30px;
    height: 30px;
    padding-right: 5px;
  }
  .bar {
    width: 100%;
    height: 37px;
    background: #fff;
    line-height: 37px;
    border-bottom: 1px solid #ececec;
    border-top: 10px solid #f7f7f7;
  }
  .bar ul {
    padding-left: 15px;
    padding-right: 15px;
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
    padding-left: 15px;
    padding-right: 15px;
  }
  .contentlist {
    height: 41px;
    margin-top: 15px;
    margin-bottom: 30px;
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
