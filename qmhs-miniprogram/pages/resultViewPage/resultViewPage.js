import create from '../../store/create'
import store from '../../store/store'

create(store, {
  data: {
    resultType: '' // 页面路由参数
  },
  /**
   *  redeemCode 兑换码成功结果页
   */
  onLoad(options) {
    this.setData({
      resultType: options.resultType
    })
  },
  toMemberPage() {
    wx.switchTab({
      url: '../../pages/member/member'
    })
  },
  toIndexPage() {
    wx.switchTab({
      url: '../../pages/index/index'
    })
  }
})
