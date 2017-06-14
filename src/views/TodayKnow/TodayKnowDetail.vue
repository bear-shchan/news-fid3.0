<template>
  <div>
    <section class="tk-todaycontent">
      <p class="tk-title">{{ detailData.title }}</p>
      <div class="tk-info">
        <span>{{ detailData.origin }}</span>
        <span>{{ readNum }}阅读</span>
        <span>{{ detailData.newDate }}</span>
      </div>
      <div class="tk-content" v-html="detailData.content ">
      </div>
    </section>
    <div class="tk-lanmu">
      <p><span></span>推荐资讯</p>
    </div>
    <imgs-list :list-arr="detailData.FocusTodayList" path="/todayKnowDetail/"></imgs-list>
  </div>
</template>

<script>
import contrastDate from '@/assets/js/contrastDate.js'
import moment from 'moment'
import ImgsList from '@/components/ImgsList'
export default {
  components: {
    ImgsList
  },
  data () {
    return {
      detailData: '',
      readNum: ''
    }
  },
  created () {
    this.getDetail()
    this.getReadingNum()
  },
  watch: {
    '$route': ['getDetail', 'getReadingNum']
  },
  methods: {
    getDetail () {
      this.$http.get('/fidnews/v1/geek/v2/queryFocusTodayDetail', {
        params: {
          user: 'geek',
          key: '4c039f2967c4d93e9674ffb037724187',
          publishTime: '',
          id: this.$route.params.id
        }
      })
      .then((res) => {
        let data = res.data[0]
        res.data[0].newDate = moment(res.data[0].publishTime).format('MM-DD HH:mm')
        for (let i = 0, len = data.FocusTodayList.length; i < len; i++) {
          data.FocusTodayList[i].date = contrastDate(data.FocusTodayList[i].publishTime)
          data.FocusTodayList[i].pictureUrl = data.FocusTodayList[i].pictureUrl.split(';')
          data.FocusTodayList[i].pictureNum = data.FocusTodayList[i].pictureUrl.length
          if (!data.FocusTodayList[i].newsUrl) {
            data.FocusTodayList[i].newsUrl = '/todayKnowDetail/' + data.FocusTodayList[i].id
          }
        }
        this.detailData = data
      })
    },
    getReadingNum () {
      this.$http.get('http://api2.geek.21fid.com:8080/common/view', {
        params: {
          transfertype: 17,
          transferid: this.$route.params.id
        }
      })
      .then((res) => {
        let data = res.data
        this.readNum = data.views
      })
    }
  }
}
</script>

<style>
  .tk-todaycontent {
    padding: 0.4rem 0.4rem;
  }
  .tk-title {
    font-size: 24px;
    color: #2e2e37;
    padding-bottom: 0.48rem;
  }
  .tk-info span {
    font-size: 13px;
    color: #83839d;
    padding-right: 0.27rem;
  }
  .tk-content {
    font-size: 16px;
    color: #4d4d4d;
    margin-top: 0.48rem;
    margin-bottom: 0.53rem;
    line-height: 26px;
  }
  .tk-lanmu {
    height: 44px;
    line-height: 44px;
    border-top: 7px solid #f7f7f7;
    border-bottom: 1px solid #ececec;
  }
  .tk-lanmu p {
    color: #2e2e37;
    font-size: 16px;
    padding-left: 15px;
  }
  .tk-lanmu span {
    font-size: 14px;
    background: #f4ce46;
    padding-left: 3px;
    margin-right: 5px;
  }
  .tk-content p img {
    width: 100%;
  }
</style>
