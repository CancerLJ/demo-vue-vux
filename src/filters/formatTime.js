import Vue from 'vue'

// 时间戳转换 yy-mm-dd hh:mm:ss 格式
Vue.filter('formatTime', function(value) {
  if (!value) {
    return ''
  }

  var date = new Date()
  // date.setTime(Number(value) * 1000) // 这里是秒级时间戳
  date.setTime(Number(value)) // 这里是毫秒级时间戳
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  var h = date.getHours()
  h = h < 10 ? ('0' + h) : h
  var minute = date.getMinutes()
  var second = date.getSeconds()
  minute = minute < 10 ? ('0' + minute) : minute
  second = second < 10 ? ('0' + second) : second
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
})
