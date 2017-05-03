<template>
  <div>
    <div class="details-content">
      <!-- 表格 -->
      <table class="details-table">
        <thead>
          <tr>
            <th class="table-header" style="width: 20%; margin-right: 2rem;">排名</th>
            <th class="table-header" style="width: 60%;">主题</th>
            <th class="table-header" style="">涨幅</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(listI, index) in main">
            <td style="color: #ff5367;text-align: center;">{{index + 1}}</td>
            <td style="color: #000;text-align: center;">
              <router-link tag="span"
                :to="'/fundSelectDetails/' + listI.contentId">
                {{listI.topicName}} 
              </router-link>
            </td>
            <td style="color: #ff5367;text-align:center;">{{listI.per}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      main: {}
    }
  },
  created () {
    this.getMain()
    // this.TOGGLE_SPINNER()
  },
  computed: {
    ...mapGetters(['getSpinner'])
  },
  methods: {
    ...mapActions(['TOGGLE_SPINNER']),
    getMain: function () {
      let vm = this
      this.$http.get('/fidnews/v1/myAjax/geek/getHotTopicFund')
      .then((data) => {
        var myData = data.data
        var len = myData.length
        var i = 0
        for (; i < len; i++) {
          myData[i].per = (myData[i].per * 100).toFixed(2) + '%'
        }
        vm.$set(vm, 'main', myData)
      })
    }
  }
}
</script>

<style scoped>

.table-header{
  color:#848484;
  text-align: center;
  font-size: 12px;
  font-weight: normal;
}

.details-content{
  padding: 0 0.28rem;
}

.details-table{
  /*margin-top: 1.5rem;*/
  width: 100%;
}
.details-table th{
  font-size: 0.44rem;
}
.details-table tr{
  height: 1.2rem;
}
.details-table td{
  font-size: 0.44rem;
  border-bottom: 1px solid #eee;
}
</style>
