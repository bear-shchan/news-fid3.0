<template>
  <div class="box">
    <router-link class="list" 
      :to="'/newbieFinanceDetail/' + item.id" 
      v-for="item in secondListData"
      :key="item.id">
      <div class="topic layout-box">
        <div class="box-col">
          <p class="name"> {{ item.title }}</p>
          <p class="descri">{{ item.content }}</p>
        </div>
        <img :src="item.imgUrl">
      </div>
    </router-link>
    <!-- 加载更多 -->
    <loadmore
      v-on:getData="getList"
      :loading="loading"
      :showLoading="this.params.releasedTime !== ''"
      :done="done">
    </loadmore>
  </div>
</template>

<script>
import Loadmore from '@/components/Loadmore.vue'

export default {
  components: {
    Loadmore
  },
  data () {
    return {
      secondListData: [],
      params: {
        user: 'fidinner',
        key: 'ab54eae187cd5cf4e89fed7a4e62586e',
        id: this.$route.params.id,
        releasedTime: '',
        size: 10
      },
      loading: false,
      done: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.loading = true
      this.$http.get('/fidnews/v1/geek/v3/secondWhiteList', {
        params: this.params
      })
      .then((res) => {
        let data = res.data
        let len = data.length
        console.log(len)
        if (len === 0) {
          this.done = true
          return
        }
        this.$set(this, 'secondListData', this.secondListData.concat(data))
        let lastNum = len - 1
        this.params.releasedTime = data[lastNum].releaseTime
        this.loading = false
        if (len < 10) {
          this.done = true
        }
      })
    }
  }
}
</script>

<style scoped>
  .box {
    padding-left: 0.4rem;
    padding-right: 0.4rem;
  }
  .list {
    width: 100%;
    display: inline-block;
  }
  .topic {
    padding-top: 0.53rem;
    padding-bottom: 0.53rem;
    border-bottom: 1px solid #ececec;
  }
  .topic img {
    width: 3.07rem;
    height: 2.45rem;
    margin-left: 0.27rem;
  }
  .name {
    font-size: 17px;
    color: #2e2e37;
    margin-top: -0.08rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .descri {
    font-size: 14px;
    color: #83839d;
    position: absolute;
    bottom: 0;
    overflow: hidden;
    /*text-overflow: ellipsis;*/
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .box-col {
    position: relative;
  }
</style>
