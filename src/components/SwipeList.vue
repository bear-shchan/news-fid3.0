<template>
  <!-- 轮播图 -->
  <swipe class="my-swipe">
    <swipe-item v-for="hotListI in hotList" :key="hotListI.index">
      <div class="swipe-content" @click="jumpDetail(hotListI.contentId)">
        <img :src="'http://120.76.76.152/mfs' + hotListI.img">
        <div class="swipe-translucent swipe-translucent-b"></div>
        <div class="swipe-topic">
          {{hotListI.topicName}}
        </div>
        <p class="swipe-hd">{{hotListI.fundName}}</p>
      </div>
    </swipe-item>
  </swipe>
</template>

<script>
import router from '../router'
import { Swipe, SwipeItem } from 'vue-swipe'

import { mapActions } from 'vuex'
export default {
  components: {
    Swipe,
    SwipeItem
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions(['TOGGLE_SPINNER']),
    jumpDetail (data) {
      // this.TOGGLE_SPINNER()
      router.push(this.details + '/' + data)
    }
  },
  props: ['hotList', 'details']
}
</script>

<style scoped>
.my-swipe {
  height: 5.2rem;
  color: #fff;
  font-size: 30px;
  text-align: center;
}
.my-swipe .swipe-content{
  /*display: block;*/
  height: 100%;
  color: #fff;
  overflow: hidden;
  position: relative;
}
.my-swipe img{
  width: 100%;
  height: 5.2rem;
}
.my-swipe .swipe-topic{
  position: absolute;
  top: 1.47rem;
  margin-left: 50%;
  transform: translate(-50%);
  border: 2px solid #fff;
  color: #fff;
  font-size: 0.69rem;
  line-height: 0.69rem;
  padding: 0.28rem;
  white-space: nowrap;
}
.my-swipe .swipe-hd{
  position: absolute;
  width: 100%;
  top: 3.02rem;
  text-align: center;
  font-size: 0.44rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.my-swipe .swipe-translucent{
  width: 100%;
  height: 5.2rem;
  position: absolute;
  top: 0;
  background:#000;
  opacity:.5;
}
/*.my-swipe .swipe-translucent-b{
  height: 5.2rem;
  opacity:.65;
}*/
</style>
