import create from '../../store/create'
import store from '../../store/store'
import {imgHost} from '../../config/index'
import webapi from '../../utils/webapi'
import auth from '../../utils/auth'
import utils from '../../utils/utils'

create(store, {
  data: {
    imgHost,
    authParam: {}
  },
  onLoad(options) {
    if (options.authParam) {
      this.setData({
        authParam: options.authParam === {} ? '' : JSON.parse(decodeURIComponent(options.authParam))
      })
    }
  },
  async wxAuthorize(e) {
    if (e.detail.errMsg === 'getUserInfo:ok') {
      const that = this
      wx.checkSession({
        async success() {
          const sessionKey = getApp().globalData.sessionKey
          if (getApp().globalData.sessionKey) {
            const params = {
              ...that.data.authParam,
              iv1: e.detail.iv,
              encryptedData1: e.detail.encryptedData,
              sessionKey
            }
            wx.showLoading({
              title: '登录中…',
              mask: true
            })
            const result = await webapi.smsLoginWithRegister(params)
            wx.hideLoading()
            if (result.code === 'K-000000') {
              utils.loginSuccess(result.context.wxUserInfo, result.context.userInfo)
            } else if (result.code === 'K-000010') {
              wx.showToast({
                title: '您的停留时间过长，请重新登录',
                icon: 'none',
                duration: 2000,
                complete() {
                  const pages = getCurrentPages()
                  if (pages[pages.length - 3] && pages[pages.length - 3].route === 'pages/login/login') {
                    wx.navigateBack({
                      delta: 2
                    })
                  } else {
                    wx.navigateBack({
                      delta: 1
                    })
                  }
                }
              })
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
  }
})
