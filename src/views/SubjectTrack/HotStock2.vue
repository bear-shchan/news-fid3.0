<template>
  <div>
    <section class="subject">
      <div>
        <div  class="bar">
          <ul>
            <li>股票/代码</li>
            <li>最新</li>
            <li>涨跌幅</li>
            <li>近5日涨幅</li>
          </ul>          
        </div>
        <loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"  :bottomPullText='bottomText'>
          <ul class="list">
            <router-link :to="'/singleStockDetail/information/' + item.windStockCode" v-for="item in listArr">
              <li>
                <span class="name">
                  <span class="stockname">{{ item.stockCnName }}</span><br>
                  <span class="code">{{ item.windStockCode.split('.')[0] }}</span>
                </span>
                <span :class="'new ' + color (item.zdf)">{{ item.zxj }}</span>
                <span :class="'percent ' + color (item.zdf)">{{ item.zdf | toFixed}}</span>
                <span :class="'fiveday ' + color (item.percent)">{{ item.percent | toFixed}}</span>
              </li>
            </router-link>
          </ul>
        </loadmore>
      </div>
    </section>
  </div>
</template>
<script>
import { Loadmore } from 'mint-ui'
export default {
  components: {
    Loadmore
  },
  data () {
    return {
      listArr: [],
      stockNum: 10,
      offset: 0,
      allLoaded: false,
      bottomText: '正在加载中...'
    }
  },
  created () {
    this.getList(0)
  },
  methods: {
    getList (offset) {
      this.$http.get('/fidnews/v1/statistics/hotForefrontStockPage', {
        params: {
          user: 'fidinner',
          key: 'ab54eae187cd5cf4e89fed7a4e62586e',
          id: this.$route.params.id,
          businessType: 39,
          offset: offset,
          stockNum: this.stockNum
        }
      })
      .then((res) => {
        let data = res.stockList
        console.log(data)
        this.listArr = data
      })
    },
    loadTop () {
      this.offset += this.stockNum
      setTimeout(() => {
        this.$http.get('/fidnews/v1/statistics/hotForefrontStockPage', {
          params: {
            user: 'fidinner',
            key: 'ab54eae187cd5cf4e89fed7a4e62586e',
            id: this.$route.params.id,
            businessType: 39,
            offset: this.offset,
            stockNum: this.stockNum
          }
        }).then(res => {
          this.listArr = this.listArr.concat(res.stockList)
        })
      }, 2000)
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      this.offset += this.stockNum
      setTimeout(() => {
        this.$http.get('/fidnews/v1/statistics/hotForefrontStockPage', {
          params: {
            user: 'fidinner',
            key: 'ab54eae187cd5cf4e89fed7a4e62586e',
            id: this.$route.params.id,
            businessType: 39,
            offset: this.offset,
            stockNum: this.stockNum
          }
        }).then(res => {
          this.listArr = this.listArr.concat(res.stockList)
        })
      }, 2000)
      if (this.page > 5) {
        this.allLoaded = true
      }
      // this.$refs.loadmore.onBottomLoaded()
    },
    color (value) {
      if (value > 0) {
        return 'red'
      } else if (value < 0) {
        return 'green'
      } else {
        return 'gray'
      }
    }
  }
}
</script>

<style scoped>
  .stock-content {
    padding-top: 0.53rem;
  }
  .bar {
    width: 100%;
    height: 0.48rem;
    background: #fff;
    padding: 0.27rem 0; 
    box-shadow: 0px 5px 6px #F3F0F0;
    position: fixed;
  }
  .bar ul {
    padding: 0 0.4rem;
  }
  .bar ul li {
    float: left;
    text-align: right;
    font-size: 12px;
    color: #191919;
  }
  .bar ul li:first-child {
    text-align: left;
  }
  .bar ul li:nth-child(1), .name {
    width: 25%;
  }
  .bar ul li:nth-child(2), .new {
    width: 22%;
  }
  .bar ul li:nth-child(3), .percent {
    width: 25%;
  }
  .bar ul li:nth-child(4), .fiveday {
    width: 28%;
  }
  .list {
    padding-top: 1.01rem;
  }
  .list li {
    height: 1.09rem;
    padding: 0.27rem;
    border-top: 1px solid #e5e5e5;
  }
  .list li span {
    float: left;
    display: block;
    font-size: 16px;
  }
  .stockname {
    color: #2e2e37;
    text-align: left;
  }
  .new, .percent, .fiveday  {
    text-align: right;
  }
  .name .code {
    font-size: 12px;
    color: #66667c;
  }
  .new, .percent, .fiveday {
    margin-top: 5px;
  }
  .red {
    color: #f35b6a;
  }
  .green {
    color: #4a9a69;
  }
  .gray{
    color:#999;
  }
</style>
