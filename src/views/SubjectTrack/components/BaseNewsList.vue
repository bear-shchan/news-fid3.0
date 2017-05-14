<template>
  <div>
    <ul class="newslist" id="newslist" v-if="newsList.length > 0">
      <li v-for="item in newsList"> 
        <p class="stocktitle">
          <span class="news-title">05-11</span>
          {{ item.title }}
        </p>
        <div class="info">
          <img class="face" src="../../../assets/img/liduo@2x.png">
          <a href="javascript:void(0);" onclick="">
            <p class="stocknames">
              恒华科技<span class="percent green">{{ percentData[item.stockWindCode] }}</span>
            </p>
          </a>
          <a href="javascript:void(0);" onclick="">
            <p class="stocknames">
              恒华科技<span class="percent green">-1.69%</span>
            </p>
          </a>
        </div>
      </li>
    </ul>
    <mugen-scroll
      class="dropload-down"
      :handler="getList"
      :should-handle="!loading"
      scroll-container="scrollContainer">
      <span v-if="isLoading">
        <img class="face" src="../../../assets/img/loading.gif">
      </span>
      {{ droploadDownText }}
    </mugen-scroll>
  </div>
</template>

<script>
import axios from 'axios'
import MugenScroll from 'vue-mugen-scroll'
export default {
  components: { MugenScroll },
  data () {
    return {
      newsList: [],
      droploadDownText: '',
      loading: false,
      isLoading: '',
      percentData: []
    }
  },
  created () {
  },
  methods: {
    async getList () {
      try {
        this.loading = true
        const result = await axios.get('http://data.news.21fid.com/fidnews/v1/geek/v3/getTopicInfoMsgV3VoList', {
          params: {
            user: 'geek',
            key: '4c039f2967c4d93e9674ffb037724187',
            topicId: this.$route.params.id,
            pageNum: 5,
            lastTime: (this.newsList.length > 0 && this.newsList[this.newsList.length - 1].releasedTime) || null
          }
        }).then(res => res.data)
        this.newsList = [...this.newsList, ...result.data]
        this.loading = false
        this.droploadDownText = '正在加载中...'
        this.isLoading = true
      } catch (err) {
        this.droploadDownText = '已经加载完毕'
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
  .newslist {
    padding-left: 0.4rem;
    padding-right: 0.4rem;
  }
  .newslist li {
    padding-top: 0.53rem;
    padding-bottom: 0.53rem;
    border-bottom: 1px solid #ececec;
  }
  .newslist li p {
    color: #2e2e37;
  }
  .news-title {
    font-size: 17px;
    color: #e2666d;
    padding-right: 0.13rem;
  }
  .stocktitle {
    font-size: 17px;
  }
  .info {
    padding-top: 0.4rem;
    padding-bottom: 0.53rem;
  }
  .info img, .info p {
    float: left;
  }
  .info img {
    padding-right: 0.11rem;
  }
  .info p span {
    padding-left: 0.19rem;
    padding-right: 0.67rem;
  }
  .face {
    width: 14px;
    height: 14px;
    padding-right: 4px;
    margin-top: 5px;
  }
  .stocknames {
    font-size: 15px;
  }
  .red {
    color: #ff737b;
  }
  .green {
    color: #4a9a69;
  }
  .gray{
    color:#999;
  }
  .dropload-down {
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #999;
  }
  .dropload-down img {
    width: 14px;
    height: 14px;
    line-height: 50px;
    font-size: 12px;
    vertical-align: middle;
    padding-right: 4px;
    margin-bottom: 6px;
  }
</style>
