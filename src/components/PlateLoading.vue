<template>
  <div :class="{position: !!min}" :style="{ minHeight: min + 'rem' }">
    <slot></slot>
    <clip-loader class="app-spinner" :loading="loading" color="#ccc" size="22px"></clip-loader>
  </div>
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  components: {
    ClipLoader
  },
  data () {
    return {
    }
  },
  methods: {
  },
  props: {
    loading: Boolean,
    min: {
      type: [Number, String],
      default: function () {
        return 0
      }
    }
  }
}
</script>

<style scoped>
.position{
  /*min-height: 0rem;*/
  position: relative;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .7s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
