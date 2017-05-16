<template>
  <div>
    <slide-box :lable="item.categoryName" v-for="item in firstListData" :key="item.categoryName" :list="item.list"></slide-box>
  </div>
</template>
<script>
import SlideBox from './SlideBox.vue'
export default {
  name: '',
  components: {
    SlideBox
  },
  data () {
    return {
      data: '',
      firstListData: ''
    }
  },
  created () {
    this.getFirstList()
  },
  methods: {
    getFirstList () {
      this.$http.get('/fidnews/v1/geek/v3/queryWhiteList', {
        params: {
          'user': 'fidinner',
          'key': 'ab54eae187cd5cf4e89fed7a4e62586e'
        }
      })
      .then((res) => {
        this.firstListData = res.data
        console.log(res.data)
      })
    }
  }
}
</script>

<style scoped>
  
</style>
