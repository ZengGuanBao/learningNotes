const app = getApp()
Page({
  data: {
    avatarUrl: '/images/user-unlogin.png',
    userInfo: {},
    logged: false,
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
  },
  onLoad: function() {
    let userStorageInfo = wx.getStorageSync('userStorageInfo');
    if (userStorageInfo.nickName) {
      this.setData({
        logged: true,
        avatarUrl: userStorageInfo.avatarUrl,
        userInfo: userStorageInfo
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
    }
  },
  loginAdminManager() {
    console.log(this.data.userInfo)
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
