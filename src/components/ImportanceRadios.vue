<template>
  <div class="box">
    <label
      v-for="(impChk, index) in curChks"
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
  props: {
    textItems: Array,
    paramName: {
      type: String,
      default: 'importance'
    }
  },
  methods: {
    ...mapActions([`SET_RADIOS_PARAM`]),
    changeImportance: function (i) {
      let paramObj = {
        name: this.paramName,
        param: ''
      }
      if (this.checkedActive === i) {
        this.checkedActive = -1
        paramObj.param = -1
        this.SET_RADIOS_PARAM(paramObj)
        return
      }
      this.checkedActive = i
      paramObj.param = i + 1
      this.SET_RADIOS_PARAM(paramObj)
    }
  },
  computed: {
    curChks () {
      if (this.textItems) {
        return this.textItems
      } else {
        return this.impChks
      }
    }
  }
}
</script>

<style scoped>
.icon{
  display: inline-block;
  width: 0.27rem;
  height: 0.27rem;
  -webkit-background-size: cover;
  background-size: 0.27rem;
  margin-right: 0.11rem;
  margin-left: 0.4rem;
}
.box label:first-of-type .icon{
  margin-left: 0;
}
.circle{
  background-image: url('../assets/img/weixuanzhong@2x.png');
}
.check-circle{
  background-image: url('../assets/img/xuanzhong@2x.png');
}
</style>
