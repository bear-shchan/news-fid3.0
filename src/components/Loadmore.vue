<template>
  <div>
    <mugen-scroll
      class="dropload-down"
      :handler="getData"
      :should-handle="!loading">
      <img v-show="!done" class="loading-icon" src="../assets/img/g-loading.gif">
      <span v-show="!done" class="text">{{ droploadDownText }}</span>
      <span v-show="done" class="text">{{ doneText }}</span>
    </mugen-scroll>
  </div>
</template>

<script>
import MugenScroll from 'vue-mugen-scroll'

export default {
  components: {
    MugenScroll
  },
  data () {
    return {
    }
  },
  props: {
    loading: {
      type: Boolean,
      required: true
    },
    droploadDownText: {
      type: String
      // default: '正在加载中...'
    },
    done: {
      type: Boolean,
      default: false
    },
    doneText: {
      type: String,
      default: '已经加载完毕'
    }
  },
  methods: {
    getData () {
      this.$emit('getData')
    }
  }
}
</script>

<style scoped>
.dropload-down {
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #999;
}
.dropload-down .loading-icon {
  width: 30px;
  height: 30px;
  vertical-align: middle;
  padding-right: 4px;
}
.text {
  vertical-align: middle;
}
</style>
