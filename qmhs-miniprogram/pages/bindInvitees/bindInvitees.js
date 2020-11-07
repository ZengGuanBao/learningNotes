import create from '../../store/create'
import store from '../../store/store'
import webapi from '../../utils/webapi'
import utils from '../../utils/utils'

create(store, {
  data: {
    inviteesCode: '',
    getInvitees: false,
    inviteesInfo: {},
    authParam: {}
  },
  onLoad(options) {
    if (options.authParam) {
      this.setData({
        authParam: options.authParam === {} ? '' : JSON.parse(decodeURIComponent(options.authParam))
      })
    }
  },
  bindKeyInput(e) {
    this.setData({
      inviteesCode: e.detail.value
    })
    if (this.data.inviteesCode.length === 8) {
      this.getInviteesCode()
    } else {
      this.setData({
        getInvitees: false
      })
    }
  },
  getInviteesCode() {
    wx.showLoading({
      title: '正在加载…',
      mask: true
    })
    const params = {
      inviteCode: this.data.inviteesCode.replace(/\s+/g, '')
    }
    webapi.getInviterInfo(params).then((infoResult) => {
      wx.hideLoading()
      if (infoResult.code === 'K-000000') {
        this.setData({
          inviteesInfo: infoResult.context,
          getInvitees: true
        })
      } else {
        wx.showToast({
          title: infoResult.message,
          icon: 'none',
          duration: 2000
        })
        this.setData({
          getInvitees: false
        })
      }
      return true
    }).catch(error => {
      console.log(error)
    })
  },
  async submitInvite() {
    const params = {...this.data.authParam, inviteCode: this.data.inviteesCode}
    if (params.iv1) { // 微信登录
      wx.showLoading({
        title: '登录中…',
        mask: true
      })
      const result = await webapi.wxLoginWithRegister(params)

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
      wx.redirectTo({
        url: '../../pages/wxAuthorize/wxAuthorize?authParam=' + encodeURIComponent(JSON.stringify(params)),
      })
    }
  },
  clearCode() {
    this.setData({
      inviteesCode: '',
      getInvitees: false
    })
  },
  alertInviteesCode() {
    wx.showModal({
      content: '请向已经成为全民划算是超级会员的朋友索要或者网络搜索"全民划算邀请码"',
      showCancel: false,
      confirmText: '我知道了',
      confirmColor: '#FD4073'
    })
  },
  toProtocol() {
    wx.navigateTo({url: '../../pages/protocol/protocol'})
  }
})
