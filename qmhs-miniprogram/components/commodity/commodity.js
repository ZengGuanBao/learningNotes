import create from '../../store/create'
import utils from '../../utils/utils'

create({
  properties: {
    commodityDatas: {
      type: Array,
      value: []
    },
    goodsSource: {
      type: String,
      value: ''
    },
    hasCollage: {
      type: Boolean,
      value: false
    },
    vipFlag: {
      type: Number,
      value: 0
    }
  },
  data: {
  },
  ready () {
    this.setData({
      vipFlag: utils.getUserInfo().vipFlag === undefined ? 0 : utils.getUserInfo().vipFlag,
    })
  },
  methods: {
    openMember () {
      wx.switchTab({
        url: '../../pages/member/member'
      })
    },
    openShare (e) {
      const goodsid = e.currentTarget.dataset.goodsid
      const thirdplatform = e.currentTarget.dataset.thirdplatform
      wx.navigateTo({
        url: '../../pages/commodityDetail/commodityDetail?openShare=true&goodsId=' + goodsid + '&thirdPlatform=' + thirdplatform + '&hasCollage=' + this.data.hasCollage
      })
    },
    toCommodityDetail (e) {
      const goodsid = e.currentTarget.dataset.goodsid
      const thirdplatform = e.currentTarget.dataset.thirdplatform
      wx.navigateTo({
        url: '../../pages/commodityDetail/commodityDetail?openShare=false&goodsId=' + goodsid + '&thirdPlatform=' + thirdplatform + '&hasCollage=' + this.data.hasCollage
      })
    }
  }
})
