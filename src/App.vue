<template>
  <div id="app">
    <headerDiv></headerDiv>
    <router-view></router-view>
  </div>
</template>

<script>
import headerDiv from './components/header'

export default {
  name: 'app',
  components: {
    headerDiv
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
