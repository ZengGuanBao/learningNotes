import create from '../../store/create'
import store from '../../store/store'
import webapi from '../../utils/webapi'

create(store, {
  data: {
    tabIndex: 0,
    directPollenNum: '-', // 花粉总数
    directPollenNumToday: '-', // 花粉总数当天新增
    directPollenNumYesterday: '-', // 花粉总数昨天新增
    directPollenNumMonth: '-', // 花粉总数本月新增
    directMemberNum: '-', // 会员总数
    directMemberNumToday: '-', // 会员总数当天新增
    directMemberNumYesterday: '-', // 会员总数昨天新增
    directMemberNumMonth: '-', // 会员总数本月新增
    isClickTab: [true, false],
    fensTabInfo: [
      {
        hasLoadingOver: false,
        isLoading: false,
        pageNum: 1,
        pageTotal: -1,
        fensList: [], // 花粉、会员数据列表
      }, {
        hasLoadingOver: false,
        isLoading: false,
        pageNum: 1,
        pageTotal: -1,
        fensList: [], // 花粉、会员数据列表
      }
    ],
    pageSize: 50,
  },
  async onReady() {
    wx.showLoading({
      title: '正在加载…',
      mask: true
    })
    const result = await webapi.getFansAndMemberDetail()
    wx.hideLoading()
    if (result.code === 'K-000000') {
      const res = result.context
      this.setData({
        directPollenNum: res.directPollenNum,
        directPollenNumToday: res.directPollenNumToday,
        directPollenNumYesterday: res.directPollenNumYesterday,
        directPollenNumMonth: res.directPollenNumMonth,
        directMemberNum: res.directMemberNum,
        directMemberNumToday: res.directMemberNumToday,
        directMemberNumYesterday: res.directMemberNumYesterday,
        directMemberNumMonth: res.directMemberNumMonth,
      })
    }
    this.getFensList()
  },
  async getFensList() {
    const tabIndex = this.data.tabIndex
    if (!this.data.fensTabInfo[tabIndex].isLoading && (this.data.fensTabInfo[tabIndex].pageTotal === -1 || this.data.fensTabInfo[tabIndex].pageNum <= this.data.fensTabInfo[tabIndex].pageTotal)) {
      const params = {
        pageSize: this.data.pageSize,
        pageNum: this.data.fensTabInfo[tabIndex].pageNum,
        directCustomerType: tabIndex,
        sortColumn: 'createTime',
        sortRole: 'desc',
      }
      this.data.fensTabInfo[tabIndex].isLoading = true

      this.setData({fensTabInfo: this.data.fensTabInfo})
      const result = await webapi.getDirectCustomerList(params)
      if (result.code === 'K-000000') {
        let hasLoadingOver = false
        if (result.context.customerVOPage.number === result.context.customerVOPage.totalPages) {
          hasLoadingOver = true
        }
        if (result.context.customerVOPage.content.length) {
          const list = result.context.customerVOPage.content.map(item => {
            if (!item.headImgUrl) {
              return {
                ...item,
                headImgUrl: '../../assets/images/common/img-error.png'
              }
            } else {
              return item
            }
          })
          this.data.fensTabInfo[tabIndex].fensList.push(...list)
        }
        this.data.fensTabInfo[tabIndex].pageNum = result.context.customerVOPage.number + 1
        this.data.fensTabInfo[tabIndex].isLoading = false
        this.data.fensTabInfo[tabIndex].hasLoadingOver = hasLoadingOver
        this.data.fensTabInfo[tabIndex].pageTotal = result.context.customerVOPage.totalPages
        this.setData({
          fensTabInfo: this.data.fensTabInfo
        })
      }
    }
  },
  switchTab(e) {
    const index = parseInt(e.currentTarget.dataset.current, 10)
    this.setData({
      tabIndex: parseInt(index, 10)
    })
    if (!this.data.isClickTab[index]) {
      this.data.isClickTab[index] = true
      this.setData({
        isClickTab: this.data.isClickTab
      })
      this.getFensList()
    }
  },
})
