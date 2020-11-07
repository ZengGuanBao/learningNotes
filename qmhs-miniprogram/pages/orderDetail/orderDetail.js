import create from '../../store/create'
import store from '../../store/store'
import {imgHost} from '../../config/index'
import webapi from '../../utils/webapi'

create(store, {
  data: {
    isIphoneX: false,
    orderDetail: { // 商品信息
      id: ''
    },
    customerDeliveryAddress: { // 地址信息
    },
    deliveryStatus: '', // 物流信息
    deliveryList: [],
    orderStatus: ['全部', '待支付', '待发货', '待收货', '已完成'],
    imgHost,
    hasLoadData: false
  },
  onLoad(options) {
    this.setData({
      'orderDetail.id': options.id === 'undefined' ? null : options.id,
      isIphoneX: getApp().globalData.isIphoneX
    })
    this.getOrderDetail()
  },
  // 获取订单详情
  async getOrderDetail() {
    wx.showLoading({
      title: '正在加载…',
      mask: true
    })
    const params = {
      id: this.data.orderDetail.id
    }
    const result = await webapi.getOrderDetail(params)
    wx.hideLoading()
    if (result.code === 'K-000000') {
      const orderDetail = Object.assign(this.data.orderDetail, result.context.orderDetailVo)
      const phone = result.context.customerDeliveryAddressVO.consigneeNumber
      result.context.customerDeliveryAddressVO.consigneeNumber = phone.substring(0, 3) + ' ' + phone.substring(3, 7) + ' ' + phone.substring(7, 11)
      this.setData({
        hasLoadData: true,
        orderDetail,
        customerDeliveryAddress: result.context.customerDeliveryAddressVO,
        deliveryStatus: result.context.deliveryList.length && result.context.deliveryList[0],
        deliveryList: result.context.deliveryList
      })
    } else {
      wx.showToast({
        title: result.message,
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 确认订单
  async bindConfirmOrder() {
    wx.showLoading({
      title: '正在加载…',
      mask: true
    })
    const params = {
      id: this.data.orderDetail.id
    }
    const result = await webapi.confirmReceipt(params)
    wx.hideLoading()
    if (result.code === 'K-000000') {
      wx.showToast({
        title: '收货成功',
        icon: 'none',
        duration: 2000,
        mask: true,
        success() {
          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            })
          }, 2000)
        }
      })
    } else {
      wx.showToast({
        title: result.message,
        icon: 'none',
        duration: 2000
      })
    }
    wx.hideLoading()
  },
  toLogistics() {
    wx.navigateTo({url: '../../pages/logistics/logistics?info=' + JSON.stringify(this.data.deliveryList) + '&deliveryCompany=' + this.data.orderDetail.deliveryCompany + '&deliverySn=' + this.data.orderDetail.deliverySn})
  },
  confirmOrder() {
    const that = this
    wx.showModal({
      content: '为了您的个人权益，请收到货确认无误后再确认收货',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确认',
      confirmColor: '#FD4073',
      success(res) {
        if (res.confirm) {
          that.bindConfirmOrder()
        }
      }
    })
  }
})
