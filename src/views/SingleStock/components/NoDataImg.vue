<template>
  <div class="no-data" v-if="show">
    <slot></slot>
    <p class="no-data-text">{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    text: String
  }
}
</script>

<style scoped>
.no-data{
  text-align: center;
  height: 72vh;
  background-color: #f7f7f7;
}
.no-data-img{
  margin-top: 2.67rem;
  width: 4.27rem;
  height: 2.8rem;
  margin-bottom: 0.4rem;
}
.no-data-text{
  font-size: 16px;
  color: #f4ce46;
}
</style>
