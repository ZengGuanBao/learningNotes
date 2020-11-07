import create from '../../store/create'
import store from '../../store/store'
import {imgHost} from '../../config/index'
import webapi from '../../utils/webapi'
import utils from '../../utils/utils'
import {generalMemberData, superMemberData} from '../../utils/menus'

create(store, {
  data: {
    imgHost,
    animationData: {},
    maskNone: true,
    animationWidth: '',
    memberCommodityList: [],
    pageNum: 1,
    isLogin: false, // 是否登录
    invitationCustomerId: '',
    hasLoadingOver: false,
    isLoading: false,
    hasEmptyList: false,
    isIphoneX: false
  },
  onReady() {
    this.setData({
      isIphoneX: getApp().globalData.isIphoneX,
    })
  },
  easeIn() {
    this.animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-in',
    })
    this.animation.translateX(-(this.data.animationWidth)).step()
    this.setData({
      animationData: this.animation.export(),
      maskNone: false
    })
  },
  easeOut() {
    this.animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-in',
    })
    this.animation.translateX(this.data.animationWidth).step()
    this.setData({
      animationData: this.animation.export(),
      maskNone: true
    })
  },
  toMemberCommodityDetail(e) {
    const goodsid = e.currentTarget.dataset.goodsid
    wx.navigateTo({
      url: '../../pages/commodityDetail/commodityDetail?openShare=false&goodsId=' + goodsid + '&thirdPlatform=2&hasCollage=false'
    })
  },
  openMember(e) {
    if (this.data.isLogin) {
      const id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '../../pages/confirmOrder/confirmOrder?id=' + id
      })
    } else {
      this.navigateToLogin()
    }
  },
  navigateToLogin() {
    getApp().globalData.loginRedirect = 'member'
    wx.navigateTo({url: '../../pages/login/login'})
  },
  /* S 请求数据接口 */
  getJhsGoodsPage() {
    if (this.data.hasEmptyList === false && this.data.isLoading === false) {
      const params = {
        customerId: utils.getUserInfo().customerId === undefined ? '' : utils.getUserInfo().customerId,
        pageNum: this.data.pageNum++,
        pageSize: 5
      }
      this.setData({
        isLoading: true,
      })
      webapi.getJhsGoodsPage(params).then((res) => {
        if (res.code === 'K-000000') {
          if (res.context.goodsVoPage.totalPages <= res.context.goodsVoPage.number) {
            this.setData({
              hasEmptyList: true,
              hasLoadingOver: true,
            })
          }
          let commodityList = this.data.memberCommodityList
          commodityList = commodityList.concat(res.context.goodsVoPage.content)
          this.setData({
            isLoading: false,
            memberCommodityList: commodityList,
            pageNum: this.data.pageNum
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
    }
  },
  /* E 请求数据接口 */
  onShow() {
    const isLogin = utils.checkIsLogin()
    const vipFlag = utils.getUserInfo().vipFlag === undefined ? 0 : utils.getUserInfo().vipFlag
    this.setData({
      isLogin
    })
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        backgroundColor: '#322A3D',
        shareIconUrl: '../assets/images/tabBar/menber_share_icon.png',
        selected: 1,
        list: vipFlag ? superMemberData.list : generalMemberData.list,
        vipFlag
      })
    }
    if (vipFlag) {
      wx.switchTab({url: '/pages/superMemberCenter/superMemberCenter'})
    } else {
      this.setData({
        hasLoadingOver: false,
        isLoading: false,
        hasEmptyList: false,
        pageNum: 1,
        memberCommodityList: []
      })
      this.getJhsGoodsPage()
    }
  },
  onLoad() {
    const that = this
    const obj = wx.createSelectorQuery().in(this)
    obj.selectAll('.member-mask-block').boundingClientRect()
    obj.exec(function (rect) {
      that.setData({
        animationWidth: rect[0][0].width,
        invitationCustomerId: getApp().globalData.invitationCustomerId
      })
    })
  },
  onReachBottom() {
    this.getJhsGoodsPage()
  }
})
