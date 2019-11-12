const utils = {
  createCode() {
    let code = ''
    for (let i = 0; i < 6; i++){
      code += Math.floor(Math.random() * 10)
    }
    return code
  },
  createOrderId() {
    let orderId = ''
    for (let i = 0; i < 16; i++){
      orderId += Math.floor(Math.random() * 10)
    }
    return orderId
  },
  formatTime() {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let Hours = date.getHours()
    let Minutes = date.getMinutes()
    let Seconds = date.getSeconds()
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    let createTime = year + '-' + month + '-' + day + ' ' + Hours + ':' + Minutes + ':' + Seconds
    return createTime
  }
}

module.exports = utils
