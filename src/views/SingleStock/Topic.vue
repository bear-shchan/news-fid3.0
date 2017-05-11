<template>
  <div>
    <no-data-img text="暂无相关主题"
      :show="!mainList[0]">
      <img class="no-data-img" src="../../assets/img/no-topic.png">
    </no-data-img>
  </div>
</template>

<script>
import NoDataImg from './components/NoDataImg'

export default {
  components: {
    NoDataImg
  },
  data () {
    return {
      mainList: []
    }
  }
}
</script>

<style scoped>

</style>
