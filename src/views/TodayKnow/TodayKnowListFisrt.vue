<template>
  <div class="box">
    <section class="see bg">
      <p class="lanmu">
        <img src="../../assets/img/50.png" style="width:15px; height:15px;">
        <span style="vertail-align:middle">大家都在看</span>
      </p>
      <div class="seenews">
        <router-link class="seebox"  to="/todayKnowSecond/盘前">
          <div class="see-content">
            <img src="../../assets/img/1.jpg">
            <div>
              <p class="see-title">盘前十二小时</p>
              <p class="origin">
                早晚报 1分钟前
              </p>
            </div>
          </div>
        </router-link>
        <a class="seebox">
          <div>
            <img src="../../assets/img/2.jpg">
            <div class="see-content">
              <p class="see-title">
                专家：去产能去杠杆须推进国企改革专家：去产能革专家：去产能
              </p>
              <p class="origin">
                <span>早晚报</span>
                <span class="see-time">1分钟前</span>
              </p>
            </div>
          </div>
        </a>
        <a class="seebox">
          <div class="see-content">
            <img src="../../assets/img/3.jpg">
            <div>
              <p class="see-title">盘前十二小时</p>
              <p class="origin">
                早晚报 1分钟前
              </p>
            </div>
          </div>
        </a>
      </div>
    </section>
    <section class="report bg">
      <p class="lanmu">
        <img src="../../assets/img/49.png" style="width:15px; height:15px;">
        <span style="vertail-align:middle">独家报道</span>
      </p>
      <div>
        <div class="twoimg">
          <div class="imgs" style="background-image: url('http://image.news.21fid.com/fid/cms/strategy/14.jpg'); ">
            <div class="imgsbox">
              <p class="re-title">蓉儿看盘</p>
              <p class="re-line" style=""/></p>
              <p class="re-describ">露天煤业：受益煤价上涨受益煤价上涨</p>
            </div>
          </div>
          <div class="imgs" style="background-image: url('http://image.news.21fid.com/fid/cms/strategy/15.jpg'); ">
            <div class="imgsbox">
              <p class="re-title">蓉儿看盘</p>
              <p class="re-line" style=""/></p>
              <p class="re-describ">露天煤业：受益煤价上</p>
            </div>
          </div>
        </div>
        <div class="oneimg">
          <div class="img" style="background-image: url('http://image.news.21fid.com/fid/cms/strategy/19.jpg'); ">
            <div class="imgbox">
              <p class="re-title">蓉儿看盘</p>
              <p class="re-line" style=""/></p>
              <p class="re-describ">露天煤业：受益煤价上涨 一季度净利增近2倍上半年预增85%-135%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="zhuti bg">
      <p class="lanmu">
        <img src="../../assets/img/51.png" style="width:15px; height:15px;">
        <span style="vertail-align:middle">主题资讯</span>
      </p>
      <div>
        <router-link class="list" to="/specialSubject/2">
          <div class="topic">
            <div class="text">
              <p class="name">雄安概念遭遇爆炒</p>
              <p class="descri"><span>最新</span>雄安概念遭遇爆炒万华化学一季度净利增长近4倍</p>
              <p class="zhuti-time">1分钟前</p>
            </div>
            <img src="../../assets/img/5.jpg">
          </div>
        </router-link>
        <router-link class="list" to="/newbieFinanceSecond/基础名词/2">
          <div class="topic">
            <div class="text">
              <p class="name">雄安概念遭遇爆炒</p>
              <p class="descri"><span>最新</span>雄安概念遭遇爆炒万华化学一季度净利增长近4倍</p>
            </div>
            <img src="../../assets/img/5.jpg">
          </div>
        </router-link>
        <router-link class="list" to="/newbieFinanceSecond/基础名词/2">
          <div class="topic">
            <div class="text">
              <p class="name">雄安概念遭遇爆炒</p>
              <p class="descri"><span>最新</span>雄安概念遭遇爆炒万华化学一季度净利增长近4倍</p>
            </div>
            <img src="../../assets/img/5.jpg">
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {

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
  padding-left: 0.27rem;
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
  height: 2.4rem;
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
  font-size: 15px;
  margin-top: 0.26rem;
  line-height: 22px;
}
.zhuti {
  padding: 0.27rem 0.2rem;
}
.topic {
  display: flex;
  padding-top: 0.53rem;
  padding-bottom: 0.53rem;
  border-bottom: 0.07rem solid #ececec;
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
  font-size: 15px;
  color: #4b4b4b;
  font-weight: bold;
  margin-top: -0.08rem;
  padding-bottom: 0.27rem;
}
.descri {
  font-size: 14px;
  color: #4b4b4b;
  line-height: 25px;
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
