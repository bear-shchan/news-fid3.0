<template>
  <div>
    <div class="link-box"
      :class="{'fixed-box' : fixedBox}">
      <i class="gray"></i>
      <div v-for="item in linkItems"
        class="link-item"
        :style="{ width: itemWidth }"
        @click="changeRoute(item)"
        >
        <img class="icon-active" v-if="$route.path.indexOf(item.link) !== -1" :src="item.iconActive">
        <img class="icon" v-else :src="item.icon">
        <p class="text">{{item.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    linkPath: String, // /financeCalendar/
    linkItems: Array,
    fixedBox: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    changeRoute (item) {
      let tagName = this.$route.params.tagName
      if (tagName) {
        this.$router.push(this.linkPath + item.link + '/' + tagName)
      } else {
        this.$router.push(this.linkPath + item.link)
      }
    }
  },
  computed: {
    itemWidth () {
      return (100 / this.linkItems.length) + '%'
    }
  }
}
</script>

<style scoped>
.gray{
  position: absolute;
  top: 0;
  display: block;
  z-index: -1;
  width: 100%;
  height: 0.4rem;
  background-color: #f7f7f7;
}
.link-box{
  align-items: flex-end;
  position: relative;
  z-index: 1;
  width: 100%;
  background-color: #fff;
  padding-top: 0.27rem;
  color: #2e2e37;
  font-size: 12px;
}
.fixed-box{
  position: fixed;
  z-index: 999;
}
.link-item{
  text-align: center;
  border-bottom: 1px solid #ccc;
  display: inline-block;
  /*width: 20%;*/
  padding-bottom: 0.27rem;
}
.icon{
  width: 0.64rem;
  height: 0.64rem;
}
.icon-active{
  width: 1.07rem;
  height: 1.07rem;
}
.text{
  line-height: 17px;
}
</style>
