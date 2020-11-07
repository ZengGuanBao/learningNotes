import create from '../../store/create'
import store from '../../store/store'
import webapi from '../../utils/webapi'

create(store, {
  data: {
    channelIndex: 0, // 0 京东订单， 1 拼多多订单， 2 聚划算订单
    orderTypeIndex: 0,
    hasLoadingOver: false,
    isLoading: false,
    pageNum: 1,
    pageSize: 20,
    pageTotal: -1,
    orderList: [], // 订单列表
  },
  onLoad(options) {
    this.setData({
      channelIndex: parseInt(options.index, 10) || 0,
    })
  },
  onShow() {
    this.setData({
      hasLoadingOver: false,
      isLoading: false,
      pageNum: 1,
      pageTotal: -1,
      orderList: [],
    })
    this.getIncomeList()
  },
  async getIncomeList() {
    if (!this.data.isLoading && (this.data.pageTotal === -1 || this.data.pageNum <= this.data.pageTotal)) {
      let channelType
      if (this.data.channelIndex === 0) {
        channelType = 2
      } else if (this.data.channelIndex === 1) {
        channelType = 3
      } else { // 巨划算订单
        channelType = 1
      }

      let orderStatus
      let thirdOrderStatus
      if (channelType === 1) {
        if (this.data.orderTypeIndex === 0) {
          orderStatus = 0
        } else {
          orderStatus = this.data.orderTypeIndex + 1
        }
      } else if (channelType !== 1) {
        if (this.data.orderTypeIndex === 0) {
          thirdOrderStatus = 0
        } else {
          thirdOrderStatus = this.data.orderTypeIndex + 1
        }
      }

      const params = {
        pageSize: this.data.pageSize,
        pageNum: this.data.pageNum,
        channelType,
        orderStatus,
        thirdOrderStatus
      }

      this.setData({
        isLoading: true
      })
      const result = await webapi.getOrderList(params)
      if (result.code === 'K-000000') {
        let hasLoadingOver = false
        let orderResult

        if (channelType === 1) {
          orderResult = result.context.orderVOPage
        } else {
          orderResult = result.context.thirdOrderVOPage
        }
        if (orderResult.number === orderResult.totalPages) {
          hasLoadingOver = true
        }
        this.data.orderList.push(...orderResult.content)
        this.setData({
          orderList: this.data.orderList,
          pageNum: orderResult.number + 1,
          isLoading: false,
          hasLoadingOver,
          pageTotal: orderResult.totalPages
        })
      }
    }
  },
  goHome() {
    wx.reLaunch({url: '../../pages/index/index'})
  },
  switchChannel(e) {
    const index = e.currentTarget.dataset.current
    this.setData({
      hasLoadingOver: false,
      isLoading: false,
      pageNum: 1,
      pageTotal: -1,
      orderList: [],
      channelIndex: parseInt(index, 10)
    })
    this.getIncomeList()
  },
  switchOrder(e) {
    const index = e.currentTarget.dataset.current
    this.setData({
      hasLoadingOver: false,
      isLoading: false,
      pageNum: 1,
      pageTotal: -1,
      orderList: [],
      orderTypeIndex: parseInt(index, 10)
    })
    this.getIncomeList()
  },
  toOrderDetail(e) {
    if (this.data.channelIndex === 2) { // 巨划算订单
      const id = e.currentTarget.dataset.id
      wx.navigateTo({url: '../../pages/orderDetail/orderDetail?id=' + id})
    }
  },
  copySn(e) {
    const sn = e.currentTarget.dataset.sn
    wx.setClipboardData({
      data: sn,
      success() {
        wx.showToast({
          title: '复制成功',
          duration: 2000
        })
      }
    })
  }
})
