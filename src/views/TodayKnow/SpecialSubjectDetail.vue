<template>
  <div class="box">
    <header class="head" style="background-image: url('http://image.news.21fid.com/fid/cms/strategy/19.jpg'); ">
      <ul class="zhuti js-style-stock1">
        <li class="subjectname" v-cloak>雄安新区概念爆炒</li>
        <li class="subjecttime" v-cloak>10:00更新</li>
      </ul>
    </header>
    <section class="touch bg">
      <p class="lanmu">
        <img src="../../assets/img/50.png">
        <span>事件触发</span>
      </p>
      <div class="touch-content">
        广东省省长马兴瑞前往中国移动广东分公司、中国电信广东分公司、省新闻出版广电局调研4K电视网络应用与产业发展情况。马兴瑞表示，加快推动4K电视网络应用与产业发展
      </div>
    </section>
    <section class="subject bg">
      <p class="lanmu leftp">
        <img src="../../assets/img/50.png">
        <span>事件发酵</span>
      </p>
      <div class="subject-content">
        <router-link class="subject-a" to="/todayKnowDetail/2">
          <span>2017-05-10</span> 
          <p>发改委：今明年公平竞争方面重点清理地方保护、地区封锁问题。</p>
        </router-link>
        <router-link class="subject-a" to="/todayKnowDetail/2">
          <span>2017-05-10</span> 
          <p>发改委：今明年公平竞争方面重点清理地方保护、地区封锁问题。</p>
        </router-link>
      </div>
    </section>
    <section class="subject bg">
      <p class="lanmu leftp">
        <img src="../../assets/img/50.png">
        <span>市场表现</span>
      </p>
      <div class="subject-content">
        <router-link class="subject-a" to="/todayKnowDetail/2">
          <span>2017-05-10</span> 
          <p>发改委：今明年公平竞争方面重点清理地方保护、地区封锁问题。</p>
        </router-link>
        <router-link class="subject-a" to="/todayKnowDetail/2">
          <span>2017-05-10</span> 
          <p>发改委：今明年公平竞争方面重点清理地方保护、地区封锁问题。</p>
        </router-link>
      </div>
    </section>
    <section class="subject bg">
      <p class="lanmu leftp">
        <img src="../../assets/img/50.png">
        <span>市场观点</span>
      </p>
      <div class="subject-content">
        <router-link class="view-a" to="/todayKnowDetail/2">
          <p>发改委：今明年公平竞争方面重点清理地方保护、地区封锁问题。</p>
          <span>2017-05-10</span>
        </router-link>
        <router-link class="view-a" to="/todayKnowDetail/2">
          <p>发改委：今明年公平竞争方面重点清理地方保护、地区封锁问题。</p>
          <span>2017-05-10</span>
        </router-link>
      </div>
    </section>
    <section class="subject bg pb">
      <p class="lanmu leftp">
        <img src="../../assets/img/50.png">
        <span>相关股票</span>
      </p>
      <div class="stock-content">
        <ul class="bar">
          <li>股票/代码</li>
          <li>最新</li>
          <li>涨跌幅</li>
          <li>近5日涨幅</li>
        </ul>
        <ul class="list">
          <router-link to="/todayKnowDetail/2">
            <li>
              <span class="name">
                <span class="stockname">银泰资源</span><br>
                <span class="code">600030</span>
              </span>
              <span class="new green">13.29</span>
              <span class="percent green">-0.23%</span>
              <span class="fiveday red">5.73%</span>
            </li>
          </router-link>
          <router-link to="/todayKnowDetail/2">
            <li>
              <span class="name">
                <span class="stockname">银泰资源</span><br>
                <span class="code">600030</span>
              </span>
              <span class="new green">13.29</span>
              <span class="percent green">-0.23%</span>
              <span class="fiveday red">5.73%</span>
            </li>
          </router-link>
          <router-link to="/todayKnowDetail/2">
            <li>
              <span class="name">
                <span class="stockname">银泰资源</span><br>
                <span class="code">600030</span>
              </span>
              <span class="new green">13.29</span>
              <span class="percent green">-0.23%</span>
              <span class="fiveday red">5.73%</span>
            </li>
          </router-link>
        </ul>
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
    background-color: #f5f5f5;
  }
  .head{
    width: 100vw;
    height: 210px;
    position: relative;
  }
  .head:after{    
    position: absolute;    
    top: 0;    
    left: 0;    
    content: "";    
    background-color: #000;    
    opacity: 0.5;    
    z-index: 1;    
    width: 100%;    
    height: 100%;
  }
  .zhuti{
    width: 100%;
    position: absolute;
    top: 72px;
    z-index: 2;
  }
  .subjectname{
    clear: both;
    width: 100%;
    font-size: 21px;
    color: #fff;
    text-align: center;
  }
  .subjecttime{
    font-size: 12px;
    color: #eee;
    padding: 0.27rem 0.8rem 0 0.75rem;
    text-align: center;
  }
  .bg {
    background-color: #fff;
    border-radius: 0.11rem;
  }  
  .touch {
    padding: 0.27rem 0.4rem 0.4rem;
  }
  .touch-content {
    padding-top: 0.27rem;
    font-size: 16px;
    color: #4d4d4d;
  }
  .subject {
    margin: 0.27rem 0.13rem; 
    padding-top: 0.27rem;
  }
  .subject-content {
    margin-top: 0.27rem;
    padding: 0 0.27rem;
    border-top: 1px solid #e5e5e5;
  }
  .subject-a {
    display: flex;
    padding: 0.4rem 0;
    font-size: 16px;
    color: #4d4d4d;
  }
  .subject-a span {
    width: 2.43rem;
    font-size: 12px;
    color: #757575;
  }
  .subject-a p {
    flex: 1;
  }
  .view-a {
    display: block;
    padding: 0.4rem 0;
    font-size: 16px;
    color: #4d4d4d;
    border-bottom: 1px solid #e5e5e5;
  }
  .view-a:last-child {
    border-bottom: none;
  }
  .view-a p {
    padding-bottom: 0.4rem;
  }
  .view-a span {
    font-size: 12px;
    color: #757575;
  }
  .stock-content {
    padding-top: 0.53rem;
  }
  .bar {
    height: 0.48rem;
    padding: 0.27rem; 
  }
  .bar li {
    float: left;
    text-align: right;
    font-size: 12px;
    color: #191919;
  }
  .bar li:first-child {
    text-align: left;
  }
  .bar li:nth-child(1), .name {
    width: 25%;
  }
  .bar li:nth-child(2), .new {
    width: 22%;
  }
  .bar li:nth-child(3), .percent {
    width: 25%;
  }
  .bar li:nth-child(4), .fiveday {
    width: 28%;
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
  .pb {
    padding-bottom: 0.23rem;
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
  .leftp {
    padding-left: 0.27rem;
  }
  .lanmu img {
    width: 0.4rem;
    height: 0.4rem;
    vertical-align: middle;
    padding-bottom: 0.11rem;
    padding-right: 0.13rem;
  }
  .lanmu span {
    font-size: 16px;
    color: #000;
  }
</style>
