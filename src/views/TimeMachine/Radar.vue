<template>
  <div class="view">
    <ul>
      <li class="b-new-li" v-for="item in trackList">
        <img class="i-leida" src="../../assets/img/leida.png">
        <div class="b-stocknew">
          <div class="c-triangle"></div>
          <span class="b-time">{{ item.releaseDate }}</span>
          <p>{{ item.digest }}</p>
        </div>
      </li>
      <li class="b-new-li"  >
        <hr class="b-line" width="3" size="244" color="#f7f7f7" ref="abc" style="display: block;">
        <img class="i-leida" src="../../assets/img/zixun.png">
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
    console.log(this.$refs.abc.color)
    console.log(this.$refs.abc.size)
    console.log(this.$refs.sss)
    console.log(this.$refs.sss.getBoundingClientRect())
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
        this.faceImg = require('../../assets/img/liface' + res.data.profitLM + '.png')
        this.$set(this, 'trackList', res.data.trackList)
        this.$set(this, 'zixunData', res.data)
      })
    }
  }
}
</script>

<style scoped>
  .view {
    margin-left: 26px;
    margin-right: 20px;
    padding-bottom: 20px
  }
  .b-new-li {
      width: 100%;
      padding-top: 20px;
      display: inline-block;
      border-left: 1px solid #ccc
  }
  .b-stocknew {
      background-color: #fff;
      font-size: 15px;
      color: #191919;
      padding: 10px 12px;
      position: relative;
      margin-left: 45px
  }

  .b-notice li,.b-time {
      font-size: 12px;
      color: #999
  }
  .b-line {
      left: 24px;
      margin-top: 30px;
  }
  .b-line,.c-triangle,.i-leida {
      position: absolute
  }

  .c-triangle {
      border-right: 16px solid #fff;
      border-top: 12px solid transparent;
      border-bottom: 12px solid transparent;
      width: 1px;
      top: 10px;
      left: -16px
  }
  .i-leida {
      width: 20px;
      height: 20px;
      left: 16px;
      padding-top: 10px;
  }
  .b-face img {
      width: 15px;
      height: 15px;
      vertical-align: middle;
      padding-right: 3px;
      padding-bottom: 2px;
  }
  .b-conception {
      padding-top: 8px;
      padding-bottom: 10px;
  }
  .b-face {
      padding-top: 10px;
      padding-bottom: 14px;
      border-bottom: 1px solid #CCC;
  }
  .b-conception span {
      border: 1px solid #4e9df4;
      color: #4e9df4;
      margin-left: 5px;
      margin-right: 5px;
      padding: 2px 8px;
      border-radius: 12px;
  }
</style>
