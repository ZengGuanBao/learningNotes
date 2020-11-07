import create from '../../store/create'
import store from '../../store/store'
import {imgHost} from '../../config/index'
import webapi from '../../utils/webapi'

create(store, {
  data: {
    imgHost,
    seachval: '',
    historyDatas: [],
    commodityDatas: [],
    pageNum: 1,
    widthInput: '',
    changeIcon: false,
    currentIndex: '0',
    sortUp: false,
    selectType: '综合',
    hasSearch: false,
    isCoupon: 0,
    sortName: '',
    sort: '',
    sortType: '',
    goodsSource: '',
    hasLoadingOver: false,
    isLoading: false,
    hasEmptyList: false,
    hasCommodityDatas: true
  },
  delHistory() {
    const that = this
    wx.showModal({
      content: '是否删除全部搜索历史记录？',
      confirmColor: '#FD4073',
      success(res) {
        if (res.confirm) {
          wx.removeStorage({
            key: 'searchHistory',
            success() {
              that.setData({
                historyDatas: []
              })
            }
          })
        }
      }
    })
  },
  bindKeyInput(e) {
    if (e.detail.value !== '') {
      this.setData({
        widthInput: '690rpx',
        changeIcon: true,
        seachval: e.detail.value
      })
    }
  },
  bindBlurInput() {
    if (this.data.seachval === '') {
      this.setData({
        widthInput: '596rpx',
        changeIcon: false
      })
    }
  },
  delSeachval() {
    this.setData({
      seachval: ''
    })
  },
  changeCurrentIndex(e) {
    const curindex = e.currentTarget.dataset.curindex
    this.setData({
      currentIndex: curindex,
      pageNum: 1,
      commodityDatas: [],
      hasEmptyList: false,
      hasLoadingOver: false
    })
    if (this.data.hasSearch === true) {
      this.getPage()
    }
  },
  searchHistory(e) {
    const itemval = e.currentTarget.dataset.itemval
    this.setData({
      hasSearch: true,
      pageNum: 1,
      commodityDatas: [],
      seachval: itemval
    })
    this.getPage()
  },
  search() {
    wx.showLoading({
      title: '正在加载…',
      mask: true
    })
    const historyValue = wx.getStorageSync('searchHistory')
    if (this.data.historyDatas.indexOf(this.data.seachval) === -1 && this.data.seachval !== '') {
      wx.setStorage({
        key: 'searchHistory',
        data: historyValue + ',' + this.data.seachval
      })
    }
    this.setData({
      hasSearch: true,
      pageNum: 1,
      commodityDatas: []
    })
    this.getPage()
  },
  getSelectType(e) {
    const selectType = e.currentTarget.dataset.selecttype
    this.setData({
      selectType,
      sortUp: this.data.sortUp !== true
    })
    if (selectType === '综合') {
      this.setData({
        sortType: 0,
        sortName: '',
        sort: ''
      })
    } else if (selectType === '销量') {
      this.setData({
        sortType: this.data.sortUp === true ? 5 : 6,
        sortName: 'inOrderCount30Days',
        sort: this.data.sortUp === true ? 'asc' : 'desc'
      })
    } else if (selectType === '价格') {
      this.setData({
        sortType: this.data.sortUp === true ? 3 : 4,
        sortName: 'price',
        sort: this.data.sortUp === true ? 'asc' : 'desc'
      })
    }
    this.setData({
      hasSearch: true,
      pageNum: 1,
      commodityDatas: []
    })
    this.getPage()
  },
  getHasCoupon() {
    this.setData({
      isCoupon: this.data.isCoupon === 0 ? 1 : 0
    })
    this.setData({
      hasSearch: true,
      pageNum: 1,
      commodityDatas: []
    })
    this.getPage()
  },
  /* S 请求数据接口 */
  getPage() {
    const params = {
      keyWord: this.data.seachval,
      pageIndex: this.data.pageNum,
      pageSize: 10,
      thirdPlatform: this.data.currentIndex,
      jdGoodsQuerySortVo: {
        sortName: this.data.sortName,
        sort: this.data.sort
      },
      pddGoodsQuerySortVo: {
        sortType: this.data.sortType
      },
      isCoupon: this.data.isCoupon
    }
    webapi.getPage(params).then((res) => {
      if (res.code === 'K-000000') {
        if (res.context.goods.length === 0) {
          this.setData({
            hasEmptyList: true,
            hasLoadingOver: true,
            isLoading: false
          })
          if (this.data.commodityDatas.length === 0) {
            this.setData({
              hasCommodityDatas: false,
              hasLoadingOver: false
            })
          }
        } else {
          let commodityList = this.data.commodityDatas
          commodityList = commodityList.concat(res.context.goods)
          this.setData({
            isLoading: false,
            commodityDatas: commodityList,
            goodsSource: this.data.currentIndex,
            hasCommodityDatas: true,
            hasEmptyList: false
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
    const historyValue = wx.getStorageSync('searchHistory')
    if (historyValue !== '') {
      this.setData({
        historyDatas: historyValue.split(',').slice(1).reverse().slice(0, 10)
      })
    }
    if (options.seachval) {
      this.setData({
        seachval: options.seachval
      })
      this.search()
    }
    if (options.goodsSource) {
      this.setData({
        currentIndex: options.goodsSource
      })
    }
  },
  onReachBottom() {
    if (this.data.hasEmptyList === false) {
      this.setData({
        isLoading: true,
        pageNum: this.data.pageNum + 1
      })
      this.getPage()
    }
  },
  toBack() {
    wx.navigateBack({
      delta: 1
    })
  }
})
