import create from '../../store/create'
import store from '../../store/store'
import webapi from '../../utils/webapi'

create(store, {
  data: {
    saleDateList: [], // 销售日期列表
    settleDateList: [], // 结算日期列表
    saleDateIndex: 5, // 销售日期下标
    settleDateIndex: 5, // 结算日期下标
    filterSettleStatus: [
      {
        id: 0,
        name: '全部'
      },
      // {
      //   id: 1,
      //   name: '待预估'
      // },
      {
        id: 2,
        name: '待结算'
      },
      {
        id: 3,
        name: '已结算'
      },
      {
        id: 4,
        name: '已失效'
      }
    ], // 结算状态筛选
    filterOrderChannel: [
      {
        id: 0,
        name: '全部'
      },
      {
        id: 2,
        name: '京东'
      },
      {
        id: 3,
        name: '拼多多'
      },
      {
        id: 1,
        name: '巨划算'
      }
    ], // 订单渠道筛选
    filterIncomeType: [
      {
        id: 0,
        name: '全部'
      },
      {
        id: 1,
        name: '商品推广返利'
      },
      {
        id: 2,
        name: '巨划算推广返利'
      }
    ], // 收入类型筛选
    monthSaleData: { // 某月销售数据
      totalIncome: 0,
      totalIncomeNum: 0,
      jhsIncome: 0,
      jhsIncomeNum: 0,
      jdIncome: 0,
      jdIncomeNum: 0,
      pddIncome: 0,
      pddIncomeNum: 0
    },
    monthSettleData: { // 某月结算数据
      totalIncome: 0,
      totalIncomeNum: 0,
      jhsIncome: 0,
      jhsIncomeNum: 0,
      jdIncome: 0,
      jdIncomeNum: 0,
      pddIncome: 0,
      pddIncomeNum: 0
    },
    incomeTabIndex: 0, // 平台奖励tab下标
    rewardTabIndex: 0, // 收入类型tab下标
    popularizeTabIndex: 0, // 推广收入时间维度tab下标
    popularizeList: [
      {
        totalIncome: 0,
        totalIncomeNum: 0,
        jhsIncome: 0,
        jhsIncomeNum: 0,
        jdIncome: 0,
        jdIncomeNum: 0,
        pddIncome: 0,
        pddIncomeNum: 0
      },
      {
        totalIncome: 0,
        totalIncomeNum: 0,
        jhsIncome: 0,
        jhsIncomeNum: 0,
        jdIncome: 0,
        jdIncomeNum: 0,
        pddIncome: 0,
        pddIncomeNum: 0
      },
      {
        totalIncome: 0,
        totalIncomeNum: 0,
        jhsIncome: 0,
        jhsIncomeNum: 0,
        jdIncome: 0,
        jdIncomeNum: 0,
        pddIncome: 0,
        pddIncomeNum: 0
      },
      {
        totalIncome: 0,
        totalIncomeNum: 0,
        jhsIncome: 0,
        jhsIncomeNum: 0,
        jdIncome: 0,
        jdIncomeNum: 0,
        pddIncome: 0,
        pddIncomeNum: 0
      },
    ], // 推广收入时间维度数据源
    filterSettleStatusIndex: 0, // 结算状态筛选下标
    filterOrderChannelIndex: 0, // 订单渠道筛选下标
    filterIncomeTypeIndex: 0, // 收入类型筛选下标
    hasLoadingOver: false, //
    isLoading: false,
    pageNum: 1,
    pageSize: 20,
    pageTotal: -1,
    incomeList: [], // 收入列表
  },
  onReady() {
    wx.showLoading({
      title: '正在加载…',
      mask: true
    })
    Promise.all([webapi.getMonthList(), webapi.statisticsPopularize()]).then((result) => {
      let res
      wx.hideLoading()
      if (result[0].code === 'K-000000') {
        res = result[0].context.dateVOList
        const dateList = res.map((item) => ({
          id: item.month,
          name: item.yearMonthFormat
        }))
        this.setData({
          saleDateList: dateList,
          settleDateList: dateList,
        })
      }

      if (result[1].code === 'K-000000') {
        res = result[1].context
        this.data.popularizeList = [res.today, res.currMonth, res.prevMonth, res.total]
        this.setData({
          popularizeList: this.data.popularizeList,
        })
        this.getSettlementByMonth()
        this.getSaleByMonth()
      } else {
        wx.showToast({
          title: result[1].message,
          icon: 'none',
          duration: 2000
        })
      }
      return null
    }).catch((err) => {
      console.log(err)
    })
    this.getIncomeList()
  },
  // 获取某月的结算数据
  async getSettlementByMonth() {
    const params = {
      month: this.data.settleDateList[this.data.settleDateIndex].id
    }
    const result = await webapi.statisticsIsSettlement(params)
    if (result.code === 'K-000000') {
      this.data.monthSettleData = result.context
      this.setData({
        monthSettleData: this.data.monthSettleData
      })
    }
  },
  // 获取近半年的的日期
  async getSaleByMonth() {
    const params = {
      month: this.data.saleDateList[this.data.saleDateIndex].id
    }
    const result = await webapi.statisticsSaleByMonth(params)
    if (result.code === 'K-000000') {
      this.data.monthSaleData = result.context
      this.setData({
        monthSaleData: this.data.monthSaleData
      })
    }
  },
  // 获取收入明细数据
  async getIncomeList() {
    if (!this.data.isLoading && (this.data.pageTotal === -1 || this.data.pageNum <= this.data.pageTotal)) {
      const params = {
        pageSize: this.data.pageSize,
        pageNum: this.data.pageNum,
        rewardType: this.data.rewardTabIndex,
        sortColumn: 'createTime',
        sortRole: 'desc',
        settlementStatus: this.data.filterSettleStatus[this.data.filterSettleStatusIndex].id,
        channelType: this.data.filterOrderChannel[this.data.filterOrderChannelIndex].id,
        incomeType: this.data.filterIncomeType[this.data.filterIncomeTypeIndex].id
      }

      if (this.data.rewardTabIndex === 0) { // 推广收入
        params.timeRangeType = this.data.popularizeTabIndex + 1
        if (params.timeRangeType === 4) {
          params.timeRangeType = 0
        }
      } else if (this.data.incomeTabIndex === 0) {
        params.month = this.data.settleDateList[this.data.settleDateIndex].id
      } else {
        params.month = this.data.saleDateList[this.data.saleDateIndex].id
      }

      this.setData({
        isLoading: true,
      })
      const result = await webapi.incomeDetailList(params)
      if (result.code === 'K-000000') {
        let hasLoadingOver = false
        if (result.context.bonusOrderVOPage.number === result.context.bonusOrderVOPage.totalPages) {
          hasLoadingOver = true
        }
        this.data.incomeList.push(...result.context.bonusOrderVOPage.content)
        this.setData({
          incomeList: this.data.incomeList,
          pageNum: result.context.bonusOrderVOPage.number + 1,
          isLoading: false,
          hasLoadingOver,
          pageTotal: result.context.bonusOrderVOPage.totalPages
        })
      }
    }
  },
  // 切换收入类型tab
  switchRewardTab(e) {
    const index = parseInt(e.currentTarget.dataset.current, 10)
    if (index) {
      this.data.filterIncomeType[1].name = '平台商品奖励'
      this.data.filterIncomeType[2].name = '平台巨划算奖励'
      this.data.filterSettleStatus = [
        {
          id: 0,
          name: '全部'
        },
        {
          id: 1,
          name: '待预估'
        },
        {
          id: 2,
          name: '待结算'
        },
        {
          id: 3,
          name: '已结算'
        },
        {
          id: 4,
          name: '已失效'
        }
      ]
    } else {
      this.data.filterSettleStatus = [
        {
          id: 0,
          name: '全部'
        },
        {
          id: 2,
          name: '待结算'
        },
        {
          id: 3,
          name: '已结算'
        },
        {
          id: 4,
          name: '已失效'
        }
      ]
      this.data.filterIncomeType[1].name = '商品推广返利'
      this.data.filterIncomeType[2].name = '巨划算推广返利'
    }

    this.setData({
      filterIncomeType: this.data.filterIncomeType,
      filterSettleStatus: this.data.filterSettleStatus,
      filterSettleStatusIndex: index === 1 && this.data.incomeTabIndex === 0 ? 3 : 0, // 如果是平台奖励已结算
      filterIncomeTypeIndex: 0,
      filterOrderChannelIndex: 0,
      rewardTabIndex: parseInt(index, 10),
      hasLoadingOver: false,
      isLoading: false,
      pageNum: 1,
      pageTotal: -1,
      incomeList: []
    })
    this.getIncomeList()
  },
  switchPopularizeTab(e) {
    const index = parseInt(e.currentTarget.dataset.current, 10)
    this.setData({
      popularizeTabIndex: parseInt(index, 10)
    })
    this.resetPages()
    this.getIncomeList()
  },
  switchIncomeTab(e) {
    const index = parseInt(e.currentTarget.dataset.current, 10)
    this.setData({
      incomeTabIndex: parseInt(index, 10),
      filterSettleStatusIndex: index === 0 ? 3 : 0
    })
    this.resetPages()
    this.getIncomeList()
  },
  bindPickerChange(e) {
    const index = parseInt(e.currentTarget.dataset.current, 10)
    // eslint-disable-next-line no-nested-ternary
    const origin = (index === 0 ? 'filterSettleStatusIndex' : index === 1 ? 'filterOrderChannelIndex' : 'filterIncomeTypeIndex')
    this.setData({
      [origin]: e.detail.value
    })
    this.resetPages()
    this.getIncomeList()
  },
  bindIncomeTabPickerChange(e) {
    const index = parseInt(e.currentTarget.dataset.current, 10)
    const origin = (index === 0 ? 'settleDateIndex' : 'saleDateIndex')
    this.setData({
      [origin]: e.detail.value,
    })
    if (index === 0) {
      this.getSettlementByMonth()
    } else {
      this.getSaleByMonth()
    }
    this.resetPages()
    this.getIncomeList()
  },
  toStatement() {
    wx.navigateTo({url: '../../pages/incomeStatement/incomeStatement'})
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
  },
  resetPages() {
    this.setData({
      hasLoadingOver: false,
      isLoading: false,
      pageNum: 1,
      pageTotal: -1,
      incomeList: []
    })
  }
})
