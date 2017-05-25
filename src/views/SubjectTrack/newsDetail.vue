<template>
  <div class="box">
    <p class="title">{{ data.title }}</p>
    <div class="info">
      <span>飞笛资讯</span>
      <!-- <span>{{ readNum }}阅读</span> -->
      <span>{{ data.date }}</span>
    </div>
    <div class="content" v-html="data.content">
      {{ data.content }}
    </div>
  </div>
</template>

<script>
import contrastDate from '@/assets/js/contrastDate.js'
export default {
  name: '',
  data () {
    return {
      data: '',
      readNum: ''
    }
  },
  created () {
    this.getDetail()
    this.getReadNum()
  },
  methods: {
    getDetail () {
      this.$http.get('/fidnews/v1/geek/v1/infoDetail', {
        params: {
          user: 'geek',
          key: '4c039f2967c4d93e9674ffb037724187',
          id: this.$route.params.id
        }
      })
      .then((res) => {
        console.log(res.data)
        res.data.date = contrastDate(res.data.releaseTime)
        this.data = res.data
      })
    },
    getReadNum () {
      this.$http.get('//api2.geek.21fid.com:8080/common/view', {
        params: {
          transfertype: 17,
          transferid: this.$route.params.id
        }
      })
      .then((res) => {
        console.log(res.data)
        this.readNum = res.data.views
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
