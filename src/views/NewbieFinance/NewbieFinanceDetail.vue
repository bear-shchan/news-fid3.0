<template>
  <div class="box">
    <p class="title">{{ data.title }}</p>
    <div class="info">
      <span>{{ data.origin }}</span>
      <span>10000+阅读</span>
      <span>{{ data.date }}</span>
    </div>
    <div class="content" v-html="data.content"></div>
  </div>
</template>

<script>
import contrastDate from '@/assets/js/contrastDate.js'
export default {
  name: '',
  data () {
    return {
      data: ''
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      this.$http.get('/fidnews/v1/geek/v3/queryWhiteDeatil', {
        params: {
          user: 'fidinner',
          key: 'ab54eae187cd5cf4e89fed7a4e62586e',
          id: this.$route.params.id
        }
      })
      .then((res) => {
        console.log(res.data)
        res.data.date = contrastDate(res.data.releaseTime)
        this.data = res.data
      })
    }
  }
}
</script>

<style scoped>
  .box {
    padding: 15px 15px;
  }
  .title {
    font-size: 24px;
    color: #2e2e37;
    padding-bottom: 0.48rem;
  }
  .info span {
    font-size: 13px;
    color: #83839d;
    padding-right: 0.27rem;
  }
  .content {
    font-size: 16px;
    color: #4d4d4d;
    margin-top: 0.48rem;
    line-height: 26px;
  }
</style>
