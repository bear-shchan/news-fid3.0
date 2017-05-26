<template>
  <div>
    <mugen-scroll
      class="dropload-down"
      :handler="getData"
      :should-handle="!loading">
      <img class="loading-icon" src="../assets/img/loading.gif">
      {{ droploadDownText }}
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
      type: String,
      default: '正在加载中...'
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
  width: 14px;
  height: 14px;
  vertical-align: middle;
  padding-right: 4px;
}
</style>
