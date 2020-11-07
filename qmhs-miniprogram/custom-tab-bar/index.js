// eslint-disable-next-line no-unused-vars
import {generalMemberData, superMemberData} from '../utils/menus'
import utils from '../utils/utils'

Component({
  data: {
    selected: 0,
    isIphoneX: false,
    vipFlag: 0,
    backgroundColor: '#FD4073',
    shareIconUrl: '../assets/images/tabBar/share_icon.png',
    list: []
  },
  attached() {
    const vipFlag = utils.getUserInfo().vipFlag === undefined ? 0 : utils.getUserInfo().vipFlag
    this.setData({
      isIphoneX: getApp().globalData.isIphoneX,
      list: vipFlag ? superMemberData.list : generalMemberData.list,
      vipFlag,
    })
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
    },
    openSharePoster() {
      // eslint-disable-next-line no-unused-expressions
      getApp().openSharePoster && getApp().openSharePoster()
    }
  }
})
