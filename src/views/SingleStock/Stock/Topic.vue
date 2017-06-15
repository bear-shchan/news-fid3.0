<template>
  <div>
    <ul class="list-box" v-show="!!list[0]">
      <li class="list-item"
        v-for="item in list"
        @click="gotoDetail(item.id)">
        <div class="item-header">
          <img class="img" :src="item.smallImage">
          <span class="title">{{ item.name.split('•')[1] }}</span>
        </div>
        <div class="item-content layout-box">
          <div class="content-item box-col">
            <p class="data"
              :class="{'red' : item.riseFallPercent >= 0}">
              {{ item.offer }}
            </p>
            <p class="text">涨跌额</p>
          </div>
          <div class="content-item box-col">
            <p class="data"
              :class="{'red' : item.riseFallPercent >= 0}">
              {{ item.riseFallPercent | toFixed }}
            </p>
            <p class="text">涨跌幅</p>
          </div>
          <div class="content-item box-col">
            <p class="data"
              :class="{'red' : item.avgRiseTotal >= 0}">
              {{ item.avgRiseTotal | toFixed }}
            </p>
            <p class="text">近5日涨幅</p>
          </div>
        </div>
      </li>
    </ul>
    <no-data-img text="暂无相关主题"
      :show="!list[0] && !listBusy">
      <img class="no-data-img" src="../../../assets/img/no-topic.png">
    </no-data-img>
  </div>
</template>

<script>
import NoDataImg from '../components/NoDataImg'

export default {
  components: {
    NoDataImg
  },
  data () {
    return {
      list: [],
      listBusy: false,
      params: {
        stockId: this.$route.params.tagName,
        pageSize: 15,
        pageNum: 1
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.listBusy = true
      this.$http.get('/fidnews/v1/geek/v1/stockPlate', {
        params: this.params
      })
      .then((data) => {
        this.listBusy = false
        data = data.data.plate.data
        let list = data.map((item) => {
          item.offer = item.offer.toFixed(2)
          return item
        })
        if (this.params.pageNo !== 1) {
          for (let j = 0, len = list.length; j < len; j++) {
            this.list.push(list[j])
          }
          this.params.pageNo++
          return
        }
        this.params.pageNo++
        this.$set(this, 'list', list)
      })
    },
    gotoDetail (id) {
      this.$router.push('/SubjectTrackDetail/' + id)
    }
  }
}
</script>

<style scoped>
.list-box{
  background-color: #f7f7f7;
  padding-top: 0.27rem;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  min-height: 72vh;
}
.list-item{
  margin-top: 0.27rem;
  padding-top: 0.27rem;
  padding-left: 0.67rem;
  padding-right: 0.67rem;
  padding-bottom: 0.53rem;
  background-color: #fff;
  border-radius: 5px;
}
.list-item:first-of-type{
  margin-top: 0;
}
.item-header{
  padding-bottom: 0.27rem;
  border-bottom: 1px solid #ececec;
}
.item-header .img{
  border-radius: 50%;
  width: 0.64rem;
  margin-right: 0.13rem;
}
.item-header .title{
  font-size: 14px;
  color: #2e2e37;
}
.item-header .title,
.item-header .img{
  vertical-align: middle;
}

.item-content{
  padding-top: 0.53rem;
  color: #4a9a69;
}
.content-item .data{
  font-size: 18px;
}
.content-item .text{
  font-size: 12px;
  line-height: 22px;
  color: #66667a;
}
.red{
  color: #ec666d;
}
</style>
