<template>
  <div>
    <div v-show="$route.path != '/'">
      <transition name="fade">
        <router-link v-show="showBtn" id="goHome" class="icon" tag="div" to="/"></router-link>
      </transition>
    </div>
  </div>
</template>

<script>
// !默认显示 下滑隐藏
export default {
  name: 'goHome',
  data () {
    return {
      showBtn: true,
      startY: '',
      currentY: ''
    }
  },
  created () {
    this.bindTouchEvents()
  },
  methods: {
    bindTouchEvents () {
      window.addEventListener('touchstart', this.handleTouchStart)
      window.addEventListener('touchmove', this.handleTouchMove)
    },
    handleTouchStart (event) {
      this.startY = event.touches[0].clientY
    },
    handleTouchMove (event) {
      this.currentY = event.touches[0].clientY
      if (this.startY - this.currentY > 120) {
        this.showBtn = false
      } else if (!this.showBtn && this.startY - this.currentY > 0) {
        this.showBtn = false
      } else {
        this.showBtn = true
      }
    }
  }
}
</script>

<style scoped>
.icon{
  background-image: url('../assets/img/home@2x.png');
  background-size: cover;
  position: fixed;
  bottom: 3.33rem;
  right: 0.45rem;
  width: 1.6rem;
  height: 1.6rem;
  z-index: 999;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
