import create from '../../store/create'
import store from '../../store/store'
import {imgHost, hFiveHost} from '../../config/index'
import webapi from '../../utils/webapi'
import utils from '../../utils/utils'

create(store, {
  data: {
    imgHost,
    hasLoadingOver: false,
    isLoading: true,
    hideText: '****',
    hideText1: '*',
    showIncome: true,
    showFens: true,
    canWithdrawPrice: '-', // 可提现金额
    todayPopularizeReward: '-', // 当天推广收益
    todayPlatformReward: '-', // 当天平台奖励
    monthReward: '-', // 本月全部奖励
    todayPopularizeOrderNum: '-', // 今日推广订单量
    todayPopularizeJhsOrderNum: '-', // 今日推广巨划算订单量
    monthActivity: '', // 活动月份
    selfBuyNum: '-', // 个人购买有效订单数
    selfBuyTargetNum: '-', // 个人购买有效订单数目标
    taskBuyPer: '',
    subordinateBuyNum: '-', // 下级购买有效订单数
    subordinateBuyTargetNum: '-', // 下级购买有效订单数目标
    activePercentage: '-', // 活跃人数目标比例
    activeOneCompletePer: '-', // 当前活跃任务一完成比例
    activeTwoCompletePer: '-', // 当前活跃任务二完成比例
    platformReward: '', // 过往奖励
    activeTwoStatus: '', // 活跃状态
    directPollenNum: '-', // 我的花粉
    directPollenNumToday: '-', // 我的花粉当天新增
    directMemberNum: '-', // 我的会员
    directMemberNumToday: '-', // 我的会员当天新增
    allPollenNum: '-', // 花粉总数
    allPollenNumToday: '-', // 花粉总数当天新增
    allPollenNumYesterday: '-', // 花粉总数昨天新增
    allPollenNumMonth: '-', // 花粉总数本月新增
    allMember: '-', // 会员总数
    allMemberToday: '-', // 会员总数当天新增
    allMemberYesterday: '-', // 会员总数昨天新增
    allMemberMonth: '-', // 会员总数本月新增
    goodsList: [], // 巨划算订单商品列表
    pageNum: 1, // 商品列表当前页数
    pageSize: 10, // 商品列表每页的数量
    totalPages: 10, // 总页数
    /* 广告位 */
    adListImage: [],
    autoplay: true,
    interval: 5000,
    currentIndex: 0,
    levelIndex: 1
  },
  onLoad() {
    this.getAdList()
    this.setData({
      isIphoneX: getApp().globalData.isIphoneX,
      shareImgUrl: getApp().globalData.shareImgUrl
    })
  },
  onShow() {
    const vipFlag = utils.getUserInfo().vipFlag === undefined ? 0 : utils.getUserInfo().vipFlag
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        backgroundColor: '#322A3D',
        shareIconUrl: '../assets/images/tabBar/menber_share_icon.png',
        selected: 1,
        vipFlag
      })
    }
    getApp().openSharePoster = () => {
      this.setData({
        levelIndex: 99999
      })
      this.selectComponent('#poster').openShare()
    }

    getApp().closeSharePoster = () => {
      this.setData({
        levelIndex: 1
      })
    }
  },
  onReady() {
    Promise.all([webapi.getWithdrawAndIncomeDetail(), webapi.getFansAndMemberDetail(), webapi.getActiveTaskDetail()]).then((result) => {
      let res
      if (result[0].code === 'K-000000') {
        res = result[0].context
        this.setData({
          canWithdrawPrice: res.canWithdrawPrice,
          todayPopularizeReward: res.todayPopularizeReward,
          todayPlatformReward: res.todayPlatformReward,
          monthReward: res.monthReward,
          todayPopularizeOrderNum: res.todayPopularizeOrderNum,
          todayPopularizeJhsOrderNum: res.todayPopularizeJhsOrderNum
        })
      }

      if (result[1].code === 'K-000000') {
        res = result[1].context
        this.setData({
          directPollenNum: res.directPollenNum,
          directPollenNumToday: res.directPollenNumToday,
          directMemberNum: res.directMemberNum,
          directMemberNumToday: res.directMemberNumToday,
          allPollenNum: res.allPollenNum,
          allPollenNumToday: res.allPollenNumToday,
          allPollenNumYesterday: res.allPollenNumYesterday,
          allPollenNumMonth: res.allPollenNumMonth,
          allMember: res.allMember,
          allMemberToday: res.allMemberToday,
          allMemberYesterday: res.allMemberYesterday,
          allMemberMonth: res.allMemberMonth
        })
      }

      if (result[2].code === 'K-000000') {
        res = result[2].context
        let per
        if (res.selfBuyNum <= res.selfBuyTargetNum) {
          per = (res.selfBuyNum / res.selfBuyTargetNum) * 100 + '%'
        } else {
          per = '100%'
        }

        this.setData({
          monthActivity: res.month,
          selfBuyNum: res.selfBuyNum,
          selfBuyTargetNum: res.selfBuyTargetNum,
          subordinateBuyNum: res.subordinateBuyNum,
          subordinateBuyTargetNum: res.subordinateBuyTargetNum,
          taskBuyPer: per,
          activePercentage: res.activePercentage,
          activeOneCompletePer: res.activeOneCompletePer,
          activeTwoCompletePer: res.activeTwoCompletePer,
          platformReward: res.platformReward,
          activeTwoStatus: res.activeTwoStatus
        })
      }
      return null
    }).catch((err) => {
      console.log(err)
    })
    this.getGoodsList()
  },
  // 底部加载更多
  scrollBottom() {
    if (!this.data.hasLoadingOver && !this.data.isLoading) {
      this.setData({isLoading: true})
      this.getGoodsList()
    }
  },
  // 获取商品列表
  async getGoodsList() {
    const params = {
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize
    }
    const result = await webapi.getJhsGoodsList(params)

    if (result.code === 'K-000000') {
      this.data.goodsList.push(...result.context.goodsVoPage.content)
      this.setData({
        pageNum: result.context.goodsVoPage.number + 1,
        goodsList: this.data.goodsList,
        isLoading: false
      })

      if (result.context.goodsVoPage.number === result.context.goodsVoPage.totalPages) {
        this.setData({hasLoadingOver: true})
      }
    }
  },
  toggleIncome() {
    this.setData({
      showIncome: !this.data.showIncome
    })
  },
  toggleFens() {
    this.setData({
      showFens: !this.data.showFens
    })
  },
  toGoodsDetail(e) {
    const id = e.currentTarget.dataset.id
    const isShare = !!parseInt(e.currentTarget.dataset.share, 10)
    wx.navigateTo({
      url: '../../pages/commodityDetail/commodityDetail?openShare=' + isShare + '&goodsId=' + id + '&thirdPlatform=2&hasCollage=false'
    })
  },
  toTaskDescription() {
    wx.navigateTo({url: '../../pages/taskDescription/taskDescription'})
  },
  toMyPollen() {
    wx.navigateTo({url: '../../pages/myPollen/myPollen'})
  },
  toIncomeDetails() {
    wx.navigateTo({url: '../../pages/incomeDetails/incomeDetails'})
  },
  toWithdrawalCenter() {
    wx.navigateTo({url: '../../pages/withdrawalCenter/withdrawalCenter'})
  },
  onShareAppMessage(e) {
    if (e.from === 'button') {
      this.selectComponent('#poster').cancelShare()
    }
    return {
      title: '逛京东，拼多多先来全民划算，领券购物更划算',
      path: 'pages/index/index?scene=' + utils.getUserInfo().customerId,
      imageUrl: imgHost + '/drawShare/share.png'
    }
  },
  /* E 分享画图 */
  // 广告位
  changeCurrent(e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
  jumpAdwebView(e) {
    wx.navigateTo({
      url: '../../pages/webViewPage/webViewPage?webSrc=' + e.currentTarget.dataset.jumpurl
    })
  },
  getAdList() {
    this.setData({
      adListImage: [{
        image: imgHost + '/introduction/banner-01.png',
        jumpUrl: hFiveHost + '/zeroUpgradeMember',
      }, {
        image: imgHost + '/introduction/banner-02.png',
        jumpUrl: hFiveHost + '/noviceGuide',
      }]
    })
  }
})
