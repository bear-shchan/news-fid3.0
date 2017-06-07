<template>
  <div>
    <!-- 筛选块 -->
    <div class="filter-box clearfix">
      <importance-radios class="fl" :text-items="msgType.items" param-name="msgType"></importance-radios>
      <importance-radios class="fr"></importance-radios>
    </div>
    <!-- 资讯列表 -->
    <simple-list :main-list="mainList"></simple-list>
    <!-- 加载更多 -->
    <loadmore
      v-on:getData="getMain"
      :loading="listBusy"
      :showLoading="!firstRequest">
    </loadmore>
  </div>
</template>

<script>
import ImportanceRadios from '@/components/ImportanceRadios.vue'
import SimpleList from '@/components/SimpleList.vue'
import Loadmore from '@/components/Loadmore.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'financing',
  components: {
    ImportanceRadios,
    SimpleList,
    Loadmore
  },
  data () {
    return {
      msgTypeActive: -1,
      msgType: {
        items: [
          {text: '宏观'},
          {text: '行业'},
          {text: '个股'}
        ]
      },
      mainList: [],
      params: {
        'channelId': 39
        // 'importance': '',
        // 'msgType': ''
      },
      firstRequest: true,
      listBusy: false
    }
  },
  created () {
    this.getMain()
    this.REVERT_STATE()
  },
  methods: {
    ...mapActions(['REVERT_STATE']),
    getMain () {
      this.listBusy = true
      if (!this.firstRequest) {
        this.params.beginTimeLong = this.lastBeginTime
      }
      this.$http.get('/fidnews/v1/myAjax/getContentByTime', {
        params: this.params
      })
      .then((data) => {
        let list = data.page.dataList

        for (let i = 0, len = list.length; i < len; i++) {
          list[i].listIntercept = false
        }

        if (this.firstRequest) {
          this.$set(this, 'mainList', list)
          this.firstRequest = false
        } else {
          for (let i = 0, len = list.length; i < len; i++) {
            this.mainList.push(list[i])
          }
        }
        this.listBusy = false
      })
    }
  },
  computed: {
    ...mapGetters(['getImportance', 'getMsgType']),
    lastBeginTime: function () {
      var len = this.mainList.length - 1
      return this.mainList[len].releasedDate
    }
  },
  watch: {
    getImportance () {
      this.firstRequest = true
      if (this.getImportance !== -1) {
        this.params.importance = this.getImportance
      } else {
        delete this.params.importance
      }
      this.getMain()
    },
    getMsgType () {
      this.firstRequest = true
      if (this.getMsgType !== -1) {
        this.params.msgType = this.getMsgType
      } else {
        delete this.params.msgType
      }
      this.getMain()
    }
  }
}
</script>

<style scoped>
/*筛选块*/
.filter-box{
  line-height: 1.12rem;
  background-color: #f7f7f7;
  color: #4c4c4c;
  font-size: 12px;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
}
.msg-type{
  display: inline-block;
}
.msg-type-item{
  display: inline-block;
}
</style>
