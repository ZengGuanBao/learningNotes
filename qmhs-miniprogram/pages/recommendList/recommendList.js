import create from '../../store/create'
import store from '../../store/store'
import {imgHost} from '../../config/index'
import webapi from '../../utils/webapi'

create(store, {
  data: {
    /* 图片服务地址 */
    imgHost,
    commodityDatas: [],
    themName: '',
    thirdPlatform: '0',
    themeId: '',
    currentThemeId: '',
    themeImgUrl: '',
    currentId: '',
    jumpType: 0,
    pageNum: 1,
    recommendClassifyList: [],
    classifyIndex: '0',
    goodsSource: '',
    hasCollage: false,
    hasLoadingOver: false,
    isLoading: false,
    hasEmptyList: false,
    scrollTop: 0,
    classifyTop: 0
  },
  searchView() {
    wx.navigateTo({
      url: '../../pages/searchBar/searchBar?goodsSource=' + this.data.goodsSource
    })
  },
  onPageScroll(res) {
    this.setData({
      scrollTop: res.scrollTop
    })
  },
  getClassifyTop() {
    const that = this
    const categoryObj = wx.createSelectorQuery().in(this)
    categoryObj.selectAll('.normalClassify').boundingClientRect()
    categoryObj.exec(function (rect) {
      that.setData({
        classifyTop: rect[0][0].top
      })
    })
  },
  getClassifyIndex(e) {
    this.setData({
      pageNum: 1,
      commodityDatas: [],
      classifyIndex: e.detail.classifyIndex,
      currentThemeId: e.detail.currentThemeId,
      currentId: e.detail.currentId,
      hasLoadingOver: false,
      hasEmptyList: false
    })
    this.getThemeGoodsPage()
  },
  /* S 请求数据接口 */
  getJingFanGoods() {
    const params = {
      eliteId: this.data.themeId,
      pageIndex: this.data.pageNum,
      pageSize: 10
    }
    webapi.getJingFanGoods(params).then((res) => {
      if (res.code === 'K-000000') {
        if (res.context.goods.length === 0) {
          this.setData({
            hasEmptyList: true,
            hasLoadingOver: true,
            isLoading: false
          })
        } else {
          let commodityList = this.data.commodityDatas
          commodityList = commodityList.concat(res.context.goods)
          this.setData({
            commodityDatas: commodityList,
            isLoading: false,
            goodsSource: '0'
          })
        }
        wx.hideLoading({
          title: '正在加载…'
        })
        return true
      } else {
        wx.hideLoading({
          title: '正在加载…'
        })
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
  getPDDRecommendGoods() {
    const params = {
      channelType: this.data.themeId,
      pageIndex: this.data.pageNum,
      pageSize: 10
    }
    webapi.getPDDRecommendGoods(params).then((res) => {
      if (res.code === 'K-000000') {
        if (res.context.goods.length === 0) {
          this.setData({
            hasEmptyList: true,
            hasLoadingOver: true,
            isLoading: false
          })
        } else {
          let commodityList = this.data.commodityDatas
          commodityList = commodityList.concat(res.context.goods)
          this.setData({
            commodityDatas: commodityList,
            isLoading: false,
            goodsSource: '1'
          })
        }
        wx.hideLoading({
          title: '正在加载…'
        })
        return true
      } else {
        wx.hideLoading({
          title: '正在加载…'
        })
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
  getThemeId() {
    const that = this
    const params = {
      themeId: this.data.themeId
    }
    webapi.getThemeId(params).then((res) => {
      if (res.code === 'K-000000') {
        that.setData({
          recommendClassifyList: res.context.themeVO.themeCateVOList,
          currentThemeId: res.context.themeVO.themeCateVOList[0].themeId,
          currentId: res.context.themeVO.themeCateVOList[0].id,
          themeImgUrl: res.context.themeVO.themeImgUrl,
          goodsSource: res.context.themeVO.goodsSource,
          themName: res.context.themeVO.themeName
        })
        wx.setNavigationBarTitle({
          title: this.data.themName
        })
        this.getClassifyTop()
        this.getThemeGoodsPage()
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
    const that = this
    const params = {
      themeId: this.data.currentThemeId,
      themeCateId: this.data.currentId,
      pageNum: this.data.pageNum,
      pageSize: 10
    }
    webapi.getThemeGoodsPage(params).then((res) => {
      if (res.code === 'K-000000') {
        if (res.context.goods.length === 0) {
          this.setData({
            hasEmptyList: true,
            hasLoadingOver: true,
            isLoading: false
          })
        } else {
          let commodityList = this.data.commodityDatas
          commodityList = commodityList.concat(res.context.goods)
          that.setData({
            commodityDatas: commodityList,
            isLoading: false
          })
        }
        wx.hideLoading({
          title: '正在加载…'
        })
        return true
      } else {
        wx.hideLoading({
          title: '正在加载…'
        })
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
  getPage() {
    const params = {
      pageIndex: this.data.pageNum,
      pageSize: 10,
      thirdPlatform: this.data.thirdPlatform
    }
    webapi.getPage(params).then((res) => {
      if (res.code === 'K-000000') {
        if (res.context.goods.length === 0) {
          this.setData({
            hasEmptyList: true,
            hasLoadingOver: true,
            isLoading: false
          })
        } else {
          let commodityList = this.data.commodityDatas
          commodityList = commodityList.concat(res.context.goods)
          this.setData({
            isLoading: false,
            commodityDatas: commodityList,
            goodsSource: this.data.thirdPlatform
          })
        }
        wx.hideLoading({
          title: '正在加载…'
        })
        return true
      } else {
        wx.hideLoading({
          title: '正在加载…'
        })
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
  /* E 请求数据接口 */
  onLoad(options) {
    wx.showLoading({
      title: '正在加载…',
      mask: true
    })
    this.setData({
      themName: options.themName,
      themeId: options.themeId,
      jumpType: Number(options.jumpType),
      thirdPlatform: options.thirdPlatform
    })
    if (options.themeId === '34' && options.themName === '超值拼团') {
      this.setData({
        hasCollage: true
      })
    }
    if (this.data.jumpType === 1) {
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ffffff'
      })
      this.getThemeId()
    } else {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#fD4073'
      })
      if (options.thirdPlatform === '0' || options.thirdPlatform === '1') {
        this.getPage(options.thirdPlatform)
      } else if (this.data.jumpType === 2) {
        this.getJingFanGoods()
      } else if (this.data.jumpType === 3) {
        this.getPDDRecommendGoods()
      }
    }
    wx.setNavigationBarTitle({
      title: this.data.themName
    })
  },
  onReachBottom() {
    if (this.data.hasEmptyList === false) {
      this.setData({
        isLoading: true,
        pageNum: this.data.pageNum + 1
      })
      if (this.data.jumpType === 1) {
        this.getThemeGoodsPage()
      } else if (this.data.thirdPlatform === '0' || this.data.thirdPlatform === '1') {
        this.getPage()
      } else if (this.data.jumpType === 2) {
        this.getJingFanGoods()
      } else if (this.data.jumpType === 3) {
        this.getPDDRecommendGoods()
      }
    }
  }
})
