<template>
  <div class="box clearfix"
    v-infinite-scroll="getList"
    infinite-scroll-disabled="listBusy" 
    infinite-scroll-distance="100"
    infinite-scroll-immediate-check="false">
    <router-link tag="div" :to="'/precognitionDetail/' + item.contentId" 
      v-for="item in listArr" class="item" :class="{gray: item.gray}" key="item.latestTime">
      <p class="topic">{{item.topic}}</p>
      <p class="time">{{item.time}}</p>
      <p class="title">{{item.title}}</p>
      <p class="date">{{item.date}}</p>
      <img class="img" :src="item.imgPath">
    </router-link>
  </div>
</template>

<script>
import contrastDate from '@/assets/js/contrastDate.js'

export default {
  name: 'PrecognitionList',
  data () {
    return {
      pageNo: 1,
      listArr: [],
      imgObj: {
        '预期提前': 'ahead',
        '预期兑现': 'cash',
        '预期更改': 'change',
        '没有兑现': 'no-cash',
        '预期推迟': 'postpone',
        '进行中': ''
      },
      listBusy: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      if (!this.pageNo) {
        return false
      }
      this.$http.get('/fidnews/v1/themefund/jhb', {
        params: {
          pageNo: this.pageNo,
          pageSize: 20
        }
      })
      .then((res) => {
        let data = res.data
        // format
        for (let i = 0, len = data.length; i < len; i++) {
          // formatStyle
          if (data[i].znhjhbType === '预期兑现' || data[i].znhjhbType === '没有兑现') {
            data[i].gray = true
          }
          // formatTime
          data[i].date = contrastDate(data[i].latestTime)
          // formatTitle
          data[i].title = '预期：' + data[i].title
          // formatImg
          let img = this.imgObj[data[i].znhjhbType]
          if (img) {
            data[i].imgPath = require('@/assets/img/' + img + '.png')
          }
        }
        // set
        if (this.pageNo === 1) {
          this.listArr = data
        } else {
          for (let i = 0, len = data.length; i < len; i++) {
            this.listArr.push(data[i])
          }
        }
        this.pageNo++
        if (res.num === 0) {
          this.pageNo = false
          return false
        }
      })
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
  width: 3.56rem;
  height: 4.37rem;
  background-color: #fff;
  border-radius: 0.11rem;
  padding-top: 0.67rem;
  /*padding-bottom: 0.53rem;*/
  padding-left: 0.32rem;
  padding-right: 0.32rem;
  text-align: center;
  margin-right: 0.32rem;
  margin-bottom: 0.32rem;
}
.item:nth-child(2n){
  margin-right: 0;
}
.topic{
  font-size: 0.43rem;
  line-height: 0.43rem;
  border-bottom: 1px solid #e2e2e2;
  padding-bottom: 0.35rem;
  color: #191919;
}
.time{
  font-size: 0.43rem;
  line-height: 0.43rem;
  color: #4e9df4;
  margin-top: 0.35rem;
  margin-bottom: 0.43rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.title{
  font-size: 0.32rem;
  color: #606060;
}
.date{
  font-size: 0.27rem;
  color: #f35b6a;
  position: absolute;
  bottom: 0.53rem;
  left: 50%;
  transform: translate(-50%);
  white-space: nowrap;
}
.img{
  position: absolute;
  top: 0.57rem;
  left: 2.73rem;
  width: 1.33rem;
}
.gray .date,
.gray .topic,
.gray .title,
.gray .time{
  color: #999;
}
</style>
