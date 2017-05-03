<template>
  <div>
    <plate-header title="实时主题" :gray-line="true" :path="fundPath"></plate-header>
  
    <plate-loading :loading="loading" min="8">
      <topic-list :list="threeList"></topic-list>
    </plate-loading>

    <plate-header title="主题指数" :gray-line="true"></plate-header>
    <hot-fund></hot-fund>
  </div>
</template>

<script>
// import router from '../router'
import PlateHeader from '@/components/PlateHeader'
import TopicList from '@/components/TopicList'
import HotFund from './HotFund'
import PlateLoading from '@/components/PlateLoading'

// import { mapActions } from 'vuex'

export default {
  components: {
    PlateHeader,
    HotFund,
    TopicList,
    PlateLoading
  },
  data () {
    return {
      fundPath: 'fundList'
    }
  },
  methods: {
  },
  props: ['list'],
  computed: {
    threeList: function () {
      return this.list.splice(0, 3)
    },
    loading () {
      return !this.list[0]
    }
  }
}
</script>

<style scoped>

</style>
