<template>
  <div>
    <div class="financing-btn">
      <div class="financing-btn-item"
        :class="[checkedActive == index ? 'active' : '']"
        v-for="(item, index) in chksItem"
        @click="changeFinancing(index)">
        {{item.text}}
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: '',
  data () {
    return {
      checkedActive: 0,
      chksItem: [
        {text: '融资', link: 'equityTrading'},
        {text: '融券', link: 'securitiesLoan'}
      ]
    }
  },
  methods: {
    changeFinancing (i) {
      this.checkedActive = i
      router.push(`/financing/${this.chksItem[i].link}`)
    }
  }
}
</script>

<style scoped>
.financing-btn{
  line-height: 1.04rem;
  font-size: 16px;
  color: #999;
  background-color: #2e2e37;
}
.financing-btn-item{
  display: inline-block;
  text-align: center;
  width: 50%;
}
.financing-btn-item.active{
  color: #f4ce46;
}
</style>
