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
export default {
  name: 'goHome',
  data () {
    return {
      showBtn: false,
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
      if (this.currentY - this.startY > 120) {
        this.showBtn = true
      } else if (this.showBtn && this.currentY - this.startY > 0) {
        this.showBtn = true
      } else {
        this.showBtn = false
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
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
