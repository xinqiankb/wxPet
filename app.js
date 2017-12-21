//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (e) {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              that.getOpenId(e.code)
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getOpenId: function(code) {
    let that = this
    let data = {'code': code}
    that.postRequest('Index/getOpenid', 'POST', data, function(res) {
      let openid = res.data.data.openid
      let userinfo = that.globalData.userInfo
      userinfo.openid = openid
      that.globalData.selectInfo.openid = openid
      that.postRequest('Index/userlogin', 'POST', userinfo, function (res) {
        that.getPetsInfo(openid)
      })
    })
  },
  // 宠物信息
  getPetsInfo: function(params) {
    let that = this
    const data = {
      openid: params
    }
    that.postRequest('Index/getPetsInfo', 'GET', data, function (res) {
      console.log(res)
      let code = res.data.code
      let data = res.data.data
      if (code === 1) {
        that.globalData.selectInfo = Object.assign(that.globalData.selectInfo, data)
      }
      console.log(that.globalData.selectInfo)
    })
  },
  postRequest: function(url, method, data, fn){
    wx.request({
      url: this.globalData.host + url,
      method: method,
      header: { 'Content-type': 'application/x-www-form-urlencoded' },
      data: data,
      success: function(res) {
        fn(res)
      },
      faile: function(err) {console.log(err)}
    })
  },
  // showModel
  showModel: function(content, fn) {
    wx.showModal({
      title: '温馨提示',
      content: content,
      success: function (res) {
        fn(res)
      }
    })
  },
  showToast: (content, fn) => {
    wx.showToast({
      title: content,
      icon: 'success',
      duration: 2000,
      success: function (res) {
        fn(res)
      }
    })
  },
  globalData:{
    code: '',
    userInfo:null,
    host: 'https://wxpet.d.youjiadv.com/Home/',
    selectInfo: {
      level: 1,
      openid: '',
      petimg: '',
      sex: '',
      pet_id: 0,
      slideIndex: 1,
      petname: '',
      isget: 0,
      petattr: [
        { attr:'all' ,name: '战斗力', value: 5, isshow: 0},
        { attr: 'attack', name: '攻击力', value: 1, isshow: 1 },
        { attr: 'defense', name: '防御力', value: 1, isshow: 1  },
        { attr: 'crit', name: '暴击力', value: 3, isshow: 1  },
        { attr: 'clutch', name: '必杀技', value: '未领悟', isshow: 0  }
      ]
    }
  }
})