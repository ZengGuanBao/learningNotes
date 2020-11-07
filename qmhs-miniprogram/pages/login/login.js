import create from '../../store/create'
import store from '../../store/store'
import {imgHost} from '../../config/index'
import webapi from '../../utils/webapi'
import auth from '../../utils/auth'
import utils from '../../utils/utils'

create(store, {
  data: {
    imgHost
  },
  async wxLogin(e) {
    if (e.detail.errMsg === 'getUserInfo:ok') {
      wx.checkSession({
        async success() {
          const sessionKey = getApp().globalData.sessionKey
          if (getApp().globalData.sessionKey) {
            const params = {
              iv1: e.detail.iv,
              encryptedData1: e.detail.encryptedData,
              sessionKey
            }
            wx.showLoading({
              title: '登录中…',
              mask: true
            })
            const result = await webapi.quickWxLogin(params)
            wx.hideLoading()
            if (result.code === 'K-000000') {
              if (result.context.loginFlag) { // 已注册
                utils.loginSuccess(result.context.wxUserInfo, result.context.userInfo)
              } else {
                params.inviteeId = getApp().globalData.invitationCustomerId
                wx.navigateTo({
                  url: '../../pages/bindPhone/bindPhone?authParam=' + encodeURIComponent(JSON.stringify(params)),
                })
              }
            } else {
              wx.showToast({
                title: result.message,
                icon: 'none',
                duration: 2000
              })
            }
          } else {
            auth.getSession(getApp())
            wx.showToast({
              title: '登录失败',
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail() {
          auth.getSession(getApp())
          wx.showToast({
            title: '登录失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },
  toPhoneLogin() {
    wx.navigateTo({
      url: '../../pages/phoneLogin/phoneLogin',
    })
  }
})
