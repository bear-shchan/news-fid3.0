<template>
  <div>
    <rose-or-drop-list :rankType="rankType"></rose-or-drop-list>
  </div>
</template>

<script>
import RoseOrDropList from '../components/RoseOrDropList.vue'

export default {
  components: {
    RoseOrDropList
  },
  data () {
    return {
      rankType: 0
    }
  }
}
</script>

<style scoped>

</style>
