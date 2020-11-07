import create from '../../store/create'
import utils from '../../utils/utils'
import drawImage from '../../utils/drawImage'

create({
  properties: { },
  data: {
    isIphoneX: false,
    interval: 2000,
    duration: 500,
    autoplay: false,
    currentIndex: 0,
    shareImgUrl: [],
    drawUserInfo: {},
    bigShareImgWidth: 500,
    bigShareImgHeight: 889.33,
    userInfo: {},
    showMiniprogramPopup: false,
    isLoadingDraw: false
  },
  ready() {
    const globalData = getApp().globalData
    this.setStyles(globalData)
    this.setData({
      isIphoneX: globalData.isIphoneX,
    })
  },
  methods: {
    openShare() {
      const userInfo = utils.getUserInfo()
      this.setData({
        showMiniprogramPopup: true,
        headImgUrl: userInfo.headImgUrl,
        nickName: userInfo.customerName ? userInfo.customerName : '',
        shareImgUrl: getApp().globalData.shareImgUrl
      })
      if (this.data.shareImgUrl.length < 4) {
        wx.showLoading({
          title: '正在加载…',
        })
        if (!this.data.isLoadingDraw) {
          this.getInviteWxaCode()
        }
      }
    },
    /* 取消分享 */
    cancelShare() {
      this.setData({
        showMiniprogramPopup: false
      })
      wx.hideLoading()
      // eslint-disable-next-line no-unused-expressions
      getApp().closeSharePoster && getApp().closeSharePoster()
    },
    changeCurrent(e) {
      this.setData({
        currentIndex: e.detail.current
      })
    },
    navChange(e) {
      const pagePath = e.currentTarget.dataset.pagepath
      const cur = e.currentTarget.dataset.cur
      if (this.properties.pageCur !== cur) {
        wx.reLaunch({
          url: pagePath
        })
      }
    },
    setStyles(globalData) {
      const screenRatio = globalData.screenHeight / (globalData.screenWidth * 2.1)
      const height = screenRatio * this.data.bigShareImgHeight
      const width = screenRatio * this.data.bigShareImgWidth
      this.setData({
        swiperStyle: '--bigShareImgHeight: ' + height + 'rpx',
        swiperItemStyle: '--smallShareImgWidth: ' + 0.8 * width + 'rpx;--smallShareImgHeight: ' + 0.8 * height + 'rpx',
        swiperActiveItemStyle: '--bigShareImgWidth: ' + width + 'rpx;--bigShareImgHeight: ' + height + 'rpx',
        shareDotStyle: '--shareDotTop:' + (120 + height) + 'rpx'
      })
    },
    /* S 分享画图 */
    async getInviteWxaCode() {
      const miniprogramCodeImg = utils.getMiniprogramCode()
      this.setData({
        miniprogramCodeImg
      })
      if (miniprogramCodeImg) {
        this.setData({
          isLoadingDraw: true
        })
        this.drawShareImage()
      } else {
        getApp().getInviteWxaCode()
        wx.hideLoading()
        wx.showToast({
          title: '加载失败，请稍后重试',
          icon: 'none',
          duration: 2000
        })
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
          drawImage.drawMiniprogramImage(this.data.canvas, this.getTempFilePath.bind(this), this.data.shareImgUrl.length, this.data.headImgUrl, this.data.nickName, this.data.miniprogramCodeImg)
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
    getTempFilePath() {
      if (this.data.showMiniprogramPopup) {
        const that = this
        wx.canvasToTempFilePath({
          canvas: this.data.canvas,
          success: (res) => {
            const imgUrl = this.data.shareImgUrl
            imgUrl.push(res.tempFilePath)
            that.setData({
              shareImgUrl: imgUrl
            })
            getApp().globalData.shareImgUrl = that.data.shareImgUrl
            if (that.data.shareImgUrl.length < 4) {
              drawImage.drawMiniprogramImage(this.data.canvas, this.getTempFilePath.bind(this), that.data.shareImgUrl.length, this.data.headImgUrl, this.data.nickName, that.data.miniprogramCodeImg)
            } else {
              wx.hideLoading()
            }
          }
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
      drawImage.drawMiniprogramImage(this.data.canvas, this.getTempFilePath.bind(this), this.data.shareImgUrl.length, this.data.headImgUrl, this.data.nickName, this.data.miniprogramCodeImg)
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
                  filePath: that.data.shareImgUrl[that.data.currentIndex],
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
                      wx.openSetting({})
                    }
                  }
                })
              }
            })
          } else { // 用户已经授权过了
            wx.saveImageToPhotosAlbum({
              filePath: that.data.shareImgUrl[that.data.currentIndex],
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
    }
  }
})
