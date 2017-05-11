<template>
  <simple-detail :main="main"></simple-detail>
</template>

<script>
import SimpleDetail from '@/components/SimpleDetail'

export default {
  name: 'ReportDetail',
  components: {
    SimpleDetail
  },
  data () {
    return {
      main: {}
    }
  },
  created () {
    this.getMain()
  },
  methods: {
    getMain () {
      this.$http.get('/fidnews/v1/geek/v3/queryStockReportDetail', {
        params: {
          id: this.$route.params.id
        }
      })
      .then((data) => {
        let mainData = data.data
        this.$set(this, 'main', mainData)
      })
    }
  }
}
</script>

<style scoped>
</style>
