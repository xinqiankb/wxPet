//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    showLoading: false,
    initWidth: 0,
    singleWidth: 0,
    slideWidth: 0,
    slideIndex: 0,
    loadingEnd: false,
    showname: true,
    newname: '',
    showPage: {
      isPageTwo: true,
      isPageThr: true
    },
    sex: -1,
    petid: '',
    pet: [
      { id: 1, name: 'ceshi1', url: "http://p0vydhsfu.bkt.clouddn.com/dog.png" },
      { id: 2, name: 'ceshi2', url: "http://p0vydhsfu.bkt.clouddn.com/cat.png" },
      { id: 3, name: 'ceshi3', url: "http://p0vydhsfu.bkt.clouddn.com/chicken.png" },
      { id: 4, name: 'ceshi4', url: "http://p0vydhsfu.bkt.clouddn.com/pig.png" },
      { id: 5, name: 'ceshi5', url: "http://p0vydhsfu.bkt.clouddn.com/rabbit.png" },
    ]
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
    let c = this.setInitWidth()
    that.setData({
      initWidth: c * 3,
      singleWidth: c - 20
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  setInitWidth: function() {
    let that = this
    let c = 0
    wx.getSystemInfo({
      success: function(res) {
        c = res.windowWidth
      },
    })
    return c
  },
  onReady: function() {
    var that = this
    setTimeout(() => {
      that.setData({
        showLoading: true,
        loadingEnd: false
      })
    }, 500)
  },
  // to index
  goIndex: () => {
    wx.switchTab({
      url: '../index/index',
    })
  },
  // 页面切换
  goToNextBlock() {
    let that =this
    let c = this.setInitWidth()
    that.data.slideIndex += 1
    let selectinfo = app.globalData.selectInfo
    let pageshow = {
      isPageTwo: true,
      isPageThr: true     
    }
    switch (that.data.slideIndex) {
      case 1:
        pageshow.isPageTwo = false;
        pageshow.isPageThr = true;
        break;
      case 2:
        pageshow.isPageThr = false;
        pageshow.isPageTwo = false;
        break;
    }
    if (selectinfo.sex === '') {
      app.showModel('请选择角色', '')
      return false
    }
    let slideWidth = -((c - 20) * that.data.slideIndex)
    console.log(that.data.slideIndex + 'p')
    that.setData({
      slideWidth: slideWidth,
      showPage: pageshow
    })
  },
  goToPreBlock() {
    let that = this
    let c = this.setInitWidth()
    let slideIndex = that.data.slideIndex
    slideIndex = slideIndex === 0 ? 0 : slideIndex - 1
    console.log(slideIndex)
    let slideWidth = -((c - 20) * slideIndex)
    that.setData({
      slideWidth: slideWidth,
      slideIndex: slideIndex
    })
  },
  showName(obj) {
    console.log(obj)
    let that = this
    let id = obj.target.id
    let pet = that.data.pet
    that.setData({
      petid: id
    })
    app.globalData.selectInfo.pet_id = id
    app.globalData.selectInfo.petimg = pet[id-1]['url']
    app.globalData.selectInfo.petname = pet[id-1]['name']
  },
  showPetsInfo() {
    console.log(11)
    wx.switchTab({
      url: '../pets/pets'
    })
  },
  //bindKetInput
  bindKeyInput: function (e) {
    console.log(e)
    let that = this
    that.setData({
      newname: e.detail.value
    })
  },
  //selectSex
  selectSex: function(e) {
    let that = this
    let sex = e.currentTarget.id
    app.globalData.selectInfo.sex = sex
    that.setData({
      sex: sex
    })
  },
  // nameChangeSubmit
  nameChangeSubmit: function () {
    let that = this
    let newname = that.data.newname
    let petInfo = app.globalData.selectInfo
    let isget = app.globalData.selectInfo.isget
    if (newname == '') {
      app.showModel('请输入宠物名称', '')
    } else {
      let title = isget === 0 ? '恭喜获得萌宠' : '修改成功!'
        app.globalData.selectInfo.petname = newname
        app.globalData.selectInfo.isget = 1
        const data = {
          data: JSON.stringify(app.globalData.selectInfo)
        }
        app.postRequest('Index/savePets', 'POST', data, function(res) {
          let code = res.data.code
          let msg = res.data.msg
          if (code === 1) {
            app.showToast('恭喜获得萌宠', function(res) {
              setTimeout(() => {
                wx.switchTab({
                  url: '../pets/pets',
                })
              }, 800)
            })
          }
        })
    }
  }
})
