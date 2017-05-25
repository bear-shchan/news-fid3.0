<template>
  <div class="mh-box">
    <template v-for="(item, index) in headerArr">
      <div class="header">{{item}}</div>
      <div class="item-box clearfix">
        <router-link tag="div" :to="item.path" class="item" 
          v-for="item in navArr[index]"
          key="item.icon"
          :class="item.permission">
          <img :src="item.imgPath" class="icon">
          <p class="text">{{item.name}}</p>
        </router-link>
      </div>
    </template>
  </div>
</template>

<script>
import {nav} from '../router-config.js'

const doneView = ['7*24小时', '个股行情', '两融资讯', '主题追踪', '预知未来', '财经日历', '主题选基', '小白财经', '定点播报',
  '异动点评', '求一票', '求一基']

export default {
  name: '',
  data () {
    return {
      headerArr: [
        '场景化资讯包',
        '智能化产品',
        '智能化理财产品',
        '原创资讯'
      ],
      navArr: [
        [],
        [],
        [],
        []
      ]
    }
  },
  created () {
    console.log(nav)
    this.navFormat()
  },
  methods: {
    navFormat () {
      let doneViewStr = doneView.join(',')

      for (let i = 0, len = nav.length; i < len; i++) {
        // 处理权限（当前暂时为完成进度）
        nav[i].permission = doneViewStr.indexOf(nav[i].name) !== -1 ? '' : 'no-hasPerm'
        // 处理图片
        let navIcon = nav[i].icon
        nav[i].imgPath = require('../assets/img/' + navIcon + '.png')
        // 分配数组
        this.navArr[nav[i].column - 1].push(nav[i])
      }
    }
  }
}
</script>

<style scoped>
/*.box{
  min-height: 100vh;
}*/
.header{
  line-height: 1.01rem;
  font-size: 14px;
  color: #171717;
  padding-left: 0.4rem;
  border-bottom: 1px solid #ececec;
}
.header:first-of-type:before{
  height: 0;
}
.header:before{
  content: ' ';
  display: block;
  height: 0.27rem;
  background-color: #f7f7f7;
  margin-left: -0.4rem;
}
.item-box{
  padding-bottom: 0.4rem;
}
.item{
  display: inline-block;
  float: left;
  width: 25%;
  text-align: center;
  margin-top: 0.4rem;
  color: #4e4e4e;
  height: 1.28rem;
}
.item .text{
  margin-top: -0.13rem;
}
.item.no-hasPerm,
.item.no-hasPerm .icon{
  opacity: .6;
}
.icon{
  width: 0.77rem;
  height: 0.77rem;
}
</style>
