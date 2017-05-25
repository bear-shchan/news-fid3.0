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
      this.$http.get('http://120.76.220.55:8081/ChinaConceptStock/hkStock/getHkStockNewsById.do', {
        params: {
          id: this.$route.params.id
        }
      })
      .then((data) => {
        let mainData = data.data[0]
        let main = {
          title: mainData.title,
          releasedDate: mainData.contentTime,
          contentTxt: mainData.content
        }
        this.$set(this, 'main', main)
      })
    }
  }
}
</script>

<style scoped>
</style>
