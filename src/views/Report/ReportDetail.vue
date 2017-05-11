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
.box{
  min-height: 100vh;
  padding-top: 0.53rem;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  padding-bottom: 0.53rem;
}
.details-hd h1{
  font-size: 24px;
  color: #2e2e37;
  line-height: 31px;
}
.date{
  font-size: 12px;
  color: #83839d;
  margin-top: 0.53rem;
  /*border-bottom: 1px solid #eee;*/
  margin-bottom: 0.4rem;
}
.details-content{
  font-size: 16px;
  color: #4d4d4d;
}
</style>
