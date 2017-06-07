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
    name: '求一票',
    path: '/external/ticket',
    component: resolve => require(['../views/template.vue'], resolve)
  },
  {
    name: '求一基',
    path: '/external/fund',
    component: resolve => require(['../views/template.vue'], resolve)
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
    name: '异动点评',
    path: '/transaction',
    component: resolve => require(['../views/Transaction/Transaction.vue'], resolve)
  },
  {
    // name: '异动点评详情页',
    path: '/transactionDetail/:id',
    component: resolve => require(['../views/Transaction/TransactionDetail.vue'], resolve)
  },
  {
    name: '港股资讯',
    path: '/HKStocks',
    component: resolve => require(['../views/HKStocks/HKStocks.vue'], resolve)
  },
  {
    // name: '港股资讯详情页',
    path: '/HKStocksDetail/:id',
    component: resolve => require(['../views/HKStocks/HKStocksDetail.vue'], resolve)
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
    name: '赏妖股',
    path: '/monsterStock',
    component: resolve => require([`../views/MonsterStock/MonsterStockList.vue`], resolve)
  },
  {
    title: '赏妖股',
    path: '/monsterStockDetail/:id',
    component: resolve => require([`../views/MonsterStock/MonsterStockDetail.vue`], resolve)
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
    meta: {
      name: '主题追踪'
    },
    path: '/SubjectTrackDetail/:id',
    component: resolve => require([`../views/SubjectTrack/SubjectTrackDetail.vue`], resolve)
  },
  {
    meta: {
      name: '主题追踪'
    },
    path: '/hotStock/:id',
    component: resolve => require([`../views/SubjectTrack/HotStock.vue`], resolve)
  },
  {
    meta: {
      name: '主题追踪'
    },
    path: '/newsDetail/:id',
    component: resolve => require([`../views/SubjectTrack/newsDetail.vue`], resolve)
  },
  {
    name: '小白财经',
    path: '/newbieFinance',
    component: resolve => require([`../views/NewbieFinance/NewbieFinanceListFisrt.vue`], resolve)
  },
  {
    meta: {
      name: '小白财经'
    },
    path: '/newbieFinanceSecond/:id',
    component: resolve => require([`../views/NewbieFinance/NewbieFinanceListSecond.vue`], resolve)
  },
  {
    meta: {
      name: '小白财经'
    },
    path: '/newbieFinanceDetail/:id',
    component: resolve => require([`../views/NewbieFinance/NewbieFinanceDetail.vue`], resolve)
  },
  {
    name: '今日必知',
    path: '/todayKnow',
    component: resolve => require([`../views/TodayKnow/TodayKnowListFisrt.vue`], resolve)
  },
  {
    // name: '今日必知',
    path: '/todayKnowSecond/:tagname',
    component: resolve => require([`../views/TodayKnow/TodayKnowListSecond.vue`], resolve)
  },
  {
    // name: '今日必知',
    path: '/todayKnowDetail/:id',
    component: resolve => require([`../views/TodayKnow/TodayKnowDetail.vue`], resolve)
  },
  {
    // name: '今日必知',
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
        meta: {
          name: '财经事件'
        },
        path: 'eventDetail',
        component: resolve => require([`../views/FinanceCalendar/EventDetail.vue`], resolve)
      },
      {
        name: '财经数据',
        path: 'data',
        component: resolve => require([`../views/FinanceCalendar/Data.vue`], resolve)
      },
      {
        meta: {
          name: '财经数据'
        },
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
  },
  {
    // name: '个股详情页',
    path: '/singleStockDetail',
    component: resolve => require([`../views/singleStock/Detail.vue`], resolve),
    children: [
      {
        // name: '资讯',
        path: 'information/:tagName',
        component: resolve => require([`../views/singleStock/Stock/Information.vue`], resolve)
      },
      {
        // name: '主题',
        path: 'topic/:tagName',
        component: resolve => require([`../views/singleStock/Stock/Topic.vue`], resolve)
      },
      {
        // name: '公告',
        path: 'announcement/:tagName',
        component: resolve => require([`../views/singleStock/Stock/Announcement.vue`], resolve)
      },
      {
        // name: 'F10',
        path: 'f10/:tagName',
        component: resolve => require([`../views/singleStock/Stock/F10.vue`], resolve)
      }
    ]
  },
  {
    // name: '大盘详情页',
    path: '/tapeDetail',
    component: resolve => require([`../views/singleStock/Detail.vue`], resolve),
    children: [
      {
        // name: '围观大盘',
        path: 'onlookersTape/:tagName',
        component: resolve => require([`../views/singleStock/Tape/OnlookersTape.vue`], resolve)
      },
      {
        // name: '涨幅榜',
        path: 'roseList/:tagName',
        component: resolve => require([`../views/singleStock/Tape/RoseList.vue`], resolve)
      },
      {
        // name: '跌幅榜',
        path: 'dropList/:tagName',
        component: resolve => require([`../views/singleStock/Tape/DropList.vue`], resolve)
      }
    ]
  },
  {
    // name: '个股公告详情页',
    path: '/singleStockAnnouncement/:id',
    component: resolve => require([`../views/singleStock/Stock/AnnouncementDetail.vue`], resolve)
  },
  {
    // name: '围观大盘详情页',
    path: '/onlookersTapeDetail/:id',
    component: resolve => require([`../views/singleStock/Tape/OnlookersTapeDetail.vue`], resolve)
  },
  {
    name: '时光机',
    path: '/timeMachine',
    component: resolve => require([`../views/TimeMachine/TimeMachineList.vue`], resolve)
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
  // mode: 'history',
  routes
})
