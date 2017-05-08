<template>
  <div>
    <slide-box lable="股票入门基础知识"></slide-box>
    <slide-box lable="技术面分析"></slide-box>
    <slide-box lable="基本面分析"></slide-box>
    <slide-box lable="其他知识"></slide-box>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.min.css'
import Swiper from 'swiper'
import SlideBox from './SlideBox.vue'
export default {
  name: '',
  components: {
    SlideBox
  },
  data () {
    return {
      data: '',
      lables: ['股票入门基础知识', '技术面分析', '基本面分析', '其他知识']
    }
  },
  mounted () {
    /* eslint-disable no-new */
    var mySwiper = new Swiper('.swiper-container', {
      scrollbar: '.swiper-scrollbar',
      scrollbarHide: true,
      slidesPerView: 'auto',
      centeredSlides: false,
      spaceBetween: 6,
      grabCursor: true
    })
    console.log(mySwiper)
  }
}
</script>

<style scoped>
  
</style>
