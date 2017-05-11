<template>
  <div>
   <!--  <div class="link-box">
      <i class="gray"></i>
      <router-link v-for="item in items"
        :to="'/financeCalendar/' + item.link"
        tag="div"
        class="link-item"
        key="item.event"
        >
        <img class="icon-active" v-if="$route.path.indexOf(item.link) !== -1" :src="item.iconActive">
        <img class="icon" v-else :src="item.icon">
        <p class="text">{{item.text}}</p>
      </router-link>
    </div> -->
    <icon-router-link :fixed-box="true" :link-items="items" link-path="/financeCalendar/"></icon-router-link>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
import IconRouterLink from '@/components/IconRouterLink'

export default {
  name: 'financeCalendar',
  components: {
    IconRouterLink
  },
  data () {
    return {
      items: [
        {
          icon: require('../../assets/img/event.png'),
          iconActive: require('../../assets/img/event-active.png'),
          text: '大事件',
          link: 'event'
        },
        {
          icon: require('../../assets/img/data.png'),
          iconActive: require('../../assets/img/data-active.png'),
          text: '数据',
          link: 'data'
        },
        {
          icon: require('../../assets/img/shareholdersBoard.png'),
          iconActive: require('../../assets/img/shareholdersBoard-active.png'),
          text: '股东会',
          link: 'shareholdersBoard'
        },
        {
          icon: require('../../assets/img/newStock.png'),
          iconActive: require('../../assets/img/newStock-active.png'),
          text: '新股',
          link: 'newStock'
        },
        {
          icon: require('../../assets/img/suspension.png'),
          iconActive: require('../../assets/img/suspension-active.png'),
          text: '停复牌',
          link: 'suspension'
        }
      ]
    }
  }
}
</script>

<style scoped>
/*.gray{
  position: absolute;
  top: 0;
  display: block;
  z-index: -1;
  width: 100%;
  height: 0.4rem;
  background-color: #f7f7f7;
}
.link-box{
  position: fixed;
  width: 100%;
  z-index: 999;
  background-color: #fff;
  padding-top: 0.27rem;
  color: #2e2e37;
  font-size: 12px;;
}
.link-item{
  text-align: center;
  border-bottom: 1px solid #ccc;
  display: inline-block;
  width: 20%;
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
}*/

.view{
  padding-top: 2.24rem;
}
</style>
