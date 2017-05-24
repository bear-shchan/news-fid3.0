<!-- 用于小白财经一级类目列表 -->
<template>
  <div>
    <div class="lanmu">
      <p><span></span>{{ lable }}</p>
    </div>
    <div class="slidebox">
      <div class="swiper-container">
        <div class="swiper-wrapper">
            <router-link v-for="item in list" :key="item.id" class="swiper-slide boxbg" :to="'/newbieFinanceSecond/' + item.id" :style="{'background-image':'url('+item.pictureUrl+')'}">
                <span class="slidetext">{{ item.name }}</span>
            </router-link>
        </div>
        <div class="swiper-scrollbar"></div>
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.min.css'
import Swiper from 'swiper'
export default {
  components: {
  },
  data () {
    return {
    }
  },
  mounted () {
    /* eslint-disable no-new */
    new Swiper('.swiper-container', {
      scrollbar: '.swiper-scrollbar',
      scrollbarHide: true,
      slidesPerView: 'auto',
      centeredSlides: false,
      spaceBetween: 6,
      grabCursor: true
    })
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
