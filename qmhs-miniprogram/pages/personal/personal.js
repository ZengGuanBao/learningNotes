import create from '../../store/create'
import store from '../../store/store'
import utils from '../../utils/utils'
import webapi from '../../utils/webapi'
import wxUtils from '../../utils/wx'
import {imgHost} from '../../config/index'
import {generalMemberData, superMemberData} from '../../utils/menus'

create(store, {
  data: {
    headImgUrl: '', // 头像地址
    nickName: '', // 昵称
    inviteCode: '', // 推荐码
    vipFlag: 0,
    isLogin: false, // 是否登录
    customerLevelId: '',
    isIphoneX: false,
    levelIndex: 1
  },
  async onLoad() {
    if (utils.checkIsLogin()) {
      const result = await webapi.getUserInfo()
      if (result.code === 'K-000000') {
        utils.setUserInfo(result.context)
      } else if (result.code === 'K-010005') { // token 失效
        utils.clearAllUserInfo()
      }
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
    this.setData({
      shareImgUrl: getApp().globalData.shareImgUrl,
      isIphoneX: getApp().globalData.isIphoneX,
    })
  },
  onShow() {
    const userInfo = utils.getUserInfo()
    const isLogin = utils.checkIsLogin()
    if (isLogin) {
      this.setData({
        headImgUrl: userInfo.headImgUrl,
        nickName: userInfo.customerName ? userInfo.customerName : '',
        inviteCode: userInfo.inviteCode, // 推荐码
        vipFlag: userInfo.vipFlag,
        customerLevelId: parseInt(userInfo.customerLevelId, 10),
        isLogin
      })
    } else {
      this.setData({
        isLogin
      })
    }
    const vipFlag = utils.getUserInfo().vipFlag === undefined ? 0 : utils.getUserInfo().vipFlag
    if (vipFlag === 0) {
      wxUtils.hideShareMenu()
    } else {
      wxUtils.showShareMenu()
    }
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        backgroundColor: '#FD4073',
        shareIconUrl: '../assets/images/tabBar/share_icon.png',
        selected: 2,
        list: vipFlag ? superMemberData.list : generalMemberData.list,
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
  navigateToAbout() {
    wx.navigateTo({url: '../../pages/about/about'})
  },
  navigateToFaq() {
    wx.navigateTo({url: '../../pages/faq/faq'})
  },
  navigateToMoreOrder() {
    if (this.data.isLogin) {
      wx.navigateTo({url: '../../pages/order/order?index=2'})
    } else {
      this.navigateToLogin()
    }
  },
  navigateToJd() {
    if (this.data.isLogin) {
      wx.navigateTo({url: '../../pages/order/order?index=0'})
    } else {
      this.navigateToLogin()
    }
  },
  navigateToPdd() {
    if (this.data.isLogin) {
      wx.navigateTo({url: '../../pages/order/order?index=1'})
    } else {
      this.navigateToLogin()
    }
  },
  navigateToProtocol() {
    wx.navigateTo({url: '../../pages/protocol/protocol'})
  },
  navigateToLogin() {
    if (!this.data.isLogin) {
      getApp().globalData.loginRedirect = 'personal'
      wx.navigateTo({url: '../../pages/login/login'})
    }
  },
  navigateToUniversity() {
    if (this.data.isLogin) {
      if (this.data.vipFlag) {
        wx.navigateTo({url: '../../pages/qmUniversity/qmUniversity'})
      } else {
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
      }
    } else {
      this.navigateToLogin()
    }
  },
  navigateToRedeemCode() {
    wx.navigateTo({url: '../../pages/redeemCode/redeemCode'})
  },
  copyInviteCode() {
    wx.setClipboardData({
      data: this.data.inviteCode,
      success() {
        wx.showToast({
          title: '复制成功',
          duration: 2000
        })
      }
    })
  },
  phoneCall() {
    wx.makePhoneCall({
      phoneNumber: '400-6783-909'
    })
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
  }
})
