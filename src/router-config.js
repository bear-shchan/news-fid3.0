const nav = [
  {
    name: '7*24小时',
    // component: 'RouterView',
    path: '/everytime',
    component: 'template',
    icon: 'everytime',
    column: '1'
  },
  {
    name: '个股行情',
    path: '/singleStock',
    component: 'template',
    icon: 'singleStock',
    column: '1'
  },
  {
    name: '两融资讯',
    path: '/financing/equityTrading',
    component: 'Financing',
    icon: 'financing',
    column: '1'
  },
  {
    name: '主题追踪',
    path: '/subjectTrack',
    component: 'SubjectTrack/SubjectTrackList',
    icon: 'subjectTrack',
    column: '1'
  },
  {
    name: '预知未来',
    path: '/precognition',
    component: 'PrecognitionList',
    icon: 'precognition',
    column: '1'
  },
  {
    name: '赏妖股',
    path: '/monsterStock',
    component: 'template',
    icon: 'monsterStock',
    column: '1'
  },
  {
    name: '财经日历',
    path: '/financeCalendar/event',
    component: 'template',
    icon: 'financeCalendar',
    column: '1'
  },
  {
    name: '异动点评',
    path: '/transaction',
    component: 'template',
    icon: 'transaction',
    column: '1'
  },
  {
    name: '时光机',
    path: '/timeMachineList',
    component: 'template',
    icon: 'timeMachine',
    column: '2'
  },
  {
    name: '求一票',
    // path: '/requestTicket',
    path: '/ticket',
    component: 'template',
    icon: 'requestTicket',
    column: '2'
  },
  {
    name: '主题选基',
    path: '/fundSelect',
    component: 'FundSelect/FundSelect/FundSelect',
    icon: 'fundSelect',
    column: '3'
  },
  {
    name: '求一基',
    // path: '/requestFund',
    path: '/fund',
    component: 'template',
    icon: 'requestFund',
    column: '3'
  },
  {
    name: '基会宝',
    path: '/fundChance',
    icon: 'fundChance',
    column: '3'
  },
  {
    name: '小白财经',
    path: '/newbieFinance',
    component: 'NewbieFinance/NewbieFinanceListFisrt',
    icon: 'newbieFinance',
    column: '4'
  },
  {
    name: '定点播报',
    path: '/report',
    component: 'template',
    icon: 'report',
    column: '4'
  },
  {
    name: '涨停预测',
    path: '/todayKnowSecond/2',
    component: 'template',
    icon: 'icon22',
    column: '4'
  },
  {
    name: '蓉儿看盘',
    path: '/todayKnowSecond/1',
    component: 'template',
    icon: 'icon23',
    column: '4'
  },
  {
    name: '飞笛策略',
    path: '/todayKnowSecond/5',
    component: 'template',
    icon: 'icon24',
    column: '4'
  },
  {
    name: '产业报告',
    path: '/todayKnowSecond/6',
    component: 'template',
    icon: 'icon25',
    column: '4'
  },
  {
    name: '港股资讯',
    path: '/HKStocks',
    component: 'template',
    icon: 'HKStocks',
    column: '4'
  },
  {
    name: '基本面选股',
    path: '/fundamental',
    icon: 'fundamental',
    column: '2'
  }
  // {
  //   name: '表单',
  //   path: '/form',
  //   children: [
  //     {
  //       name: '基础表单',
  //       component: 'template',
  //       path: 'baseform'
  //     }
  //   ]
  // }
]

// const other = [
//   {
//     title: '预知未来',
//     path: '/precognitionDetail/:tagname',
//     component: 'precognitionDetail'
//   },
//   {
//     name: '实时主题',
//     path: '/fundList',
//     component: 'FundSelect/FundList'
//   },
//   {
//     path: '/fundSelectDetails/:tagname',
//     component: 'FundSelect/FundSelectDetails'
//   },
//   {
//     path: '/fundDetails/:id',
//     component: 'FundSelect/FundDetails/FundDetails'
//   },
//   {
//     name: '历史净值',
//     path: '/historyNetWorth/:id',
//     component: 'FundSelect/NetWorth'
//   }
// ]

export {
  nav
  // other
}
