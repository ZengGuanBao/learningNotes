import create from '../../store/create'
import store from '../../store/store'
import webapi from '../../utils/webapi'
import utils from '../../utils/utils'

create(store, {
  data: {
    goodsInfo: {
      id: '', // 商品Id
    }, // 商品详情
    addressInfo: {}, // 用户地址
    tid: '', // 订单sn
    orderId: '', // 订单id
    price: '',
    isIphoneX: false,
    payment: {}, // 支付必须的参数
    hasLoadData: false, // 页面数据是否加载完成
    isAgreeProtocol: false // 是否同意会员服务协议
  },
  onLoad(options) {
    this.setData({
      'goodsInfo.id': options.id,
      isIphoneX: getApp().globalData.isIphoneX
    })
  },
  onShow() {
    wx.showLoading({
      title: '正在加载…',
      mask: true
    })
    const params = {
      customerId: utils.getUserInfo().customerId === undefined ? '' : utils.getUserInfo().customerId,
      id: this.data.goodsInfo.id
    }
    Promise.all([webapi.getJhsGoodsDetail(params), webapi.getAddressInfo()]).then(result => {
      wx.hideLoading()
      if (result[0].code === 'K-000000') {
        const info = result[0].context.goodsVo
        this.setData({
          goodsInfo: info,
          hasLoadData: true
        })
      }

      if (result[1].code === 'K-000000') {
        const info = result[1].context
        this.setData({
          addressInfo: info
        })
      }

      if (result[0].code !== 'K-000000') {
        wx.showToast({
          title: result[0].message,
          icon: 'none',
          duration: 2000
        })
      }
      return null
    }).catch((err) => {
      console.log(err)
    })
  },
  // 确认订单
  async payOrder() {
    if (!this.data.addressInfo.id) {
      wx.showToast({
        title: '您还没有添加收货地址',
        icon: 'none',
        duration: 2000
      })
    } else if (!this.data.isAgreeProtocol) {
      wx.showToast({
        title: '请先同意《全民划算会员服务协议》',
        icon: 'none',
        duration: 2000
      })
    } else {
      this.getOrderId()
    }
  },
  toAddress() {
    wx.navigateTo({url: '../../pages/editAddress/editAddress?id=' + this.data.addressInfo.id})
  },
  async getOrderId() {
    wx.showLoading({
      title: '正在提交订单…',
      mask: true
    })
    const params = {
      goodsId: this.data.goodsInfo.id,
      addressId: this.data.addressInfo.id
    }
    const result = await webapi.commitOrder(params)
    if (result.code === 'K-000000') {
      const tid = result.context.tid
      const price = result.context.price
      this.setData({
        tid,
        price
      })
      this.getWxPayment()
    } else {
      wx.hideLoading()
      wx.showToast({
        title: result.message,
        icon: 'none',
        duration: 2000
      })
    }
  },
  async getWxPayment() {
    const params = {
      tid: this.data.tid,
      openid: utils.getWxUserInfo().openId
    }
    const orderResult = await webapi.wxPayCheckOrder(params)
    wx.hideLoading()
    if (orderResult.code === 'K-000000') {
      const obj = orderResult.context
      this.setData({
        payment: obj,
        orderId: obj.orderId
      })
      this.wxPay()
    } else {
      wx.showToast({
        title: orderResult.message,
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 切换是否同意协议
  toggleAgreeProtocol() {
    this.setData({
      isAgreeProtocol: !this.data.isAgreeProtocol
    })
  },
  toProtocol() {
    wx.navigateTo({
      url: '../../pages/memberProtocol/memberProtocol'
    })
  },
  wxPay() {
    const that = this
    const params = this.data.payment
    wx.requestPayment({
      appId: params.appId,
      timeStamp: params.timeStamp,
      nonceStr: params.nonceStr,
      package: params.package,
      signType: params.signType,
      paySign: params.paySign,
      success() {
        wx.redirectTo({url: '../../pages/payResult/payResult?id=' + that.data.orderId + '&price=' + that.data.price})
      }
    })
  }
})
