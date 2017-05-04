<template>
  <div class="importance">
    <label
      v-for="(impChk, index) in impChks"
      v-on:touchstart="changeImportance(index)"
      >
      <i class="icon"
        :class="[checkedActive == index ? 'check-circle' : 'circle']">
      </i><span>{{ impChk.text }}</span>
    </label>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      checkedActive: -1,
      impChks: [
        {text: '一般'},
        {text: '重要'},
        {text: '很重要'}
      ]
    }
  },
  methods: {
    ...mapActions(['SET_IMPORTANCE']),
    changeImportance: function (imp) {
      if (this.checkedActive === imp) {
        this.checkedActive = -1
        this.SET_IMPORTANCE(-1)
        return
      }
      this.checkedActive = imp
      this.SET_IMPORTANCE(imp + 1)
    }
  }
}
</script>

<style scoped>
.importance{
  float: right;
}
.icon{
  display: inline-block;
  width: 0.27rem;
  height: 0.27rem;
  -webkit-background-size: cover;
  background-size: cover;
  margin-right: 0.11rem;
  margin-left: 0.4rem;
}
.circle{
  background-image: url('../assets/img/weixuanzhong@2x.png');
}
.check-circle{
  background-image: url('../assets/img/xuanzhong@2x.png');
}
</style>
