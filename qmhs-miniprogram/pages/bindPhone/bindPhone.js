import create from '../../store/create'
import store from '../../store/store'
import webapi from '../../utils/webapi'
import utils from '../../utils/utils'

create(store, {
  data: {
    phone: '', // 手机号
    smsCode: '', // 验证码
    smsText: '获取验证码',
    authParam: {},
    canBind: false,
    canGetSms: true,
    hasSendSms: false, // 是否获取过验证码
  },
  onLoad(options) {
    if (options.authParam) {
      this.setData({
        authParam: options.authParam === {} ? '' : JSON.parse(decodeURIComponent(options.authParam))
      })
    }
  },
  /**
   * @decs 清除手机号
   */
  clearPhone() {
    this.setData({
      phone: ''
    })
    this.watch()
  },
  /**
   * @decs 发送验证码
   */
  async sendSms() {
    if (this.data.canGetSms) {
      if (utils.checkPhone(this.data.phone)) {
        this.setData({
          smsText: '发送中...'
        })
        this.setData({
          canGetSms: false
        })
        const params = {
          phone: this.data.phone
        }
        const result = await webapi.sendSmsBindVerifyCode(params)

        if (result.code === 'K-000000') {
          wx.showToast({
            title: '发送成功',
            image: '../../assets/images/common/dialog-success.png',
            duration: 2000,
          })
          let downTime = 60
          this.setData({
            smsText: `${downTime}S`,
            hasSendSms: true
          })
          this.watch()
          const times = setInterval(() => {
            if (downTime === 0) {
              this.setData({
                smsText: '重新发送'
              })
              this.setData({
                canGetSms: true
              })
              clearInterval(times)
            } else {
              downTime--
              this.setData({
                smsText: `${downTime}S`
              })
            }
          }, 1000)
        } else {
          this.setData({
            smsText: '重新发送',
            canGetSms: true
          })
          wx.showToast({
            title: result.message,
            icon: 'none',
            duration: 2000
          })
        }
      } else if (this.data.phone) {
        wx.showToast({
          title: '请输入正确的手机号',
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: '请输入手机号',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  async handleBind() {
    if (this.data.canBind) {
      if (utils.checkPhone(this.data.phone)) {
        wx.showLoading({
          title: '登录中…',
          mask: true
        })
        const params = {
          ...this.data.authParam,
          phone: this.data.phone,
          code: this.data.smsCode,
        }
        const result = await webapi.wxLoginWithRegister(params)

        wx.hideLoading()
        if (result.code === 'K-000000') {
          utils.loginSuccess(result.context.wxUserInfo, result.context.userInfo)
        } else if (result.code === 'K-010105' || result.code === 'K-010106') { // 没有填写邀请码或邀请码错误
          wx.navigateTo({
            url: '../../pages/bindInvitees/bindInvitees?authParam=' + encodeURIComponent(JSON.stringify(params)),
          })
        } else {
          wx.showToast({
            title: result.message,
            icon: 'none',
            duration: 2000
          })
        }
      } else {
        wx.showToast({
          title: '请输入正确的手机号',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  watchPhone(e) {
    this.setData({
      phone: e.detail.value
    })
    this.watch()
    this.getRelatedStatusByPhone()
  },
  async getRelatedStatusByPhone() {
    if (utils.checkPhone(this.data.phone)) {
      const params = {
        phone: this.data.phone
      }
      const result = await webapi.getRelatedStatusByPhone(params)

      if (result.code === 'K-000000' && result.context.relatedStatus === 1) { // 手机号已经绑定
        wx.showToast({
          title: '该手机号已经被关联，请更换手机号',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  watchSmsCode(e) {
    this.setData({
      smsCode: e.detail.value
    })
    this.watch()
  },
  watch() {
    if (this.data.hasSendSms && this.data.phone.length === 11 && this.data.smsCode.length === 6) {
      this.setData({
        canBind: true
      })
    } else {
      this.setData({
        canBind: false
      })
    }
  },
  toProtocol() {
    wx.navigateTo({url: '../../pages/protocol/protocol'})
  }
})
