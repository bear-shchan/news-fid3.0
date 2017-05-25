<template>
  <simple-detail :main="main"></simple-detail>
</template>

<script>
import SimpleDetail from '@/components/SimpleDetail'

export default {
  name: 'TransactionDetail',
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
      this.$http.get('/fidnews/v1/myAjax/getContentDetailById', {
        params: {
          dealHtml: -1,
          contentId: this.$route.params.id
        }
      })
      .then((data) => {
        let mainData = data.model
        this.$set(this, 'main', mainData)
      })
    }
  }
}
</script>

<style scoped>
</style>
