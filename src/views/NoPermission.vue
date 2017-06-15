<template>
  <div class="tac box">
    <img class="icon-01" src="../assets/img/noPermi-icon-01.png">
    <p class="fs24">您的权限已过期</p>
    <p class="fs24">有需要请与本司联系</p>
    <img class="icon-02" src="../assets/img/noPermi-icon-02.png">
    <p>联系方式：<span class="blue">0755-86037819</span></p>
    <img class="icon-03" src="../assets/img/noPermi-icon-03.png">
    <p class="blue">marketing-service@21fid.cn</p>
    <img class="icon-04" src="../assets/img/noPermi-icon-04.png">
    <p>深圳市深南大道9996号松日鼎盛大厦6楼</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
    }
  },
  created () {
    this.SET_SPINNER(false)
  },
  methods: {
    ...mapActions(['SET_SPINNER'])
  }
}
</script>

<style scoped>
.box{
  color: #181818;
  font-size: 14px;
}
.fs24{
  font-size: 24px;
}
.blue{
  color: #1980d7;
}

.icon-01{
  margin-top: 55px;
  height: 80px;
}
.icon-02{
  margin-top: 70px;
  height: 40px;
}
.icon-03{
  margin-top: 25px;
  height: 30px;
}
.icon-04{
  margin-top: 25px;
  height: 40px;
}
</style>
