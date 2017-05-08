<template>
  <div>
    <div class="details-hd">
      <h1 class="fs-36" v-html="main.title">
      </h1>
      <p class="date">
        {{ main.releasedDate | moment('YYYY-MM-DD HH:mm') }}
      </p>
    </div>
    <div class="details-content">
      <div v-html="main.contentTxt"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportDetail',
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
