<!-- 用于主题选基列表 -->
<template>
  <ul>
    <router-link tag="li" 
      :to="'/fundSelectDetails/' + item.id" 
      class="list layout-box"
      v-for="item in list"
      key="item.id"
      >
      <img class="img" :src="'http://120.76.76.152/mfs' + item.img">
      <div class="list-info box-col">
        <p>
          <span class="topic-name">{{item.topicName}}</span>
          <span class="date">{{item.releasedTime}}</span>
        </p>
        <p class="title">{{item.title}}</p>
        <p class="fund-name">{{item.fundName}}</p>
      </div>
    </router-link>
  </ul>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
  },
  props: {
    list: Array
  }
}
</script>

<style scoped>
.position{
  /*min-height: 15.2rem;*/
  position: relative;
}

.list{
  margin-left: 0.352rem;
  margin-right: 0.352rem;
  /*margin-top: -1px;*/
  padding-top: 0.43rem;
  padding-bottom: 0.43rem;
  border-top: 1px solid #eee;
}
.list:first-of-type{
  border-top: 0;
}
.img{
  width: 2.3rem;
  height: 1.728rem;
  margin-right: 0.29rem;
}
.topic-name{
  background-color: #ff5367;
  color: #fff;
  border-radius: 0.3rem;
  padding-left: 0.17rem;
  padding-right: 0.17rem;
  font-size: 12px;
}
.fund-name{
  font-size: 14px;
  color: #17a0d9;
}
.title{
  font-size: 16px;
  text-overflow: ellipsis;/*这就是省略号喽*/     
  overflow: hidden;/*设置超过的隐藏*/
  white-space: nowrap;/*设置不折行*/
  width: 6.5rem;
}
.date{
  font-size: 12px;
  color: #9a9a9a;
  float: right;
}
</style>
