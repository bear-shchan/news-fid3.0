<template>
  <div>
    <imgs-list :list-arr="listArr" path="/todayKnowDetail/"></imgs-list>
  </div>
</template>

<script>
import contrastDate from '@/assets/js/contrastDate.js'
import ImgsList from '@/components/ImgsList'
export default {
  name: '',
  components: {
    ImgsList
  },
  data () {
    return {
      listArr: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.$http.get('/fidnews/v1/geek/v3/queryFocusTodayListByPro', {
        params: {
          user: 'fidinner',
          key: 'ab54eae187cd5cf4e89fed7a4e62586e',
          publishTime: '',
          proId: this.$route.params.tagname,
          size: ''
        }
      })
      .then((res) => {
        let data = res.data
        for (let i = 0, len = data.length; i < len; i++) {
          data[i].date = contrastDate(data[i].publishTime)
          data[i].pictureUrl = data[i].pictureUrl.split(';')
          data[i].pictureNum = data[i].pictureUrl.length
        }
        this.listArr = data
        console.log(data)
      })
    }
    // getList () {
    //   this.$http.get('/fidnews/v1/geek/v2/queryFocusTodayList', {
    //     params: {
    //       user: 'geek',
    //       key: '4c039f2967c4d93e9674ffb037724187',
    //       publishTime: '',
    //       size: 10
    //     }
    //   })
    //   .then((res) => {
    //     let data = res.data
    //     for (let i = 0, len = data.length; i < len; i++) {
    //       data[i].date = contrastDate(data[i].publishTime)
    //       data[i].pictureUrl = data[i].pictureUrl.split(';')
    //       data[i].pictureNum = data[i].pictureUrl.length
    //     }
    //     this.listArr = data
    //     console.log(data)
    //   })
    // }
  }
}
</script>

<style scoped>
  .box {
    padding-left: 0.4rem;
    padding-right: 0.4rem;
  }
</style>
