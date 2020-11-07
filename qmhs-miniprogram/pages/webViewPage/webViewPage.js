// 该页面用于存放内嵌网页
import create from '../../store/create'
import store from '../../store/store'

create(store, {
  data: {
    web_src: '', // webview内嵌的url
    settingTitle: '', // 配置的标题
    settingImg: '', // 配置的图片
    shareTitle: '', // 图片信息
    skuId: '', // 商品skuId
    shareUserId: '', // 分享人UserId
    token: '', // jwt token信息
  },
  /**
    * 拿到H5发生给小程序的消息
    */
  onLoad(options) {
    this.setData({
      web_src: options.webSrc
    })
  },
  msgHandler(res) {
    const that = this
    // 因为这边是数据。所以取最后一个数据是传过来的数据
    const data = res.detail.data[res.detail.data.length - 1]
    if (data.type === 'goodsShare') {
      that.setData({
        shareTitle: data.goodsName,
        skuId: data.skuId,
        shareUserId: data.shareUserId,
        token: data.token
      })
    } else if (data.type === 'sendToken') {
      that.setData({
        shareUserId: data.shareUserId,
        token: data.token
      })
    }
  }
})
