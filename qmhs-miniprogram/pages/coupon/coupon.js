import create from '../../store/create'
import store from '../../store/store'
import webapi from '../../utils/webapi'
import utils from '../../utils/utils'

create(store, {
  data: {
    couponList: [],
    pageNum: 1,
    shareContent: '',
    hasLoadingOver: false,
    isLoading: false,
    hasEmptyList: false,
    hasClick: false,
    couponNameList: []
  },
  /* S 请求数据接口 */
  getCouponPage() {
    const params = {
      pageNum: this.data.pageNum,
      pageSize: 5
    }
    webapi.getCouponPage(params).then((res) => {
      if (res.code === 'K-000000') {
        if (res.context.couponTitleVoPage.content.length === 0) {
          this.setData({
            hasEmptyList: true,
            hasLoadingOver: true,
            isLoading: false
          })
        } else {
          let couponData = this.data.couponList
          couponData = couponData.concat(res.context.couponTitleVoPage.content)
          this.setData({
            couponList: couponData,
            isLoading: false
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
  getCouponDetail(e) {
    if (this.data.hasClick === false) {
      this.setData({
        hasClick: true
      })
      const params = {
        id: e.currentTarget.dataset.id
      }
      webapi.getCouponDetail(params).then((res) => {
        if (res.code === 'K-000000') {
          this.setData({
            shareContent: e.currentTarget.dataset.copywrite
          })
          this.setData({
            couponNameList: res.context.couponVoList
          })
          const paramsList = []
          res.context.couponVoList.forEach((element, index) => {
            paramsList.push({
              customerId: utils.getUserInfo().customerId === undefined ? '' : utils.getUserInfo().customerId,
              pidCreateType: 1,
              thirdPlatform: element.thirdPlatform,
              goodsId: element.thirdGoodsId,
              materialUrl: element.materialUrl,
              couponUrl: element.couponUrl
            })
            if ((index + 1) === res.context.couponVoList.length) {
              this.getCustomerPromotionUrl(paramsList)
            }
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
  getCustomerPromotionUrl(params) {
    const that = this
    webapi.getCustomerPromotionUrl({promotionUrlRequestList: params}).then((res) => {
      if (res.code === 'K-000000') {
        let content = this.data.shareContent
        res.context.promotionUrlList.forEach((element, index) => {
          content = content + '\r\n' + this.data.couponNameList[index].name + '\r\n' + element.split(',')[0]
          if ((index + 1) === res.context.promotionUrlList.length) {
            that.setData({
              shareContent: content
            })
            wx.showModal({
              title: '活动文案',
              content,
              confirmText: '复制',
              confirmColor: '#FD4073',
              success(res) {
                that.setData({
                  hasClick: false
                })
                if (res.confirm) {
                  wx.setClipboardData({
                    data: content,
                    success() {
                      wx.showToast({
                        title: '复制成功',
                        icon: '../../assets/images/common/dialog-success.png',
                        duration: 2000
                      })
                    }
                  })
                }
              }
            })
          }
        })
        return null
      } else {
        that.setData({
          hasClick: false
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
  onLoad() {
    wx.showLoading({
      title: '正在加载…',
      mask: true
    })
    this.getCouponPage()
  },
  onReachBottom() {
    if (this.data.hasEmptyList === false) {
      this.setData({
        isLoading: true,
        pageNum: this.data.pageNum + 1
      })
      this.getCouponPage()
    }
  }
})
