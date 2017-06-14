<template>
  <div>
    <!-- 关联基金 -->
    <p style="margin-top: 2.8rem;"></p>
    <template v-if="relatedfund[0]">
      <div class="title" style="text-align:left;text-indent:0.44rem;">关联基金</div>
    </template>
    <ul>
      <router-link tag="li" :to="'/fundDetails/' + item.fundCode" class="fund-item box" v-for="item in relatedfund" :key="item.fundCode">
        <div class="fund-head">
          <p>{{item.name}}</p>
          <p style="margin-top: -8px;">{{item.fundCode}}</p>
        </div>
        <div class="fund-data-box">
          <p class="fund-data">{{item.unitNet}}</p>
          <p class="fund-data-text">单位净值</p>
        </div>
        <div class="fund-data-box">
          <p class="fund-data">{{item.dailyIncrRate}}</p>
          <p class="fund-data-text">最新日涨幅</p>
        </div>
        <div class="fund-data-box">
          <p class="fund-data">
            <template v-if="item.matchDegree.split('%')[0] > 100">
              100%
            </template>
            <template v-else>
              {{item.matchDegree}}      
            </template>
          </p>
          <p class="fund-data-text">主题匹配度</p>
        </div>
      </router-link>
    </ul>
    <!-- 加载更多 -->
    <loadmore
      v-on:getData="getRelatedFund"
      :loading="listBusy"
      :showLoading="relatedFundPageNo !== 1"
      :done="done">
    </loadmore>

  </div>
</template>

<script>
import Loadmore from '@/components/Loadmore.vue'

export default {
  components: {
    Loadmore
  },
  data () {
    return {
      relatedfund: [],
      relatedFundPageNo: 1,
      listBusy: false,
      done: false
    }
  },
  props: {
    topicName: String
  },
  watch: {
    topicName: function () {
      this.getRelatedFund()
    }
  },
  methods: {
    getRelatedFund: function () {
      if (!this.topicName) return
      let topic = this.topicName.split('•')[1]
      this.listBusy = true
      this.$http.get('/fidnews/v1/themefund/relatedfund', {
        params: {
          topic: topic,
          pageNo: this.relatedFundPageNo,
          pageSize: 10
        }
      })
      .then((data) => {
        if (data.num === 0) {
          this.done = true
          return
        }
        if (this.relatedFundPageNo === 1) {
          this.$set(this, 'relatedfund', data.data)
        } else {
          for (let i = 0, len = data.data.length; i < len; i++) {
            this.relatedfund.push(data.data[i])
          }
        }
        this.relatedFundPageNo++
        this.listBusy = false
      })
    }
  }
}
</script>

<style scoped>
.box{
  padding-left: 0.44rem;
  padding-right: 0.44rem;
}
.title{
  font-size: 15px;
  text-align: center;
  font-weight: bold;
}
.fund-item{
  font-size: 15px;
  border-bottom: 0.13rem solid #f3f3f3;
}
.fund-head{
  padding-top: 0.5rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #f3f3f3;
}
.fund-item:first-of-type .fund-head{
  padding-top: 0.2rem;
}
.fund-data-box{
  display: inline-block;
  width: 32%;
  text-align: center;
  padding-top: 0.27rem;
  padding-bottom: 0.4rem;
}
.fund-data{
  font-size: 15px;
  color: #ff4646;
}
.fund-data-text{
  margin-top: -6px;
  font-size: 9px;
  color: #858585;
}
</style>
