<template>
  <div class="view">
    <ul>
      <li class="b-new-li" v-for="item in trackList" :key="item.releaseDate" v-if="trackList">
        <img class="i-leida" src="../../../assets/img/leida.png">
        <div class="b-stocknew">
          <div class="c-triangle"></div>
          <span class="b-time">{{ item.releaseDate }}</span>
          <p>{{ item.digest }}</p>
        </div>
      </li>
      <li class="b-new-li" v-if="zixunData">
        <!-- <hr class="b-line" width="3" size="244" color="#f7f7f7" ref="abc" style="display: block;"> -->
        <img class="i-leida" src="../../../assets/img/zixun.png">
        <div class="b-stocknew" id="sss" ref="sss" >
          <div class="c-triangle"></div>
          <span class="b-time">{{ zixunData.releasedDateLong }}</span>
          <p>{{ zixunData.content}}</p>
          <ul class="b-notice">
            <li class="b-face">
            <img :src="faceImg" />飞笛发出{{ face[zixunData.profitLM]}}脸信号</li>
            <li class="b-conception">该消息所属概念
              <a href="javascript:void(0);">
                <span>{{ zixunData.conceptName }}</span>
              </a>
            </li>
            <li class="b-txt1">{{ zixunData.conceptSummary }}</li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      trackList: '',
      zixunData: '',
      face: ['哭', '笑', '平'],
      faceImg: ''
    }
  },
  created () {
    this.getData()
  },
  mounted () {
  },
  methods: {
    getData () {
      this.$http.get('/fidnews/v1/geek/v2/getMsgChooseStockDetailVo', {
        params: {
          id: this.$route.params.id
        }
      })
      .then(res => {
        console.log(res.data.trackList)
        let today = moment(Date.parse(new Date())).format('YYYY-MM-DD')
        for (let i = 0, l = res.data.trackList.length; i < l; i++) {
          if ((moment(res.data.trackList[i].releaseDate).format('YYYY-MM-DD')) === today) {
            res.data.trackList[i].releaseDate = moment(res.data.trackList[i].releaseDate).format('HH:mm')
          } else {
            res.data.trackList[i].releaseDate = moment(res.data.trackList[i].releaseDate).format('MM-DD HH:mm')
          }
        }
        res.data.releasedDateLong = moment(res.data.releasedDateLong).format('MM-DD HH:mm')
        this.faceImg = require('../../../assets/img/liface' + res.data.profitLM + '.png')
        this.$set(this, 'trackList', res.data.trackList)
        this.$set(this, 'zixunData', res.data)
      })
    }
  }
}
</script>

<style scoped>
  .view {
    margin-left: 0.69rem;
    margin-right: 0.53rem;
    padding-bottom: 0.53rem;
  }
  .b-new-li {
    width: 100%;
    padding-top: 0.53rem;
    display: inline-block;
    border-left: 1px solid #ccc;
  }
  .b-stocknew {
    background-color: #fff;
    font-size: 15px;
    color: #191919;
    padding: 0.27rem 0.32rem;
    position: relative;
    margin-left: 1.2rem;
  }
  .b-notice li,.b-time {
    font-size: 12px;
    color: #999;
  }
  .b-line {
    left: 0.64rem;
    margin-top: 0.8rem;
  }
  .b-line,.c-triangle,.i-leida {
    position: absolute;
  }
  .c-triangle {
    border-right: 0.43rem solid #fff;
    border-top: 0.32rem solid transparent;
    border-bottom: 0.32rem solid transparent;
    width: 1px;
    top: 0.27rem;
    left: -0.43rem;
  }
  .i-leida {
    width: 0.53rem;
    height: 0.53rem;
    left: 16px;
    padding-top: 10px;
  }
  .b-face img {
    width: 0.4rem;
    height: 0.4rem;
    vertical-align: middle;
    padding-right: 0.08rem;
    padding-bottom: 0.05rem;
  }
  .b-conception {
    padding-top: 0.21rem;
    padding-bottom: 0.27rem;
  }
  .b-face {
    padding-top: 0.27rem;
    padding-bottom: 0.37rem;
    border-bottom: 1px solid #CCC;
  }
  .b-conception span {
    border: 1px solid #4e9df4;
    color: #4e9df4;
    margin-left: 0.13rem;
    margin-right: 0.13rem;
    padding: 0.05rem 0.21rem;
    border-radius: 0.32rem;
  }
</style>
