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
    name: '7x24小时',
    path: '/everytime',
    component: resolve => require(['../views/Everytime/Everytime.vue'], resolve)
  },
  {
    path: '/everytimeTag/:tagName',
    component: resolve => require(['../views/Everytime/EverytimeTag.vue'], resolve)
  },
  {
    // name: '个股行情',
    path: '/singleStock',
    component: resolve => require(['../views/SingleStock/SingleStock.vue'], resolve)
  },
  {
    name: '定点播报',
    path: '/report',
    component: resolve => require(['../views/Report/Report.vue'], resolve)
  },
  {
    // name: '定点播报详情页',
    path: '/reportDetail/:id',
    component: resolve => require(['../views/Report/ReportDetail.vue'], resolve)
  },
  {
    name: '两融',
    path: '/financing',
    component: resolve => require(['../views/Financing/Financing.vue'], resolve),
    children: [
      {
        meta: {
          name: '两融'
        },
        path: 'equityTrading',
        component: resolve => require(['../views/Financing/EquityTrading.vue'], resolve)
      },
      {
        meta: {
          name: '两融'
        },
        path: 'securitiesLoan',
        component: resolve => require(['../views/Financing/SecuritiesLoan.vue'], resolve)
      }
    ]
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
  },
  {
    name: '主题追踪',
    path: '/subjectTrack',
    component: resolve => require([`../views/SubjectTrack/SubjectTrackList.vue`], resolve)
  },
  {
    name: '主题追踪',
    path: '/SubjectTrackDetail/:id',
    component: resolve => require([`../views/SubjectTrack/SubjectTrackDetail.vue`], resolve)
  },
  {
    name: '主题追踪',
    path: '/hotStock/:id',
    component: resolve => require([`../views/SubjectTrack/HotStock.vue`], resolve)
  },
  {
    name: '小白财经',
    path: '/newbieFinance',
    component: resolve => require([`../views/NewbieFinance/NewbieFinanceListFisrt.vue`], resolve)
  },
  {
    name: '小白财经',
    path: '/newbieFinanceSecond/:tagname',
    component: resolve => require([`../views/NewbieFinance/NewbieFinanceListSecond.vue`], resolve)
  },
  {
    name: '小白财经',
    path: '/newbieFinanceSecond/:tagname/:id',
    component: resolve => require([`../views/NewbieFinance/NewbieFinanceDetail.vue`], resolve)
  },
  {
    name: '今日必知',
    path: '/todayKnow',
    component: resolve => require([`../views/TodayKnow/TodayKnowListFisrt.vue`], resolve)
  },
  {
    name: '今日必知',
    path: '/todayKnowSecond/:tagname',
    component: resolve => require([`../views/TodayKnow/TodayKnowListSecond.vue`], resolve)
  },
  {
    name: '今日必知',
    path: '/todayKnowDetail/:id',
    component: resolve => require([`../views/TodayKnow/TodayKnowDetail.vue`], resolve)
  },
  {
    name: '今日必知',
    path: '/specialSubject/:id',
    component: resolve => require([`../views/TodayKnow/SpecialSubjectDetail.vue`], resolve)
  },
  {
    name: '财经日历',
    path: '/financeCalendar',
    component: resolve => require([`../views/FinanceCalendar/FinanceCalendar.vue`], resolve),
    children: [
      {
        name: '财经事件',
        path: 'event',
        component: resolve => require([`../views/FinanceCalendar/Event.vue`], resolve)
      },
      {
        name: '财经事件',
        path: 'eventDetail',
        component: resolve => require([`../views/FinanceCalendar/EventDetail.vue`], resolve)
      },
      {
        name: '财经数据',
        path: 'data',
        component: resolve => require([`../views/FinanceCalendar/Data.vue`], resolve)
      },
      {
        name: '财经数据',
        path: 'dataDetail',
        component: resolve => require([`../views/FinanceCalendar/DataDetail.vue`], resolve)
      },
      {
        name: '股东会',
        path: 'shareholdersBoard',
        component: resolve => require([`../views/FinanceCalendar/ShareholdersBoard.vue`], resolve)
      },
      {
        name: '新股',
        path: 'newStock',
        component: resolve => require([`../views/FinanceCalendar/NewStock.vue`], resolve)
      },
      {
        name: '停复牌',
        path: 'suspension',
        component: resolve => require([`../views/FinanceCalendar/Suspension.vue`], resolve)
      }
    ]
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
