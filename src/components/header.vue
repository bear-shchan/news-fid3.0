<template>
  <div class="header" v-show="$route.path != '/login'">
    {{$route.name}}
    <img src="../assets/img/1@2x.png"
      v-show="$route.path == '/'"
      class="login-icon" 
      @click="logoutDisplay = !logoutDisplay">
    <div class="logout" 
      @click="logout"
      v-show="logoutDisplay">
      退出登录
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: '',
  data () {
    return {
      logoutDisplay: false
    }
  },
  watch: {
    '$route': function () {
      this.logoutDisplay = false
    }
  },
  methods: {
    ...mapActions(['USER_SIGNOUT']),
    logout () {
      this.USER_SIGNOUT()
      this.$router.replace({path: '/login'})
    }
  }
}
</script>

<style scoped>
.header{
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 998;
  background-color: #2e2e37;
  line-height: 1.07rem;
  height: 1.07rem;
  text-align: center;
  color: #fff;
  font-size: 18px;
}
.login-icon{
  position: absolute;
  right: 0.32rem;
  width: 0.64rem;
  height: 0.64rem;
  top: 0.22rem;
}
.logout{
  position: absolute;
  right: 0.24rem;
  top: 1.17rem;
  background-image: url('../assets/img/logout.png');
  background-repeat: no-repeat;
  background-size: contain;
  width: 1.9rem;
  z-index: 999;
  font-size: 14px;
  color: #f4ce46;
  height: 1rem;
  line-height: 1.1rem;
}
</style>
