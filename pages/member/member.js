//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    showLoading: false,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onReady: function() {
    var that = this
    setTimeout(() => {
      that.setData({
        showLoading: true
      })
    }, 500)
  },
  gotopets: function() {
    wx.switchTab({
      url: '../pets/pets',
    })
  },
  gotocompetitions: function() {
    wx.navigateTo({
      url: '../compentition/compentition',
    })
  },
  gotoRinking: function() {
    wx.navigateTo({
      url: '../rank/rank',
    })
  }
})
