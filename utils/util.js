function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 产生随机数
function createRandom() {
  let data = Math.random() * 4 / 2
  if (data > 3 ){
    data = 3
  } else if (data < 1) {
    data = 1
  }
  return data.toFixed(1)
}

module.exports = {
  formatTime,
  createRandom
}
