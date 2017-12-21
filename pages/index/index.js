//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    loadingShow: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    app.getUserInfo(function (userInfo) {
      that.setData({
         userInfo: userInfo
      })
    })
  },
  onReady: function() {
    var that = this
    setTimeout(() => {
      that.setData({
        loadingShow: true
      })
    }, 600)
  },
  // 判断页面走向
  toNextPage: function() {
    let that = this
    let isget = app.globalData.selectInfo.isget
    console.log(isget)
    if (isget === 0) {
      wx.navigateTo({
        url: '../guide/guide',
      })
    } else {
      wx.switchTab({
        url: '../pets/pets',
      })
    }
  }
})
