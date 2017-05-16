<template>
  <div class="box">
    <router-link class="list" :to="'/todayKnowDetail/' + item.id" v-for="item in listArr"
      key="item.id">
      <div class="list-one layout-box" v-if="item.pictureNum == 1 && item.pictureUrl != ''">
        <div class="text box-col">
          <p class="name"> {{ item.title }}</p>
          <p class="list-one-text">
            <span>{{ item.origin }}</span>
            <span>{{ item.readingNumber }}阅读</span>
            <span>{{ item.date }}</span>
          </p>
        </div>
        <img :src="item.pictureUrl">
      </div>
      <div class="list-three" v-else-if="item.pictureNum == 3">
        <div>
          <p class="name"> {{ item.title }}</p>
          <div class="list-three-img">
            <img :src="img" v-for="img in item.pictureUrl"/>
          </div>
          <p class="list-three-text">
            <span>{{ item.origin }}</span>
            <span>{{ item.readingNumber }}阅读</span>
            <span>{{ item.date }}</span>
          </p>
        </div>
      </div>
      <div class="list-no" v-else="item.pictureNum == 0 || item.pictureUrl != ''">
        <div>
          <p class="name"> {{ item.title }}</p>
          <p class="list-no-text">
            <span>{{ item.origin }}</span>
            <span>{{ item.readingNumber }}阅读</span>
            <span>{{ item.date }}</span>
          </p>
        </div>
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
  },
  created () {
  },
  props: ['listArr']
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
  .text {
    position: relative;
  }
  .list-one img {
    width: 2.93rem;
    height: 2.35rem;
    margin-left: 0.27rem;
  }
  .name {
    font-size: 17px;
    color: #4b4b4b;
    margin-top: -0.08rem;
    padding-bottom: 0.27rem;
  }
  .list-one-text {
    position: absolute;
    bottom: 0;
  }
  .list-one, .list-three, .list-no {
    padding-top: 0.53rem;
    padding-bottom: 0.53rem;
    border-bottom: 1px solid #ececec;
  }
  .list-three img {
    width: 2.99rem;
    height: 2.35rem;
  }
  .list-three-img {
    display: flex;
    margin-top: 0.32rem;
    margin-bottom: 0.32rem;
  }
  .list-three-img img {
    flex: 1;
  }
  .list-three-img img:first-child, .list-three-img img:nth-child(2) {
    padding-right: 0.19rem;
  }
  .list-one-text span, .list-three-text span, .list-no-text span{ 
    color: #999;
    font-size: 14px;
    padding-right: 0.27rem;
  }
</style>
