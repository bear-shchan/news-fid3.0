<template>
  <div id="app">
    <headerDiv></headerDiv>
    <router-view></router-view>
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
</style>
