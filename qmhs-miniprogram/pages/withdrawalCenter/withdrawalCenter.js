import create from '../../store/create'
import store from '../../store/store'
import {imgHost} from '../../config/index'
import webapi from '../../utils/webapi'

create(store, {
  data: {
    tabIndex: 0,
    imgHost,
    isClickTab: [true, false, false],
    recordTabInfo: [
      {
        hasLoadingOver: false,
        isLoading: false,
        pageNum: 1,
        pageTotal: -1,
        recordList: [], // 记录列表
      }, {
        hasLoadingOver: false,
        isLoading: false,
        pageNum: 1,
        pageTotal: -1,
        recordList: [], // 记录列表
      }, {
        hasLoadingOver: false,
        isLoading: false,
        pageNum: 1,
        pageTotal: -1,
        recordList: [], // 记录列表
      }
    ],
    pageSize: 20,
    canWithdrawPrice: '-', // 可提现的金额
  },
  async onShow() {
    wx.showLoading({
      title: '正在加载…',
      mask: true
    })
    Promise.all([webapi.getWithdrawInfo()]).then(result => {
      wx.hideLoading()
      if (result[0].code === 'K-000000') {
        this.setData({
          canWithdrawPrice: result[0].context.canWithdrawPrice
        })
      } else {
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
    this.data.recordTabInfo = [
      {
        hasLoadingOver: false,
        isLoading: false,
        pageNum: 1,
        pageTotal: -1,
        recordList: [], // 记录列表
      }, {
        hasLoadingOver: false,
        isLoading: false,
        pageNum: 1,
        pageTotal: -1,
        recordList: [], // 记录列表
      }, {
        hasLoadingOver: false,
        isLoading: false,
        pageNum: 1,
        pageTotal: -1,
        recordList: [], // 记录列表
      }
    ]

    const tabIndex = this.data.tabIndex
    const isClickTab = [false, false, false]
    isClickTab[tabIndex] = true
    this.setData({
      isClickTab,
      recordTabInfo: this.data.recordTabInfo
    })

    if (tabIndex === 0 || tabIndex === 1) {
      this.getIncomeRecord()
    } else {
      this.getWithdrawRecord()
    }
  },
  async getIncomeRecord() {
    const tabIndex = this.data.tabIndex
    if (!this.data.recordTabInfo[tabIndex].isLoading && (this.data.recordTabInfo[tabIndex].pageTotal === -1 || this.data.recordTabInfo[tabIndex].pageNum <= this.data.recordTabInfo[tabIndex].pageTotal)) {
      const params = {
        pageSize: this.data.pageSize,
        pageNum: this.data.recordTabInfo[tabIndex].pageNum,
        sortColumn: 'createTime',
        sortRole: 'desc',
        rewardType: tabIndex
      }
      this.data.recordTabInfo[tabIndex].isLoading = true

      this.setData({recordTabInfo: this.data.recordTabInfo})
      const result = await webapi.getIncomeRecord(params)
      if (result.code === 'K-000000') {
        let hasLoadingOver = false
        if (result.context.bonusOrderVOPage.number === result.context.bonusOrderVOPage.totalPages) {
          hasLoadingOver = true
        }
        if (result.context.bonusOrderVOPage.content.length) {
          this.data.recordTabInfo[tabIndex].recordList.push(...result.context.bonusOrderVOPage.content)
        }
        this.data.recordTabInfo[tabIndex].pageNum = result.context.bonusOrderVOPage.number + 1
        this.data.recordTabInfo[tabIndex].isLoading = false
        this.data.recordTabInfo[tabIndex].hasLoadingOver = hasLoadingOver
        this.data.recordTabInfo[tabIndex].pageTotal = result.context.bonusOrderVOPage.totalPages
        this.setData({
          recordTabInfo: this.data.recordTabInfo
        })
      }
    }
  },
  async getWithdrawRecord() {
    const tabIndex = this.data.tabIndex
    if (!this.data.recordTabInfo[tabIndex].isLoading && (this.data.recordTabInfo[tabIndex].pageTotal === -1 || this.data.recordTabInfo[tabIndex].pageNum <= this.data.recordTabInfo[tabIndex].pageTotal)) {
      const params = {
        pageSize: this.data.pageSize,
        pageNum: this.data.recordTabInfo[tabIndex].pageNum,
        sortColumn: 'createTime',
        sortRole: 'desc',
      }
      this.data.recordTabInfo[tabIndex].isLoading = true
      this.setData({recordTabInfo: this.data.recordTabInfo})
      const result = await webapi.getWithdrawRecord(params)
      if (result.code === 'K-000000') {
        let hasLoadingOver = false
        if (result.context.withdrawRecordVOPage.number === result.context.withdrawRecordVOPage.totalPages) {
          hasLoadingOver = true
        }
        if (result.context.withdrawRecordVOPage.content.length) {
          this.data.recordTabInfo[tabIndex].recordList.push(...result.context.withdrawRecordVOPage.content)
        }
        this.data.recordTabInfo[tabIndex].pageNum = result.context.withdrawRecordVOPage.number + 1
        this.data.recordTabInfo[tabIndex].isLoading = false
        this.data.recordTabInfo[tabIndex].hasLoadingOver = hasLoadingOver
        this.data.recordTabInfo[tabIndex].pageTotal = result.context.withdrawRecordVOPage.totalPages
        this.setData({
          recordTabInfo: this.data.recordTabInfo
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
      if (index === 0 || index === 1) {
        this.getIncomeRecord()
      } else {
        this.getWithdrawRecord()
      }
    }
  },
  scrollBottom() {
    if (this.data.tabIndex === 0 || this.data.tabIndex === 1) {
      this.getIncomeRecord()
    } else {
      this.getWithdrawRecord()
    }
  },
  toBank() {
    wx.navigateTo({url: '../../pages/bank/bank'})
  },
  toIncomeStatement() {
    wx.navigateTo({url: '../../pages/incomeStatement/incomeStatement'})
  },
  onUnload() {
    const pages = getCurrentPages()
    const prevPage = pages[pages.length - 2]
    if (prevPage && prevPage.route === 'pages/superMemberCenter/superMemberCenter') {
      prevPage.setData({
        canWithdrawPrice: this.data.canWithdrawPrice,
      })
    }
  }
})
