import create from '../../store/create'
import store from '../../store/store'
import webapi from '../../utils/webapi'

create(store, {
  data: {
    redeemCode: '',
    hasRedeemCode: false,
    delIcon: false
  },
  bindKeyInput(e) {
    this.setData({
      redeemCode: e.detail.value
    })
    if (e.detail.value !== '') {
      this.setData({delIcon: true})
    }
    if (e.detail.value.length > 11) {
      this.setData({
        hasRedeemCode: true
      })
    }
  },
  delRedeemCode() {
    this.setData({
      redeemCode: '',
      delIcon: false,
      hasRedeemCode: false
    })
  },
  getTips() {
    wx.showModal({
      title: '什么是兑换码？',
      content: '兑换码是平台给予部分用户的福利，用户输入正确的兑换码，即可获得惊喜福利！兑换码有效期为90天，请及时使用。',
      showCancel: false,
      confirmText: '我知道了',
      confirmColor: '#FD4073'
    })
  },
  getRedeemCode() {
    webapi.getWriteOffRedemptionCode({redemptionCode: this.data.redeemCode}).then((res) => {
      if (res.code === 'K-000000') {
        wx.redirectTo({
          url: '../../pages/resultViewPage/resultViewPage?resultType=redeemCode'
        })
        return true
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
        throw new Error(res.message)
      }
    }).catch(function (err) {
      console.log(err)
    })
  },
  submitRedeemCode() {
    const that = this
    if (this.data.hasRedeemCode === true) {
      wx.showModal({
        title: '是否确认兑换',
        confirmText: '确认',
        confirmColor: '#FD4073',
        cancelColor: '#333333',
        success(res) {
          if (res.confirm) {
            that.getRedeemCode()
          }
        }
      })
    }
  }
})
