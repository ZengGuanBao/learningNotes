// app.js
import webapi from 'utils/webapi'
import utils from 'utils/utils'
import auth from 'utils/auth'

App({
  async onLaunch() {
    wx.getSystemInfo({
      success: res => {
        this.globalData.screenWidth = res.screenWidth
        this.globalData.screenHeight = res.screenHeight
        this.globalData.platform = res.platform
        const model = res.model
        const iphoneArr = ['iPhone X', 'iPhone 11']
        iphoneArr.forEach((item) => {
          if (model.search(item) !== -1) {
            this.globalData.isIphoneX = true
          }
        })
      }
    })
    // 微信登录
    auth.getSession(this)
    if (utils.checkIsLogin()) {
      const result = await webapi.getUserInfo()
      if (result.code === 'K-000000') {
        utils.setUserInfo(result.context)
        // 是否获取过首页分享小程序码
        if (utils.getMiniprogramCode() === '') {
          this.getInviteWxaCode()
        }
      } else if (result.code === 'K-010005') { // token 失效
        utils.clearAllUserInfo()
      }
    }
  },
  onShow() {
    wx.getSystemInfo({
      success: res => {
        if (res.platform !== 'devtools') {
          const pages = getCurrentPages()
          if (pages.length === 0) {
            this.alertClipboardDataFun()
          } else if ((pages[0].route.indexOf('/confirmOrder/confirmOrder') !== -1 || pages[0].route.indexOf('/payResult/payResult') !== -1) && this.globalData.alertClipboardData === false) {
          } else {
            this.alertClipboardDataFun()
          }
        }
      }
    })
  },
  alertClipboardDataFun() {
    const that = this
    // 搜索剪贴板的内容
    wx.getClipboardData({
      success(res) {
        const clipboardData = res.data
        if (res.data !== '') {
          that.globalData.alertClipboardData = true
          wx.showModal({
            title: '是否搜索以下商品',
            content: res.data,
            confirmText: '搜索商品',
            confirmColor: '#FD4073',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../../pages/searchBar/searchBar?seachval=' + clipboardData
                })
              }
            },
            complete() {
              that.globalData.alertClipboardData = false
            }
          })
        }
      }
    })
  },
  // 获取个人首页小程序码
  getInviteWxaCode() {
    const params = {
      customerId: utils.getUserInfo().customerId === undefined ? '' : utils.getUserInfo().customerId,
      page: 'pages/index/index',
      width: 140
    }
    webapi.getInviteWxaCode(params).then((res) => {
      if (res.code === 'K-000000') {
        utils.setMiniprogramCode(res.context)
        return true
      } else {
        throw new Error(res.message)
      }
    }).catch(function (err) {
      console.log(err)
    })
  },
  globalData: {
    isIphoneX: false,
    screenHeight: undefined,
    screenWidth: undefined,
    platform: undefined,
    sessionKey: '',
    loginRedirect: '',
    invitationCustomerId: undefined,
    alertClipboardData: false,
    shareImgUrl: []
  }
})
