<template>
  <div v-show="noLoadingPath">
    <img v-show="getSpinner"
     src="../assets/img/g-loading.gif" class="icon">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      noLoadingPath: false
    }
  },
  computed: {
    ...mapGetters(['getSpinner'])
  },
  watch: {
    '$route': function (val) {
      let arr = ['飞笛资讯', '登录']
      if (arr.indexOf(val.name) !== -1) {
        this.noLoadingPath = false
      } else {
        this.noLoadingPath = true
      }
      // console.log(this.noLoadingPath)
    }
  }
}
</script>

<style scoped>
.icon{
  position: fixed;
  top: 50%;
  left: 50%;
  height: 1.6rem;
  width: 1.6rem;
  margin: -0.8rem 0 0 -0.8rem;
  z-index: 99999;
}
</style>
