<template>
  <div class="box">
    <section class="see bg">
      <p class="lanmu">
        <img src="../../assets/img/50.png" style="width:15px; height:15px;">
        <span style="vertail-align:middle">大家都在看</span>
      </p>
      <div class="seenews">
        <router-link class="seebox"  :to="'/todayKnowSecond/' + item.productId" v-for="item in seeList" :key="item.productId">
          <div class="see-content">
            <img :src="item.productImages">
            <div>
              <p class="see-title">{{ item.title }}</p>
              <p class="origin">
                {{item.productName}} 1分钟前
              </p>
            </div>
          </div>
        </router-link>
      </div>
    </section>
    <section class="report bg">
      <p class="lanmu">
        <img src="../../assets/img/49.png" style="width:15px; height:15px;">
        <span style="vertail-align:middle">独家报道</span>
      </p>
      <div>
        <div class="twoimg">
          <router-link class="imgs" :to="'/todayKnowSecond/' + item.productId" :style="{backgroundImage: 'url(' + item.productImages + ')', width: '100vw', backgroundSize: 'cover'}
         " v-for="(item, key) in reportList" v-if="key < 2" :key="item.productId">
            <div class="imgsbox">
              <p class="re-title">{{ item.productName }}</p>
              <p class="re-line"></p>
              <p class="re-describ">{{ item.title }}</p>
            </div>
          </router-link>
        </div>
        <div class="oneimg">
          <router-link :to="'/todayKnowSecond/' + oneReport.productId">
            <div class="img" :style="{backgroundImage: 'url(' + oneReport.productImages + ')', backgroundSize: 'cover'}">
              <div class="imgbox">
                <p class="re-title">{{ oneReport.productName }}</p>
                <p class="re-line" style=""/></p>
                <p class="re-describ">{{ oneReport.title }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>
    <section class="zhuti bg">
      <p class="lanmu">
        <img src="../../assets/img/51.png" style="width:15px; height:15px;">
        <span style="vertail-align:middle">主题资讯</span>
      </p>
      <div>
        <router-link class="list" :to="'/specialSubject/' + item.id" v-for="item in specialList" :key="item.id">
          <div class="topic layout-box">
            <div class="text box-col">
              <p class="name">{{ item.name }}</p>
              <p class="descri"><span>最新</span>{{ item.title }}</p>
              <p class="zhuti-time">{{ item.releasedTime }}</p>
            </div>
            <img :src="item.images">
          </div>
        </router-link>
        <loadmore
          v-on:getData="getList"
          :loading="loading"
          :showLoading="!firstRequest"
          :done="done">
        </loadmore>
        <!-- <router-link class="list" to="/newbieFinanceSecond/基础名词/2">
          <div class="topic layout-box">
            <div class="text box-col">
              <p class="name">雄安概念遭遇爆炒</p>
              <p class="descri"><span>最新</span>雄安概念遭遇爆炒万华化学一季度净利增长近4倍</p>
            </div>
            <img src="../../assets/img/5.jpg">
          </div>
        </router-link>
        <router-link class="list" to="/newbieFinanceSecond/基础名词/2">
          <div class="topic layout-box">
            <div class="text box-col">
              <p class="name">雄安概念遭遇爆炒</p>
              <p class="descri"><span>最新</span>雄安概念遭遇爆炒万华化学一季度净利增长近4倍</p>
            </div>
            <img src="../../assets/img/5.jpg">
          </div>
        </router-link> -->
      </div>
    </section>
  </div>
</template>

<script>
import contrastDate from '@/assets/js/contrastDate.js'
import Loadmore from '@/components/Loadmore.vue'
export default {
  name: '',
  components: {
    Loadmore
  },
  data () {
    return {
      seeList: [],
      reportList: [],
      oneReport: [],
      specialList: [],
      releasedTime: '',
      firstRequest: true,
      doneText: '没有更多数据',
      loading: false,
      done: false
    }
  },
  created () {
    this.getSeeList(0)
    this.getSeeList(1)
    this.getList()
  },
  methods: {
    getSeeList (type) {
      this.$http.get('/fidnews/v1/geek/v3/queryProducts', {
        params: {
          user: 'fidinner',
          key: 'ab54eae187cd5cf4e89fed7a4e62586e',
          type: type
        }
      })
      .then((res) => {
        if (type === 0) {
          this.$set(this, 'seeList', res.data)
        } else {
          this.$set(this, 'reportList', res.data)
          this.$set(this, 'oneReport', res.data[2])
        }
      })
    },
    getReadNum () {
      this.$http.get('//api2.geek.21fid.com:8080/common/view', {
        params: {
          transfertype: 17,
          transferid: this.$route.params.id
        }
      })
      .then((res) => {
        this.readNum = res.data.views
      })
    },
    getList () {
      this.loading = true
      this.$http.get('/fidnews/v1/geek/v3/querySubjects', {
        params: {
          user: 'fidinner',
          key: 'ab54eae187cd5cf4e89fed7a4e62586e',
          size: 5,
          releasedTime: this.releasedTime
        }
      })
      .then((res) => {
        let data = res.data
        if (data.length === 0) {
          this.done = true
          return
        }
        let releasedTimelast
        for (var i = 0; i < data.length; i++) {
          releasedTimelast = data[data.length - 1].releasedTime
          data[i].releasedTime = contrastDate(data[i].releasedTime)
        }
        if (this.firstRequest) {
          this.firstRequest = false
        }
        this.$set(this, 'specialList', this.specialList.concat(data))
        this.releasedTime = releasedTimelast
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
.box {
  padding-top: 0.13rem;
  background-color: #f5f5f5;  
}
.bg {
  background-color: #fff;
}
.see {
  margin-bottom: 0.27rem;
  padding: 0.27rem 0 0.13rem 0.2rem;
}
.lanmu {
  padding-bottom: 0.27rem;
}
.lanmu img {
  width: 0.48rem;
  height: 0.48rem;
  vertical-align: middle;
  padding-bottom: 2px;
}
.lanmu span {
  font-size: 0.4rem;
  color: #4b4b4b;
}
.seenews{
  display: flex;
}
.seenews img {
  width: 100%;
  height: 1.73rem;
}
.seebox {
  margin-right: 0.2rem;
  flex: 1;
  border: 1px solid #eee;
  display: block;
  padding-bottom: 0.8rem;
  position: relative;
}
.see-title {
  font-size: 12px;
  color: #000;
  font-weight: bold;
}
.origin {
  color: #646464;
  font-size: 0.24rem;
  position: absolute;
  bottom: 0.13rem;
}
.see-time {
  /*padding-left: 0.27rem;*/
}
.see-title, .origin {
  padding: 0 0.13rem;
}
.report {
  margin-bottom: 0.27rem;
  padding: 0.27rem 0.2rem 0.3rem;
}
.twoimg {
  display: flex;
}
.twoimg .imgs {
  /*height: 2.4rem;*/
  flex: 1;
}
.twoimg .imgs:first-child {
  margin-right: 0.2rem;
}
.oneimg {
  width: 100%;
  margin-top: 0.16rem;
}
.oneimg .img {
  width: 100%;
  height: 3.07rem;
}
.twoimg .imgs, .oneimg .img {
  border-radius: 0.11rem;
  background-size: cover;
  position: relative;
}
.twoimg .imgs:after, .oneimg .img:after {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  content: '';
  background-color: #000;
  opacity: .5;
  border-radius: 0.11rem;
}
.re-title, .re-line, .re-describ {
  color: #fff;
  text-align: center;
  position: relative;
  z-index: 99;
}
.imgsbox {
  padding: 0.27rem 0;
}
.imgbox {
  padding: 0.53rem 0;
}
.re-title {
  font-size: 12px;
}
.re-line {
  width: 0.6rem;
  margin: 0.10rem auto;
  height: 0.08rem;
  background-color:#fff;
}
.re-describ {
  font-size: 0.4rem;
  margin-top: 0.26rem;
  line-height: 22px;
}
.zhuti {
  padding: 0.27rem 0.2rem;
}
.topic {
  padding-top: 0.53rem;
  padding-bottom: 0.53rem;
  border-bottom: 1px solid #ececec;
}
.text {
  flex-grow: 1;
  padding-left: 0.12rem;
  position: relative;
}
.topic img {
  width: 3.79rem;
  height: 2.67rem;
  margin-left: 0.27rem;
}
.name {
  font-size: 0.4rem;
  color: #4b4b4b;
  font-weight: bold;
  margin-top: -0.08rem;
  padding-bottom: 0.27rem;
}
.descri {
  font-size: 0.37rem;
  color: #4b4b4b;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
}
.descri span {
  color: red;
  border: 1px solid red;
  padding: 0.02rem 0.1rem;
  margin-right: 0.13rem;
}
.zhuti-time {
  position: absolute;
  bottom: 0;
  font-size: 12px;
  color: #656565;
}
</style>
