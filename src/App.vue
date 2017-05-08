<template>
  <div id="app">
    <headerDiv></headerDiv>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <go-home></go-home>
  </div>
</template>

<script>
import HeaderDiv from './components/Header'
import GoHome from './components/GoHome'

export default {
  name: 'app',
  components: {
    HeaderDiv,
    GoHome
  },
  data () {
    return {

    }
  }
}
</script>

<style>
#app{
  padding-top: 1.07rem;
}
.details-content-s p img{
  width: 9rem;
  text-indent: 0;
  margin-left: -0.91rem;
}
.details-content-s p{
  text-indent: 0.91rem;
  margin-bottom: 0.53rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .4s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
