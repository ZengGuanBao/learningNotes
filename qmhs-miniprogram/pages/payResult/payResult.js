import create from '../../store/create'
import store from '../../store/store'
import webapi from '../../utils/webapi'
import utils from '../../utils/utils'

create(store, {
  data: {
    times: 20, // 轮询次数
    isPaySuccess: false, // 是否支付成功
    hasLoadData: false,
    orderId: '', // 订单id
    goodsPrice: '' // 商品价格
  },
  onLoad(options) {
    this.setData({
      orderId: options.id,
      goodsPrice: options.price
    })
    wx.showLoading({
      title: '正在加载…',
      mask: true
    })
    this.checkPayStatue()
  },
  // 检查订单状态
  checkPayStatue() {
    const params = {
      id: this.data.orderId
    }
    const timer = setInterval(async () => {
      this.setData({
        times: --this.data.times
      })
      if (this.data.times >= 0) {
        const result = await webapi.getOrderDetail(params)
        if (result.code === 'K-000000' && result.context.orderDetailVo.status === 2) { // 已付款
          if (!this.data.isPaySuccess) {
            this.setData({
              isPaySuccess: true,
              hasLoadData: true
            })
            wx.hideLoading()
            clearInterval(timer)
            const result = await webapi.getUserInfo() // 刷新用户信息，会员状态改变
            if (result.code === 'K-000000') {
              utils.setUserInfo(result.context)
            }
          }
        }
      } else {
        wx.hideLoading()
        if (!this.data.isPaySuccess) {
          this.setData({
            hasLoadData: true
          })
        }
        clearInterval(timer)
      }
    }, 500)
  },
  toHome() {
    wx.reLaunch({url: '../../pages/index/index'})
  },
  toOrderDetail() {
    wx.navigateTo({url: '../../pages/orderDetail/orderDetail?id=' + this.data.orderId})
  },
  phoneCall() {
    wx.makePhoneCall({
      phoneNumber: '400-6783-909'
    })
  }
})
