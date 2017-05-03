import Vue from 'vue'
import Router from 'vue-router'

// import {nav, other} from '../router-config'

Vue.use(Router)

// const getComponent = component => require(`../views/${component}.vue`)

let routes = [
  {
    name: '飞笛资讯',
    path: '/',
    component: resolve => require([`../views/Home.vue`], resolve)
  },
  {
    name: '登录',
    path: '/login',
    component: resolve => require([`../views/Login.vue`], resolve)
  },
  {
    name: '预知未来',
    path: '/precognition',
    component: resolve => require([`../views/Precognition/PrecognitionList.vue`], resolve)
  },
  {
    title: '预知未来',
    path: '/precognitionDetail/:tagname',
    component: resolve => require([`../views/Precognition/PrecognitionDetail.vue`], resolve)
  },
  {
    name: '主题选基',
    path: '/fundSelect',
    component: resolve => require([`../views/FundSelect/FundSelect/FundSelect.vue`], resolve)
  },
  {
    name: '实时主题',
    path: '/fundList',
    component: resolve => require([`../views/FundSelect/FundList.vue`], resolve)
  },
  {
    path: '/fundSelectDetails/:tagname',
    component: resolve => require([`../views/FundSelect/FundSelectDetails.vue`], resolve)
  },
  {
    path: '/fundDetails/:id',
    component: resolve => require([`../views/FundSelect/FundDetails/FundDetails.vue`], resolve)
  },
  {
    name: '历史净值',
    path: '/historyNetWorth/:id',
    component: resolve => require([`../views/FundSelect/NetWorth.vue`], resolve)
  }
]

// let routerAll = nav.concat(other)

// routerAll.forEach((mod) => {
//   if (mod.children) {
//     let subMenus = mod.children

//     var children = subMenus.map((subMenu) => {
//       return {
//         path: subMenu.path,
//         name: subMenu.name,
//         // meta: {
//         //   parentName: mod.name
//         // },
//         component: getComponent(subMenu.component)
//       }
//     })
//   }

//   const parent = {
//     path: mod.path,
//     name: mod.name,
//     component: mod.component ? getComponent(mod.component) : getComponent('RouterView')
//   }

//   if (children) {
//     parent.children = children
//   }

//   routes.push(parent)
// })

// console.log(routes)

export default new Router({
  routes
})
