//logs.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    logs: [],
    selectPetLogo: '',
    showname: true,
    petname: '',
    newname: '',
    doSomething: false,
    petInfo: {},
    attrData: 2,
    topdis: 50,
    showUpdate: ''
  },
  onLoad: function () {
  },
  onShow: function() {
    var that = this
    let petInfo = app.globalData.selectInfo
    if (petInfo.isgetPet === 0) {
      wx.showModal({
        title: '温馨提示',
        content: '请先去选择你的萌宠哦',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../guide/guide',
            })
          } else if (res.cancel) {
            wx.switchTab({
              url: '../index/index',
            })
          }
        }
      })
    }
    that.setData({
      petInfo: petInfo,
      petname: petInfo.petname
    })
  },
  // goBack
  goBack: function() {
    let that = this
    let info = app.globalData.selectInfo
    if (info.sex === '' || info.pet === '') {
      wx.navigateTo({
        url: '../guide/guide?slideIndex=' + info.slideIndex,
      })
    } else {
      wx.navigateBack()
    }
  },
  // pk
  toToPk: function() {
    wx.navigateTo({
      url: '../play/play',
    })
  },
  // 提升宠物属性
  updateDigital(obj) {
    let that = this
    let type = obj.currentTarget.id
    let randomData = util.createRandom();
    let petInfo = app.globalData.selectInfo
    petInfo.petattr.map(function(item, i) {
      if (item.attr === type) {
        item.value += Number(randomData)
      }
    })
    console.log(petInfo.petattr)
    app.showModel('是否消耗2金币来提升宠物', function(res) {
      if (res.confirm) {
        app.globalData.selectInfo.petattr = petInfo.petattr
        // 数据更新
        const data = {
          petattr
          : petInfo.petattr,
          openid: app.globalData.userInfo.openid
        }
        app.postRequest('Index/editPetsInfo', 'POST', {data: JSON.stringify(data)}, function(res) {
          let code = res.data.code
          let msg = res.data.msg
          console.log(res)
          if (code === 1) {
            that.setData({
              topdis: 30,
              showUpdate: 'showUpdate',
              attrData: randomData,
              petInfo: petInfo
            })
            setTimeout(() => {
              that.setData({
                showUpdate: '',
                topdis: 50
              })
            }, 1000)
          } else {
            app.showModel(msg, function(res) {})
          }
        })
      }
    })
    // 数据提交
  },
  changeName: function() {
    var that = this
    that.setData({
      showname: false
    })
  },
  //bindKetInput
  bindKeyInput: function(e) {
    console.log(e)
    let that = this
    that.setData({
      newname: e.detail.value
    })
  },
  // nameChangeSubmit
  nameChangeSubmit: function() {
    let that = this
    let newname = that.data.newname
    let selectInfo = app.globalData.selectInfo
    if (newname == '') {
      app.showModel('请输入宠物名称')
    } else {
      const data = {
        petname: newname,
        openid: selectInfo.openid
      }
      app.postRequest('Index/changePetsInfo', 'POST', data, function(res) {
        let code = res.data.code
        let msg = res.data.msg
        console.log(res)
        if (code === 1) {
          app.showToast(msg, function() {
            app.globalData.selectInfo.petname = newname
            that.setData({
              showname: true,
              petname: newname
            })
          })
        }
      })
    }
  }
})
