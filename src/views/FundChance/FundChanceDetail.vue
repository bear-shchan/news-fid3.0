<template>
  <div>
    <div class="box">
      <div class="details-hd">
        <h1 class="fs-36">
          {{ main.title }}
        </h1>
        <span class="date-text">预期</span><p class="date">
          {{ main.predictTime }}
        </p>
        <span class="source">飞笛智投</span>
      </div>
      <div class="details-content details-content-s">
        <div v-html="main.latestStatus0"></div>
        <div v-html="main.latestStatus1"></div>
        <div v-html="main.depth"></div>
      </div>
    </div>

    <!-- k线图 -->
    <div class="title">{{main.topicName}}</div>
    <charts-kline class="charts" :topic-id="main.topicId"></charts-kline>

    <!-- 关联基金 -->
    <related-fund :topic-name="main.topicName"></related-fund>

  </div>
</template>

<script>
import moment from 'moment'
import ChartsKline from '@/components/ChartsKline'
import RelatedFund from '@/components/RelatedFund'

export default {
  components: {
    ChartsKline,
    RelatedFund
  },
  data () {
    return {
      main: {}
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': function () {
      this.getMain()
    }
  },
  created () {
    this.getMain()
  },
  methods: {
    getMain: function () {
      this.$http.get('/fidnews/v1/themefund/jhbDetail', {
        params: {
          contentId: this.$route.params.id
        }
      })
      .then((data) => {
        data.latestStatus = data.latestStatus.replace('<p><br></p>', '')
        let arr = data.latestStatus.match(/<p[^>]*>(?:(?!<\/p>)[\s\S])*<\/p>/gi)
        data.latestStatus1 = arr[0]
        data.latestStatus0 = arr[1]
        this.$set(this, 'main', data)
      })
    }
  },
  filters: {
    moment (value, param) {
      return moment(value).format(param)
    }
  }
}
</script>

<style scoped>
.title{
  font-size: 15px;
  text-align: center;
  font-weight: bold;
}
.box{
  padding-left: 0.44rem;
  padding-right: 0.44rem;
}
.details-hd{
  margin-top: 0.53rem;
  margin-bottom: 0.8rem;
}
.details-hd h1{
  font-size: 24px;
  margin-bottom: 0.53rem;
}
.date{
  display: inline-block;
  font-size: 12px;
  color: #2e2e37;
  border: 1px solid #f4ce46;
  border-radius:  0 0.05rem 0.05rem 0;
  border-left: 0;
  line-height: 0.48rem;
  padding: 0 0.15rem;
}
.date-text{
  display: inline-block;
  line-height: 0.48rem;
  background-color: #f4ce46;
  border: 1px solid #f4ce46;
  border-radius:  0.05rem 0 0 0.05rem;
  width: 0.99rem;
  text-align: center;
}
.source{
  color: #83839d;
  padding-left: 0.27rem;
}

.details-content{
  font-size: 14px;
  margin-top: 0.75rem;
  margin-bottom: 0.64rem;
}
.details-content div:nth-child(1){
  color: #f35b6a;
}
.details-content div:nth-child(2){
  color: #9a9a9a;
}
.details-content img{
  width: 100%;
  display: none;
  /*overflow: hidden;*/
}
.details-img{
  width: 100%;
  height: 10rem;
}

.charts-hd{
  margin-top: 0.5rem;
  text-align: center;
}
.details-intro{
  margin-top: 2.5rem;
  color: #4d4d4d;
  font-size: 0.82rem;
}
.details-intro2{
  margin-top: 0.5rem;
  color: #4d4d4d;
  font-size: 0.82rem;
}
</style>
