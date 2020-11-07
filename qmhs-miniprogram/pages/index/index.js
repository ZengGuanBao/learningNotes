import create from '../../store/create'
import store from '../../store/store'
import {imgHost} from '../../config/index'
import webapi from '../../utils/webapi'
import utils from '../../utils/utils'
import wxUtils from '../../utils/wx'
import {generalMemberData, superMemberData} from '../../utils/menus'

create(store, {
  data: {
    /* 邀请人ID */
    invitationCustomerId: '',
    vipFlag: 0,
    isIphoneX: false,
    /* 图片服务地址 */
    imgHost,
    /* 广告位list */
    advertsListOne: [],
    advertsListTwo: [],
    advertsListThree: [],
    /* 轮播图list */
    bannerImage: [],
    autoplay: true,
    duration: 500,
    currentIndex: 0,
    /* 主题list */
    homeThemeList: [],
    /* 分类list */
    homeClassifyList: [],
    tabIndex: '0',
    currentThemeId: '',
    currentId: '',
    pageNum: 1,
    /* 产品列表 */
    goodsSource: '',
    commodityDatas: [],
    hasLoadingOver: false,
    isLoading: false,
    hasEmptyList: false,
    levelIndex: 1,
    isFixed: false // 是否吸顶
  },
  categoryScroll(eventhandle) {
    this.setData({
      isFixed: eventhandle.detail.isFixed
    })
  },
  changeCurrent(e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
  changeCurrentIndex(e) {
    const curindex = e.currentTarget.dataset.curindex
    const themeId = e.currentTarget.dataset.themeid
    const Id = e.currentTarget.dataset.id
    this.setData({
      tabIndex: curindex,
      pageNum: 1,
      currentThemeId: themeId,
      currentId: Id,
      commodityDatas: [],
      hasLoadingOver: false,
      hasEmptyList: false,
      isLoading: false
    })
    this.getThemeGoodsPage()
  },
  searchView() {
    wx.navigateTo({
      url: '../../pages/searchBar/searchBar'
    })
  },
  jumpRecommendList(e) {
    let jumpurl = ''
    const jumpId = e.currentTarget.dataset.jumpid
    const themName = e.currentTarget.dataset.themename
    const jumpType = e.currentTarget.dataset.jumptype
    if (jumpType === 100) {
      jumpurl = '../../pages/webViewPage/webViewPage?webSrc=' + e.currentTarget.dataset.jumpurl
    } else if (jumpType === 1) {
      jumpurl = '../../pages/recommendList/recommendList?jumpType=1&themName=' + themName + '&themeId=' + jumpId
    } else {
      jumpurl = e.currentTarget.dataset.jumpurl
    }
    // 是否超级会员
    if (['recomProduct', 'coupon', 'qmUniversity'].some((e) => jumpurl.indexOf(e) !== -1) && this.data.vipFlag === 0) {
      wx.showModal({
        content: '此模块会员才能查看,请升级会员',
        confirmText: '去升级',
        confirmColor: '#FD4073',
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../../pages/member/member'
            })
          }
        }
      })
    } else {
      wx.navigateTo({
        url: jumpurl
      })
    }
  },
  onShow() {
    const vipFlag = utils.getUserInfo().vipFlag === undefined ? 0 : utils.getUserInfo().vipFlag
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        backgroundColor: '#FD4073',
        shareIconUrl: '../assets/images/tabBar/share_icon.png',
        selected: 0,
        list: vipFlag ? superMemberData.list : generalMemberData.list,
        vipFlag
      })
    }
    this.setData({
      vipFlag
    })
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
    if (vipFlag === 0) {
      wxUtils.hideShareMenu()
    } else {
      wxUtils.showShareMenu()
    }
  },
  /* S 请求数据接口 */
  getAdvertsList() {
    const that = this
    webapi.getAdvertsList({positionId: 1}).then(res => {
      wx.hideLoading()
      if (res.code === 'K-000000') {
        that.setData({
          bannerImage: res.context.advertsVOList
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
    webapi.getAdvertsList({positionId: 2}).then(res => {
      wx.hideLoading()
      if (res.code === 'K-000000') {
        that.setData({
          advertsListOne: res.context.advertsVOList
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
    webapi.getAdvertsList({positionId: 3}).then(res => {
      wx.hideLoading()
      if (res.code === 'K-000000') {
        that.setData({
          advertsListTwo: res.context.advertsVOList
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
    webapi.getAdvertsList({positionId: 4}).then(res => {
      wx.hideLoading()
      if (res.code === 'K-000000') {
        that.setData({
          advertsListThree: res.context.advertsVOList
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
  getNavigationList() {
    webapi.getNavigationList().then((res) => {
      wx.hideLoading()
      if (res.code === 'K-000000') {
        this.setData({
          homeThemeList: res.context.navigationVOPage.content
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
  getThemeIdDefault() {
    const that = this
    webapi.getThemeIdDefault().then((res) => {
      if (res.code === 'K-000000') {
        this.setData({
          homeClassifyList: res.context.themeVO.themeCateVOList,
          currentThemeId: res.context.themeVO.themeCateVOList[0].themeId,
          currentId: res.context.themeVO.themeCateVOList[0].id,
          goodsSource: res.context.themeVO.goodsSource
        })
        that.getThemeGoodsPage()
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
  getThemeGoodsPage() {
    if (this.data.hasEmptyList === false && this.data.isLoading === false) {
      const params = {
        themeId: this.data.currentThemeId,
        themeCateId: this.data.currentId,
        pageNum: this.data.pageNum++,
        pageSize: 10
      }
      this.setData({
        isLoading: true,
      })
      webapi.getThemeGoodsPage(params).then((res) => {
        wx.hideLoading()
        if (res.code === 'K-000000') {
          if (res.context.goods.length === 0) {
            this.setData({
              hasEmptyList: true,
              hasLoadingOver: true,
              isLoading: false,
              pageNum: this.data.pageNum
            })
          } else {
            let commodityList = this.data.commodityDatas
            commodityList = commodityList.concat(res.context.goods)
            this.setData({
              commodityDatas: commodityList,
              isLoading: false,
              pageNum: this.data.pageNum
            })
          }
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
    }
  },
  /* E 请求数据接口 */
  onLoad(options) {
    wx.showLoading({
      title: '正在加载…'
    })
    if (options.scene) {
      getApp().globalData.invitationCustomerId = options.scene
    }
    this.setData({
      isIphoneX: getApp().globalData.isIphoneX,
      invitationCustomerId: getApp().globalData.invitationCustomerId,
      shareImgUrl: getApp().globalData.shareImgUrl
    })
    // 获取banner和广告位信息
    this.getAdvertsList()
    this.getNavigationList()
    this.getThemeIdDefault()
  },
  onReachBottom() {
    this.getThemeGoodsPage()
  },
  /* E 分享画图 */
  onShareAppMessage(e) {
    if (e.from === 'button') {
      this.selectComponent('#poster').cancelShare()
    }
    return {
      title: '逛京东，拼多多先来全民划算，领券购物更划算',
      path: 'pages/index/index?scene=' + utils.getUserInfo().customerId,
      imageUrl: imgHost + '/drawShare/share.png'
    }
  }
})
