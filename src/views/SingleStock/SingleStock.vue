<template>
  <div>
    <!-- 搜索框 -->
    <div class="search">
      <i class="icon-search"></i>
      <input class="input-search" type="text" placeholder="请输入股票名称、代码">
    </div>
    <div class="box">
      <!-- 热门搜索 -->
      <p class="title">热门搜索</p>
      <ul class="hot-search">
        <li class="hot-search-item">上证指数</li><li class="hot-search-item">次新股</li><li class="hot-search-item">天水股份</li><li class="hot-search-item">吉比特</li><li class="hot-search-item">贵州茅台</li>
      </ul>
      <!-- 最近搜索 -->
      <p class="title gray">最近搜索<i class="icon-delete"></i></p>
      <ul class="search-record">
        <li class="search-record-item">上证指数</li>
        <li class="search-record-item">新大陆<span class="search-record-span">000997</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleStock',
  data () {
    return {

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
  font-size: 0.37rem;
  line-height: 0.77rem;
}
.box{
  padding-left: 0.4rem;
  padding-right: 0.4rem;
}
.title{
  position: relative;
  font-size: 0.37rem;
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
  font-size: 0.37rem;
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
/*最近搜索*/
.search-record-item{
  line-height: 1.97rem;
  font-size: 0.43rem;
  color: #2e2e37;
}
.search-record-span{
  font-size: 0.32rem;
  color: #83839b;
  padding-left: 0.11rem;
  vertical-align: -0.04rem;
}
</style>
