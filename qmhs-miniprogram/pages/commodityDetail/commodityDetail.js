import create from '../../store/create'
import store from '../../store/store'
import {imgHost} from '../../config/index'
import webapi from '../../utils/webapi'
import utils from '../../utils/utils'
import wxUtils from '../../utils/wx'

create(store, {
  data: {
    /* 邀请人ID */
    invitationCustomerId: '',
    /* 分享进来的信息 */
    thirdGoodsShareId: '',
    /* 商品ID */
    goodsId: '',
    /* 是否有券 */
    hasCoupon: false,
    /* 来源 */
    thirdPlatform: '',
    /* 是否分享 */
    openShare: 'false',
    /* 是否平台用户 */
    loginFlag: false,
    /* 是否超级会员 */
    vipFlag: 0,
    isIphoneX: false,
    /* 轮播图片 */
    autoplay: true,
    duration: 500,
    currentIndex: 0,
    /* 产品详情Data */
    goodsDetail: {},
    thirdPlatformName: '',
    /* 是否拼团详情 */
    hasCollage: false,
    miniprogramCode: '',
    imgHost,
    repeatClick: false
  },
  previewImg(e) {
    const index = e.currentTarget.dataset.index
    const imgArr = []
    e.currentTarget.dataset.imgarr.forEach(element => {
      imgArr.push(element.url)
    })
    wx.previewImage({
      current: imgArr[index], // 当前图片地址
      urls: imgArr, // 所有要预览的图片的地址集合 数组形式
      success() { },
      fail() { },
      complete() { },
    })
  },
  changeCurrent(e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
  openMember() {
    wx.switchTab({
      url: '../../pages/member/member'
    })
  },
  onShow() {
    if (utils.checkIsLogin()) {
      this.setData({
        loginFlag: true,
        vipFlag: utils.getUserInfo().vipFlag
      })
    } else {
      this.setData({
        loginFlag: false,
        vipFlag: 0,
      })
    }
    const vipFlag = utils.getUserInfo().vipFlag === undefined ? 0 : utils.getUserInfo().vipFlag
    if (vipFlag === 0) {
      wxUtils.hideShareMenu()
    } else {
      wxUtils.showShareMenu()
    }
  },
  navigateToLogin() {
    getApp().globalData.loginRedirect = 'goodsDetail'
    wx.navigateTo({url: '../../pages/login/login'})
  },
  buyMember() {
    if (this.data.loginFlag) {
      wx.navigateTo({
        url: '../../pages/confirmOrder/confirmOrder?id=' + this.data.goodsId
      })
    } else {
      this.navigateToLogin()
    }
  },
  /* S 请求数据接口 */
  async getShareGoodsCode() {
    const customerId = utils.getUserInfo().customerId === undefined ? '' : utils.getUserInfo().customerId
    if (customerId) {
      const params = {
        customerId,
        goodsId: this.data.goodsId,
        channelType: Number(this.data.thirdPlatform) + 1,
        page: 'pages/commodityDetail/commodityDetail',
        width: 180
      }
      const res = await webapi.getShareGoodsCode(params)
      if (res.code === 'K-000000') {
        this.setData({
          miniprogramCode: res.context
        })
        if (this.data.openShare === 'true') {
          this.handelOpenShare()
        }
      }
    } else if (this.data.openShare === 'true') {
      wx.hideLoading()
    }
  },
  handelOpenShare() {
    if (this.data.miniprogramCode) {
      this.selectComponent('#commodityPoster').openShare()
    } else {
      this.getShareGoodsCode()
      console.log('加载失败，请稍后重试')
    }
  },
  getShareGoodsParameters() {
    const params = {
      thirdGoodsShareId: this.data.thirdGoodsShareId
    }
    webapi.getShareGoodsParameters(params).then((res) => {
      if (res.code === 'K-000000') {
        getApp().globalData.invitationCustomerId = res.context.shareGoodsParametersResponseVO.customerId
        this.setData({
          invitationCustomerId: res.context.shareGoodsParametersResponseVO.customerId,
          goodsId: res.context.shareGoodsParametersResponseVO.goodsId,
          thirdPlatform: (res.context.shareGoodsParametersResponseVO.channelType - 1) + ''
        })
        switch (this.data.thirdPlatform) {
          case '0':
            this.setData({
              thirdPlatformName: '京东'
            })
            this.getPage()
            break
          case '1':
            this.setData({
              thirdPlatformName: '拼多多'
            })
            this.getDetail()
            break
          case '2':
            this.setData({
              thirdPlatformName: '巨划算'
            })
            this.getJhsGoodsDetail()
            break
          default:
            break
        }
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
  getPage() {
    const params = {
      thirdPlatform: 0,
      goodsIds: [this.data.goodsId]
    }
    webapi.getPage(params).then((res) => {
      if (this.data.openShare !== 'true') {
        wx.hideLoading()
      }
      if (res.code === 'K-000000') {
        res.context.goods[0].couponInfoVos.forEach((element) => {
          if (element.isBest === 1) {
            res.context.goods[0].couponDiscountStartTime = element.startTime.substring(0, 10)
            res.context.goods[0].couponDiscountEndTime = element.endTime.substring(0, 10)
          }
        })
        res.context.goods[0].totalMoney = (res.context.goods[0].couponDiscount * 100 + res.context.goods[0].rebateAmount * 100) / 100
        this.setData({
          goodsDetail: res.context.goods[0]
        })
        if (res.context.goods[0].couponDiscount > 0) {
          this.setData({
            hasCoupon: true
          })
        }
        this.getShareGoodsCode()
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
  getDetail() {
    const params = {
      thirdPlatform: this.data.thirdPlatform,
      goodsId: this.data.goodsId
    }
    webapi.getDetail(params).then((res) => {
      if (this.data.openShare !== 'true') {
        wx.hideLoading()
      }
      if (res.code === 'K-000000') {
        res.context.goods[0].couponInfoVos.forEach((element) => {
          if (element.isBest === 1) {
            res.context.goods[0].couponDiscountStartTime = element.startTime.substring(0, 10)
            res.context.goods[0].couponDiscountEndTime = element.endTime.substring(0, 10)
          }
        })
        res.context.goods[0].totalMoney = (res.context.goods[0].couponDiscount * 100 + res.context.goods[0].rebateAmount * 100) / 100
        this.setData({
          goodsDetail: res.context.goods[0]
        })
        if (res.context.goods[0].couponDiscount > 0) {
          this.setData({
            hasCoupon: true
          })
        }
        this.getShareGoodsCode()
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
  getJhsGoodsDetail() {
    const params = {
      id: this.data.goodsId,
      customerId: utils.getUserInfo().customerId === undefined ? '' : utils.getUserInfo().customerId
    }
    webapi.getJhsGoodsDetail(params).then((res) => {
      if (this.data.openShare !== 'true') {
        wx.hideLoading()
      }
      if (res.code === 'K-000000') {
        const jhsGoods = res.context.goodsVo
        jhsGoods.images = []
        res.context.goodsVo.imgUrls.split(',').forEach(element => {
          jhsGoods.images.push({
            url: element
          })
        })
        jhsGoods.lowestCouponPrice = res.context.goodsVo.salePrice
        jhsGoods.price = res.context.goodsVo.linePrice
        jhsGoods.salesTip = res.context.goodsVo.sale
        jhsGoods.rebateAmount = res.context.goodsVo.rewardPrice
        jhsGoods.detailHtml = jhsGoods.detailHtml.replace(/<img/g, '<img class="imgclass"')
        jhsGoods.detailHtml = jhsGoods.detailHtml.replace(/<p/g, '<p class="pclass"')
        this.setData({
          goodsDetail: jhsGoods
        })
        this.getShareGoodsCode()
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
  getCustomerPromotionUrl() {
    if (this.data.loginFlag) {
      const that = this
      let couponUrl = ''
      this.data.goodsDetail.couponInfoVos.forEach(element => {
        if (element.isBest === 1) {
          couponUrl = element.link
        }
      })
      const params = {
        promotionUrlRequestList: [{
          customerId: utils.getUserInfo().customerId === undefined ? '' : utils.getUserInfo().customerId,
          pidCreateType: 0,
          thirdPlatform: this.data.thirdPlatform,
          goodsId: this.data.goodsId,
          materialUrl: this.data.goodsDetail.materialUrl,
          couponUrl
        }]
      }
      if (this.data.repeatClick === false) {
        this.setData({repeatClick: true})
        webapi.getCustomerPromotionUrl(params).then((res) => {
          if (res.code === 'K-000000') {
            switch (this.data.thirdPlatform) {
              case '0':
                if (this.data.hasCollage === true) {
                  wx.navigateToMiniProgram({
                    appId: 'wxca1fe42a16552094',
                    path: '/pages/union/proxy/proxy?spreadUrl=' + encodeURIComponent(res.context.promotionUrlList[0]),
                    envVersion: 'release',
                    complete() {
                      that.setData({
                        repeatClick: false
                      })
                    }
                  })
                } else {
                  wx.navigateToMiniProgram({
                    appId: 'wx91d27dbf599dff74',
                    path: '/pages/union/proxy/proxy?spreadUrl=' + encodeURIComponent(res.context.promotionUrlList[0]),
                    envVersion: 'release',
                    complete() {
                      that.setData({
                        repeatClick: false
                      })
                    }
                  })
                }
                break
              case '1':
                wx.navigateToMiniProgram({
                  appId: 'wx32540bd863b27570',
                  path: res.context.promotionUrlList[0].split(',')[1],
                  envVersion: 'release',
                  complete() {
                    that.setData({
                      repeatClick: false
                    })
                  }
                })
                break
              default:
                break
            }
            return true
          } else {
            this.setData({
              repeatClick: false
            })
            wx.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000
            })
            throw new Error(res.message)
          }
        }).catch(function () {
          that.setData({
            repeatClick: false
          })
        })
      }
    } else {
      this.navigateToLogin()
    }
  },
  /* E 请求数据接口 */
  onLoad(options) {
    wx.showLoading({
      title: '正在加载…',
    })
    this.setData({
      goodsId: options.goodsId === undefined ? '' : options.goodsId,
      thirdPlatform: options.thirdPlatform === undefined ? '' : options.thirdPlatform,
      hasCollage: options.hasCollage === undefined ? false : JSON.parse(options.hasCollage),
      openShare: options.openShare === undefined ? false : options.openShare,
      thirdGoodsShareId: options.scene === undefined ? '' : options.scene,
      isIphoneX: getApp().globalData.isIphoneX
    })
    if (this.data.thirdGoodsShareId !== '') {
      this.getShareGoodsParameters()
    } else {
      if (options.invitationCustomerId) {
        getApp().globalData.invitationCustomerId = options.invitationCustomerId
      }
      this.setData({
        invitationCustomerId: getApp().globalData.invitationCustomerId
      })
      switch (this.data.thirdPlatform) {
        case '0':
          this.setData({
            thirdPlatformName: '京东'
          })
          this.getPage()
          break
        case '1':
          this.setData({
            thirdPlatformName: '拼多多'
          })
          this.getDetail()
          break
        case '2':
          this.setData({
            thirdPlatformName: '巨划算'
          })
          this.getJhsGoodsDetail()
          break
        default:
          break
      }
    }
  },
  onShareAppMessage() {
    return {
      title: this.data.thirdPlatformName + this.data.goodsDetail.goodsName,
      path: 'pages/commodityDetail/commodityDetail?invitationCustomerId=' + utils.getUserInfo().customerId + '&goodsId=' + this.data.goodsId + '&thirdPlatform=' + this.data.thirdPlatform,
      imageUrl: this.data.goodsDetail.images[0].url
    }
  }
})
