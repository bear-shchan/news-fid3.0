import moment from 'moment'
/*
  今日显示时分  非今日显示日月
*/
export default function formatTime (date) {
  var d = new Date().getTime()
  var ymd = moment(d).format('YYYY-MM-DD')
  if (moment(date).format('YYYY-MM-DD') === ymd) {
    return moment(date).format('HH:mm')
  } else {
    return moment(date).format('MM-DD')
  }
}
