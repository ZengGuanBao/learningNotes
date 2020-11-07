import create from '../../store/create'
import store from '../../store/store'
import webapi from '../../utils/webapi'
import utils from '../../utils/utils'

create(store, {
  data: {
    withdrawalPrice: '', // 提现金额
    canWithdrawPrice: '0', // 可提现金额
    withdrawRemainNum: 0, // 提现的次数
    minAmount: '', // 最小提现金额
    maxAmount: '', // 最大提现金额
    phone: '', // 手机号
    hasSendSms: false, // 是否有成功发送验证码
    smsCode: '', // 验证码
    canGetSms: true, // 是否可以获取验证码
    smsText: '发送验证码',
    canWithdrawal: false,
    isLoadData: false
  },
  async onReady() {
    wx.showLoading({
      title: '正在加载…',
      mask: true
    })
    const result = await webapi.getWithdrawInfo()
    wx.hideLoading()
    if (result.code === 'K-000000') {
      this.setData({
        canWithdrawPrice: result.context.canWithdrawPrice,
        withdrawRemainNum: result.context.withdrawRemainNum,
        minAmount: result.context.minWithdrawAmount,
        maxAmount: result.context.maxWithdrawAmount,
        phone: utils.getUserInfo().accountName,
        isLoadData: true
      })
    } else {
      wx.showToast({
        title: result.message,
        icon: 'none',
        duration: 2000
      })
    }
  },
  handleAllWithdrawal() {
    if (this.data.isLoadData) {
      const canWithdrawPrice = parseFloat(this.data.canWithdrawPrice)
      this.setData({
        withdrawalPrice: canWithdrawPrice <= this.data.maxAmount ? canWithdrawPrice : this.data.maxAmount
      })
      this.watch()
    }
  },
  /**
   * @decs 发送验证码
   */
  async sendSms() {
    if (this.data.isLoadData && this.data.withdrawRemainNum) {
      if (this.data.canGetSms) {
        this.setData({
          smsText: '发送中...',
          canGetSms: false
        })
        const result = await webapi.sendSmsVerifyCode()

        if (result.code === 'K-000000') {
          wx.showToast({
            title: '验证码发送成功',
            icon: 'none',
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
                smsText: '重新发送',
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
      }
    }
  },
  async handleWithdrawal() {
    if (this.data.canWithdrawal && this.validateAmount()) {
      wx.showLoading({
        title: '正在加载…',
        mask: true
      })
      const params = {
        code: this.data.smsCode,
        openId: utils.getUserInfo().openid,
        applyWithdrawAmount: parseFloat(this.data.withdrawalPrice).toString()
      }
      const result = await webapi.applyWithdraw(params)

      wx.hideLoading()
      if (result.code === 'K-000000') {
        wx.showToast({
          title: '申请成功',
          image: '../../assets/images/common/dialog-success.png',
          mask: true,
          duration: 2000,
          complete() {
            wx.navigateBack({
              delta: 1,
            })
          }
        })
      } else {
        wx.showToast({
          title: result.message,
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  validateAmount() {
    const price = parseFloat(this.data.withdrawalPrice)
    if (this.data.isLoadData) {
      if (price < this.data.minAmount || price > this.data.maxAmount) {
        wx.showToast({
          title: '请填写正确金额',
          icon: 'none',
          duration: 2000
        })
        return false
      } else {
        return true
      }
    } else {
      wx.showToast({
        title: '操作失败',
        icon: 'none',
        duration: 2000
      })
      return false
    }
  },
  watchAmount(e) {
    let amount = e.detail.value
    amount = amount.replace(/^\./g, '') // 验证第一个字符是数字而不是字符
    amount = amount.replace(/\.{2,}/g, '.') // 只保留第一个.清除多余的
    amount = amount.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
    // eslint-disable-next-line no-useless-escape
    amount = amount.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3') // 只能输入两个小数
    this.setData({
      withdrawalPrice: amount
    })
    this.watch()
  },
  watchSmsCode(e) {
    this.setData({
      smsCode: e.detail.value
    })
    this.watch()
  },
  watch() {
    if (this.data.isLoadData && this.data.withdrawRemainNum && this.data.withdrawalPrice && this.data.hasSendSms && this.data.smsCode.length === 6) {
      this.setData({
        canWithdrawal: true
      })
    } else {
      this.setData({
        canWithdrawal: false
      })
    }
  }
})
