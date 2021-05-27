const app = getApp()
Page({
  data: {
    avatarUrl: '/images/user-unlogin.png',
    userInfo: {},
    logged: false
  },
  onLoad: function() {
    const userInfo = wx.getStorageSync('userStorageInfo')
    if (useInfo._id) {
      this.setData({
        logged: true,
        avatarUrl: userInfo.avatarUrl,
        userInfo: userInfo
      })
      app.globalData.userInfo = userInfo
      app.globalData.userLogin = true
    } else {
      wx.cloud.callFunction({
        name: 'InitInfo',
        data: {
          type: 'GETUSERINFO'
        },success: res => {
          this.setData({
            logged: true,
            avatarUrl: res.result.data[0].avatarUrl,
            userInfo: res.result.data[0]
          })
          app.globalData.userInfo = res.result.data[0]
          app.globalData.userLogin = true
          wx.setStorageSync('userStorageInfo', res.result.data[0])
        },fail: err => {
          console.log('err', err)
        }
      })
    }
  },
  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
      app.globalData.userInfo = e.detail.userInfo
      app.globalData.userLogin = true
      wx.setStorageSync('userStorageInfo', e.detail.userInfo)
      wx.cloud.callFunction({
        name: 'InitInfo',
        data: {
          type: 'ADDUSERINFO',
          data: e.detail.userInfo
        },success: res => {
          console.log('suc', res)
        },fail: err => {
          console.log('err', err)
        }
      })
    }
  },
  loginAdminManager() {
    if (this.data.userInfo.nickName) {
      wx.navigateTo({
        url: "../../Adminpackage/managerHome/managerHome?id=" + this.data.userInfo.nickName,
      })
    }
  },
  showQrcode() {
    // wx.previewImage({
    //   urls: ['https://image.weilanwl.com/color2.0/zanCode.jpg'],
    //   current: 'https://image.weilanwl.com/color2.0/zanCode.jpg' // 当前显示图片的http链接      
    // })
  },
})
