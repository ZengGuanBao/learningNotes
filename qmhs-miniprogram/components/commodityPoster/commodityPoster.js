import create from '../../store/create'
import utils from '../../utils/utils'
import drawImage from '../../utils/drawImage'

create({
  properties: {
    goodsDetail: {
      type: Object,
      value: {}
    },
    hasCoupon: {
      type: Boolean,
      value: false
    },
    miniprogramCode: {
      type: String,
    }
  },
  data: {
    isIphoneX: false,
    shareImgUrl: '',
    isShowCommodityPopup: true,
  },
  ready() {
    const globalData = getApp().globalData
    this.setData({
      isIphoneX: globalData.isIphoneX
    })
  },
  methods: {
    openShare() {
      if (this.data.isShowCommodityPopup) {
        const userInfo = utils.getUserInfo()
        this.setData({
          isShowCommodityPopup: false,
          headImgUrl: userInfo.headImgUrl,
          nickName: userInfo.customerName ? userInfo.customerName : '',
        })
        if (!this.data.shareImgUrl) { // 没有生成海报图
          wx.showLoading({
            title: '正在加载…',
          })
          utils.debounce(() => {
            this.drawShareImage()
          }, 100)()
        }
      }
    },
    drawShareImage() {
      if (wx.canIUse('Canvas')) {
        if (!this.data.canvas) {
          wx.createSelectorQuery().in(this)
            .select('#canvas')
            .fields({node: true, size: true})
            .exec(this.initCanvas.bind(this))
        } else {
          if (this.data.goodsDetail.images[0].url.indexOf('https') === -1) {
            this.data.goodsDetail.images[0].url = this.data.goodsDetail.images[0].url.replace('http', 'https')
          }
          drawImage.drawCommodityImage(this.data.canvas, this.getTempFilePath.bind(this), this.data.headImgUrl, this.data.nickName, this.data.goodsDetail.goodsName, this.data.goodsDetail.images[0].url, this.data.hasCoupon, this.data.goodsDetail.couponDiscount, this.data.goodsDetail.lowestCouponPrice, this.data.goodsDetail.price, this.data.miniprogramCode)
        }
      } else {
        wx.hideLoading()
        wx.showToast({
          title: '微信版本太低',
          icon: 'none',
          duration: 2000
        })
      }
    },
    initCanvas(res) {
      const canvas = res[0].node
      canvas.width = res[0].width
      canvas.height = res[0].height
      this.setData({
        canvas
      })
      if (this.data.goodsDetail.images[0].url.indexOf('https') === -1) {
        this.data.goodsDetail.images[0].url = this.data.goodsDetail.images[0].url.replace('http', 'https')
      }
      drawImage.drawCommodityImage(this.data.canvas, this.getTempFilePath.bind(this), this.data.headImgUrl, this.data.nickName, this.data.goodsDetail.goodsName, this.data.goodsDetail.images[0].url, this.data.hasCoupon, this.data.goodsDetail.couponDiscount, this.data.goodsDetail.lowestCouponPrice, this.data.goodsDetail.price, this.data.miniprogramCode)
    },
    getTempFilePath() {
      if (!this.data.isShowCommodityPopup) {
        const that = this
        wx.canvasToTempFilePath({
          canvas: this.data.canvas,
          success: (res) => {
            wx.hideLoading()
            that.setData({
              shareImgUrl: res.tempFilePath
            })
            wx.setClipboardData({
              data: that.data.goodsDetail.goodsName,
              success() {
                wx.showToast({
                  title: '商品标题已复制',
                  duration: 2000
                })
              }
            })
          }
        })
      }
    },
    saveAlbum() {
      const that = this
      // 获取相册授权
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() { // 这里是用户同意授权后的回调
                wx.saveImageToPhotosAlbum({
                  filePath: that.data.shareImgUrl,
                  success: () => {
                    wx.showToast({
                      title: '保存成功',
                      icon: '../../assets/images/common/dialog-success.png',
                      duration: 2000
                    })
                  }
                })
              },
              fail() { // 这里是用户拒绝授权后的回调
                wx.showModal({
                  title: '提示',
                  content: '若不打开授权，则无法将图片保存在相册中！',
                  showCancel: true,
                  confirmText: '去授权',
                  confirmColor: '#FD4073',
                  success(res) {
                    if (res.confirm) {
                      wx.openSetting({
                        // 调起客户端小程序设置界面，返回用户设置的操作结果。
                      })
                    }
                  }
                })
              }
            })
          } else { // 用户已经授权过了
            wx.saveImageToPhotosAlbum({
              filePath: that.data.shareImgUrl,
              success: () => {
                wx.showToast({
                  title: '保存成功',
                  icon: '../../assets/images/common/dialog-success.png',
                  duration: 2000
                })
              }
            })
          }
        }
      })
    },
    cancelShare() {
      this.setData({
        isShowCommodityPopup: true
      })
      wx.hideLoading()
    }
  }
})
