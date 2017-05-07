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
    name: '两融',
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
    path: '/economicCalendar',
    component: 'template',
    icon: 'economicCalendar',
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
    path: '/timeMachine',
    component: 'template',
    icon: 'timeMachine',
    column: '2'
  },
  {
    name: '求一票',
    path: '/requestTicket',
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
    path: '/requestFund',
    component: 'template',
    icon: 'requestFund',
    column: '3'
  },
  {
    name: '小白财经',
    path: '/newbieFinance',
    component: 'template',
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
    name: '港股资讯',
    path: '/HKStocks',
    component: 'template',
    icon: 'HKStocks',
    column: '4'
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
