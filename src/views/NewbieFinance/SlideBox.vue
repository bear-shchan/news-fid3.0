<!-- 用于小白财经一级类目列表 -->
<template>
  <div>
    <div class="lanmu">
      <p><span></span>{{ lable }}</p>
    </div>
    <div class="slidebox">
      <div class="swiper-container">
          <div class="swiper-wrapper">
              <router-link class="swiper-slide boxbg" to="/newbieFinanceSecond/基础名词" style="background-image: url('http://image.news.21fid.com/fid/cms/strategy/14.jpg'); ">
                  <span class="slidetext">基础名词</span>
              </router-link>
              <a class="swiper-slide boxbg" style="background-image: url('http://image.news.21fid.com/fid/cms/strategy/15.jpg'); ">
              <span class="slidetext">交易指南</span>
              </a>
              <a class="swiper-slide boxbg" style="background-image: url('http://image.news.21fid.com/fid/cms/strategy/19.jpg'); "><span class="slidetext">K线基础</span></a>
              <a class="swiper-slide boxbg" style="background-image: url('http://image.news.21fid.com/fid/cms/strategy/17.jpg'); "><span class="slidetext">量价理论</span></a>
              <a class="swiper-slide boxbg" style="background-image: url('http://image.news.21fid.com/fid/cms/strategy/18.jpg'); "><span class="slidetext">Slide 5</span></a>
          </div>
          <div class="swiper-scrollbar"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
  },
  props: {
    list: Array,
    lable: ''
  }
}
</script>

<style scoped>
  .lanmu {
    padding-top: 0.53rem;
    padding-bottom: 0.4rem;
  }
  .lanmu span {
    font-size: 14px;
    background: #f4ce46;
    padding-left: 3px;
    margin-right: 5px;
  }
  .lanmu p {
    color: #2e2e37;
    font-size: 17px;
    padding-left: 15px;
  }
  .slidebox {
    padding-left: 15px;
  }
  .swiper-container {
    width: 100%;
    height: 120px;
    margin: 0px auto;
    border-bottom: 1px solid #ccc;
  }
  .swiper-slide {
    width: 1520px;
    text-align: center;
    font-size: 18px;
    background: transparent;
    width: 160px;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .boxbg {
    width: 160px; 
    height: 100px;
    background-size: cover; 
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 0.16rem;
  }
  .boxbg:after {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    background-color: #2e2e37;
    opacity: 0.3;
    z-index: 1;
    width: 100%;
    height: 100%;
    border-radius: 0.16rem;
  }
  .swiper-scrollbar {
    width: 100%;
    height: 3px;
    position: absolute;
    left: 0;
    bottom: -1px;
    z-index: 1;
  }
  a {
    text-decoration: none;
    color: #fff;
  }
  .slidetext {
    position: absolute;
    z-index: 2;
    color: #fff;
  }
</style>
