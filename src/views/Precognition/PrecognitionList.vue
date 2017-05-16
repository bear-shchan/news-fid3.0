<template>
  <div class="box clearfix"
    v-infinite-scroll="getList"
    infinite-scroll-disabled="listBusy" 
    infinite-scroll-distance="100"
    infinite-scroll-immediate-check="false">
    <router-link tag="div" :to="'/precognitionDetail/' + item.id" 
      v-for="item in listArr" class="item" :class="{gray: item.gray}" key="item.latestTime">
      <div class="img-bg">
        <i class="translucent"></i>
        <p class="topic">{{item.predictTitle}}</p>
        <p class="time">{{item.time}}</p>
        <p class="recommend">推荐指数:</p>
      </div>
      <p class="title">{{item.predictContent}}</p>
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
      fristRequest: true,
      releaseTime: Date.now(),
      listArr: [],
      imgObj: {
        '1': 'ahead',
        '3': 'cash',
        // '预期更改': 'change',
        '0': 'no-cash',
        '4': 'postpone',
        '2': ''
      },
      listBusy: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.$http.get('/fidnews/v1/geek/v2/queryFutureSeareach', {
        params: {
          pageSize: 20,
          releaseTime: this.releaseTime
        }
      })
      .then((res) => {
        let data = res.data
        // format
        for (let i = 0, len = data.length; i < len; i++) {
          // formatStyle
          if (data[i].znhjhbType === 3 || data[i].znhjhbType === 0) {
            data[i].gray = true
          }
          // formatTime
          data[i].date = contrastDate(data[i].releaseTime)
          // formatTitle
          // data[i].title = '预期：' + data[i].title
          // formatImg
          let img = this.imgObj[data[i].znhjhbType]
          if (img) {
            data[i].imgPath = require('@/assets/img/' + img + '.png')
          }
        }
        // set
        if (this.fristRequest) {
          this.listArr = data
          this.fristRequest = false
        } else {
          for (let i = 0, len = data.length; i < len; i++) {
            this.listArr.push(data[i])
          }
        }
        this.releaseTime = this.listArr[this.listArr.length - 1].releaseTime
      })
    }
  }
}
</script>

<style scoped>
.box{
  padding: 0.43rem;
  background-color: #f5f5f5;
}
.item{
  position: relative;
  float: left;
  width: 49%;
  height: 5.07rem;
  background-color: #fff;
  border-radius: 5px;
  text-align: center;
  margin-right: 2%;
  margin-bottom: 0.27rem;
}
.item:nth-child(2n){
  margin-right: 0;
}
.img-bg,
.translucent{
  width: 100%;
  height: 2.13rem;
  border-radius: 5px 5px 0 0;
}
.img-bg{
  width: 100%;
  height: 2.13rem;
  /*padding-top: 0.6rem;
  padding-bottom: 0.13rem;*/
  background-image: url(http://120.76.76.152/mfs/cms/2016/11/17/20161117085006988.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}
.translucent{
  position: absolute;
  left: 0;
  opacity:.5;
  background-color: #000;
}
.topic{
  position: absolute;
  top: 0.6rem;
  font-size: 16px;
  line-height: 16px;
  color: #f4ce46;
  margin-left: 50%;
  transform: translate(-50%);
  white-space: nowrap;
}
.time{
  position: absolute;
  top: 1.16rem;
  width: 80%;
  font-size: 15px;
  line-height: 15px;
  color: #fff;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  margin-left: 50%;
  transform: translate(-50%);
  white-space: nowrap;
}
.recommend{
  position: absolute;
  top: 1.76rem;
  font-size: 9px;
  line-height: 9px;
  color: #f4ce46;
  white-space: nowrap;
  margin-left: 50%;
  transform: translate(-50%);
  white-space: nowrap;
}

.title{
  width: 75%;
  margin: 0.53rem auto 0;
  font-size: 12px;
  line-height: 16px;
  color: #232323;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 3;
}
.date{
  font-size: 10px;
  color: #f35b6a;
  position: absolute;
  bottom: 0.4rem;
  left: 50%;
  transform: translate(-50%);
  white-space: nowrap;
}
.img{
  position: absolute;
  bottom: 0.13rem;
  right: 0.07rem;
  width: 1.33rem;
}

.gray .date,
.gray .title{
  color: #a4a4a4;
}
</style>
