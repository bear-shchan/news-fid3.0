<template>
  <div class="mh-box">
    <!-- 搜索框 -->
    <div class="search">
      <i class="icon-search"></i>
      <input class="input-search" type="text" placeholder="请输入股票名称、代码"
        v-model="curSearch">
    </div>
    <div class="box">
      <!-- 热门搜索 -->
      <div v-show="!showSearchList">
        <p class="title">热门搜索</p>
        <ul class="hot-search">
          <li class="hot-search-item"
            v-for="item in hotSearch"
            @click="gotoDetail(item)">
            {{ item.stockName || item.topicName || item.indexName || item.conceptName }}
          </li>
        </ul>
        <!-- 最近搜索 -->
        <p class="title gray">最近搜索
          <i class="icon-delete" @click="removeSearchHistory()"></i>
        </p>
        <ul class="search-list" v-if="!!curSearchHistoryList[0]">
          <li class="search-item"
            v-for="item in curSearchHistoryList"
            @click="gotoDetail(item)"
            >{{ item.name }}<span class="search-span">{{ item.span }}</span>
          </li>
        </ul>
        <div v-else class="no-search">暂无搜索记录</div>
      </div>
      <!-- 搜索列表 -->
      <ul class="search-list" v-show="showSearchList">
        <li class="search-item"
          v-for="item in curSearchList"
          @click="setHistory(item)"
          >{{ item.name }}<span class="search-span">{{ item.span }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import localStorage from '@/assets/js/localStorage.js'

export default {
  name: 'SingleStock',
  data () {
    return {
      searchList: [],
      hotSearch: [],
      showSearchList: false,
      curSearch: '',
      curSearchList: [],
      searchHistoryList: localStorage.get('searchHistory') || []
    }
  },
  created () {
    this.getHotSearch()
    this.getSearchList()
  },
  methods: {
    getHotSearch () {
      this.$http.get('/fidnews/v1/geek/v2/queryHotSeareach')
      .then((data) => {
        data = data.data
        this.$set(this, 'hotSearch', data)
      })
    },
    getSearchList () {
      let ajax = () => {
        this.$http.get('/fidnews/v1/geek/v2/querySeareachAllInfo')
        .then((data) => {
          data = data.data
          data.map(function (item) {
            item.name = item.stockName || item.topicName || item.indexName || item.conceptName
            item.span = (function (item) {
              if (item.searchType === 1) {
                return item.stockCode
              } else if (item.searchType === 2) {
                return '[主题]'
              } else if (item.searchType === 3) {
                return ''
              } else if (item.searchType === 4) {
                return '[概念]'
              } else {
                return ''
              }
            }(item))
            return item
          })
          localStorage.set('searchList', {
            data
          })
          this.$set(this, 'searchList', data)
        })
      }
      if (localStorage.isExpired('searchList')) {
        ajax()
      } else {
        let searchList = localStorage.get('searchList')
        this.$set(this, 'searchList', searchList.data)
      }
    },
    fuzzySearch (text, query) {
      var i
      var character
      var currentIndex
      var lastIndex = -1
      if (!text) {
        return false
      }
      var tlen = text.length
      var qlen = query.length
      if (qlen > tlen) {
        return false
      }
      if (qlen === tlen) {
        return query === text
      }
      if (text.indexOf(query) > lastIndex) {
        return true
      }
      for (i = 0; i < qlen; i++) {
        character = query[i]
        currentIndex = text.indexOf(character, lastIndex + 1)
        if (currentIndex === -1) {
          return false
        }
        lastIndex = currentIndex
      }
      return true
    },
    searchListFn () {
      let curSearch = this.curSearch
      if (curSearch) {
        this.curSearchList = this.searchList.filter((x) => {
          return this.fuzzySearch(x.name, curSearch) || this.fuzzySearch(x.span, curSearch)
        })
        this.showSearchList = true
      } else {
        this.showSearchList = false
      }
    },
    setHistory (item) {
      let searchHistory = window.localStorage.getItem('searchHistory')
      var searchHistoryArr
      if (searchHistory) {
        searchHistoryArr = JSON.parse(searchHistory)
      } else {
        searchHistoryArr = []
      }
      searchHistoryArr.push(item)
      window.localStorage.setItem('searchHistory', JSON.stringify(searchHistoryArr))
      this.$set(this, 'searchHistoryList', searchHistoryArr)
      this.gotoDetail(item)
    },
    gotoDetail (item) {
      if (item.stockWindCode) {
        this.$router.push('singleStockDetail/information/' + item.stockWindCode)
      } else if (item.topicId) {
        this.$router.push('/subjectTrackDetail/' + item.topicId)
      } else if (item.indexWindCode) {
        this.$router.push('tapeDetail/onlookersTape/' + item.indexWindCode)
      }
    },
    removeSearchHistory () {
      localStorage.remove('searchHistory')
      this.$set(this, 'searchHistoryList', [])
    }
  },
  watch: {
    curSearch () {
      this.searchListFn()
    }
  },
  computed: {
    curSearchHistoryList () {
      return this.searchHistoryList.reverse()
    }
  }
}
</script>

<style scoped>
input{
  border: 0;
  outline:none;
  background-color:transparent;  
  FILTER: alpha(opacity=0); /*androd*/  
  appearance:none;  /*下拉框去掉右侧图标*/  
  -moz-appearance:none;  
  -webkit-appearance:none;
}
input:-webkit-autofill { 
-webkit-box-shadow: 0 0 0px 1000px #fff inset; 
}

.search{
  position: fixed;
  top: 0.12rem;
  right: 0.8rem;
  /*left: 50%;
  transform: translate(-50%);*/
  width: 78.7%;
  line-height: 0.77rem;
  border: 1px solid #f4ce46;
  border-radius: 0.53rem;

  z-index: 999;
}
.icon-search{
  background-image: url('../../assets/img/sousuo.png');
  background-size: 0.32rem 0.37rem;
  display: inline-block;
  width: 0.32rem;
  height: 0.37rem;
  margin-left: 0.24rem;
  margin-right: 0.11rem;
  line-height: 0.77rem;
  vertical-align: -0.08rem;
}
.input-search{
  width: 90%;
  color: #fff;
  font-size: 14px;
  line-height: 0.77rem;
}
.box{
  padding-left: 0.4rem;
  padding-right: 0.4rem;
}
.title{
  position: relative;
  font-size: 14px;
  color: #999;
  line-height: 1.17rem;
  border-bottom: 1px solid #ececec;
}
.hot-search{
  padding-top: 0.4rem;
  margin-left: -0.27rem;
  margin-right: -0.27rem;
}
.hot-search-item{
  text-align: center;
  display: inline-block;
  padding: 0 0.24rem;
  line-height: 0.77rem;
  background-color: #f4ce46;
  color: #2e2e37;
  font-size: 14px;
  margin-bottom: 0.53rem;
  margin-left: 10px;
  margin-right: 10px;
  /*margin-left: 0.53rem;*/
  white-space:nowrap;
}
.icon-delete{
  background-image: url('../../assets/img/shanchu@2x.png');
  background-size: cover;
  display: inline-block;
  width: 0.64rem;
  height: 0.64rem;
  position: absolute;
  right: 0;
  top: 0.54rem;
}
.gray:before{
  content: ' ';
  display: block;
  height: 0.27rem;
  background-color: #f7f7f7;
  margin-left: -0.4rem;
  margin-right: -0.4rem;
}
/*最近搜索,搜索列表*/
.search-list{
  color: #2e2e37;
  font-size: 16px;
}
.search-item{
  padding-top: 0.67rem;
  padding-bottom: 0.27rem;
}
.search-span{
  font-size: 12px;
  color: #83839b;
  padding-left: 0.11rem;
  vertical-align: -0.03rem;
}

.no-search{
  color: #4c4c4c;
  font-size: 14px;
  padding-top: 1.01rem;
  text-align: center;
}
</style>
