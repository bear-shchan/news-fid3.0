<template>
  <div class="box">
    <router-link class="list" to="/todayKnowDetail/2">
      <div class="topic">
        <div class="text">
          <p class="name"> 基础名词基础名词基础名词</p>
          <p class="list-one">
            <span>主题追踪</span>
            <span>11097阅读</span>
            <span>84天前</span>
          </p>
        </div>
        <img src="../../assets/img/1.jpg">
      </div>
    </router-link>
    <router-link class="list" to="/todayKnowDetail/2">
      <div class="topic">
        <div class="text">
          <p class="name"> 基础名词基础名词基础名词</p>
          <p class="list-one">
            <span>主题追踪</span>
            <span>11097阅读</span>
            <span>84天前</span>
          </p>
        </div>
        <img src="../../assets/img/1.jpg">
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {

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
    display: flex;
    padding-top: 0.53rem;
    padding-bottom: 0.53rem;
    border-bottom: 1px solid #ececec;
  }
  .text {
    flex-grow: 1;
    position: relative;
  }
  .topic img {
    width: 3.79rem;
    height: 2.67rem;
    margin-left: 0.27rem;
  }
  .name {
    font-size: 17px;
    color: #4b4b4b;
    margin-top: -0.08rem;
    padding-bottom: 0.27rem;
  }
  .list-one {
    position: absolute;
    bottom: 0;
    color: #999;
  }
  .list-one span {
    font-size: 14px;
    padding-right: 0.27rem;
  }
</style>
