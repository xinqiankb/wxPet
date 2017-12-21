//logs.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    logs: [],
    recevieList: [],
    inputValue: '',
    isconnect: false
  },
  onLoad: function () {
  },
  onShow: function() {
    let that = this
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
      that.data.isconnect = false
    })
    wx.onSocketOpen(function (res) {
      that.data.isconnect = true
      console.log('WebSocket连接已打开！')
    })
  },
  // 获取input的值
  handleInputValue: function(e) {
    let that = this
    that.setData({
      inputValue: e.detail.value
    })
  },
  // 发送消息
  pushMessage: function() {
    let that = this
    let msg = that.data.inputValue
    if (that.data.isconnect) {
      wx.sendSocketMessage({
        data: msg,
      })
      let list = that.data.recevieList
      wx.onSocketMessage(function (res) {
        console.log(res)
        list.push({ 'date': res.data })
        let temp = that.data.recevieList
        temp.concat(list)
        that.setData({
          recevieList: temp
        })
      })
      console.log(that.data.isconnect)
    } else {
      console.log(that.data.isconnect)
    }
  },
  connectWebSocket: function() {
    wx.connectSocket({
      url: 'wss://hl.d.youjiadv.com',
      success: function(res) {
        console.log(res)
      },
      complete: function(res) {
        console.log('complete')
      }
      
    })
  },
  closeWebsocket: function() {
    wx.sendSocketMessage({
      data: 'websocketClose'
    })
    wx.closeSocket({
      reason: 'test',
      success: function(res) {
        // this.listenCloseSocket()
      },
      fail: function(err) {
        console.log(err)
      },
      complete: function(res) {
        console.log('xiqnian')
      }
    })
  },
  listenCloseSocket: function () {
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
    })
  }
})
