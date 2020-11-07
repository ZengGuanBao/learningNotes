import create from '../../store/create'
import store from '../../store/store'
import webapi from '../../utils/webapi'
import utils from '../../utils/utils'

create(store, {
  data: {
    sendMaterialList: [],
    sendEditorVO: {},
    pageNum: 1,
    sendMustPushVOPage: [],
    tabIndex: '0',
    currentMaterialId: '',
    hasEmptyList: false,
    hasLoadingOver: false,
    isLoading: false
  },
  changeCurrentIndex(e) {
    const curindex = e.currentTarget.dataset.curindex
    const Id = e.currentTarget.dataset.id
    this.setData({
      tabIndex: curindex,
      pageNum: 1,
      hasEmptyList: false,
      hasLoadingOver: false,
      sendMustPushVOPage: [],
      currentMaterialId: Id
    })
    this.getMustpushPage()
  },
  previewImg(e) {
    const index = e.currentTarget.dataset.index
    const imgArr = []
    e.currentTarget.dataset.imgarr.slice(0, 3).forEach(element => {
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
  saveImage(e) {
    const imgArr = e.currentTarget.dataset.imgarr.slice(0, 3)
    // 获取相册授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() { // 这里是用户同意授权后的回调
              imgArr.forEach((element, index) => {
                if (element.url.indexOf('https') === -1) {
                  element.url = element.url.replace('http', 'https')
                  wx.getImageInfo({
                    src: element.url,
                    success: (res) => {
                      wx.saveImageToPhotosAlbum({
                        filePath: res.path,
                        success: () => {
                          if (index === 2) {
                            wx.showToast({
                              title: '保存成功',
                              icon: '../../assets/images/common/dialog-success.png',
                              duration: 2000
                            })
                          }
                        }
                      })
                    }
                  })
                } else {
                  wx.getImageInfo({
                    src: element.url,
                    success: (res) => {
                      wx.saveImageToPhotosAlbum({
                        filePath: res.path,
                        success: () => {
                          if (index === 2) {
                            wx.showToast({
                              title: '保存成功',
                              icon: '../../assets/images/common/dialog-success.png',
                              duration: 2000
                            })
                          }
                        }
                      })
                    }
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
          imgArr.forEach((element, index) => {
            if (element.url.indexOf('https') === -1) {
              element.url = element.url.replace('http', 'https')
              wx.getImageInfo({
                src: element.url,
                success: (res) => {
                  wx.saveImageToPhotosAlbum({
                    filePath: res.path,
                    success: () => {
                      if (index === 2) {
                        wx.showToast({
                          title: '保存成功',
                          icon: '../../assets/images/common/dialog-success.png',
                          duration: 2000
                        })
                      }
                    }
                  })
                }
              })
            } else {
              wx.getImageInfo({
                src: element.url,
                success: (res) => {
                  wx.saveImageToPhotosAlbum({
                    filePath: res.path,
                    success: () => {
                      if (index === 2) {
                        wx.showToast({
                          title: '保存成功',
                          icon: '../../assets/images/common/dialog-success.png',
                          duration: 2000
                        })
                      }
                    }
                  })
                }
              })
            }
          })
        }
      }
    })
  },
  /* S 请求数据接口 */
  getMustpushInfo() {
    const that = this
    webapi.getMustpushInfo().then((res) => {
      if (res.code === 'K-000000') {
        that.setData({
          sendEditorVO: res.context.sendEditorVO,
          sendMaterialList: res.context.sendMaterialList,
          currentMaterialId: res.context.sendMaterialList[0].id
        })
        const categoryObj = wx.createSelectorQuery().in(this)
        categoryObj.selectAll('.category-type').boundingClientRect()
        categoryObj.selectAll('.tab-line').boundingClientRect()
        categoryObj.exec(function (rect) {
          const categoryList = res.context.sendMaterialList
          categoryList.forEach((element, index) => {
            if (index === 0) {
              element.width = (rect[0][index].width / 2) - (rect[1][0].width / 2)
            } else {
              element.width = (rect[0][index].width / 2)
            }
          })
          that.setData({
            sendMaterialList: categoryList
          })
        })
        that.getMustpushPage()
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
  getTime(val) {
    const time = parseInt(val / 1000, 10)
    if (time >= 60 && time < 60 * 60) {
      return parseInt(val / (60 * 1000), 10) + '分钟前'
    } else if (time >= 60 * 60 && time < 24 * 60 * 60) {
      return parseInt(val / (60 * 60 * 1000), 10) + '小时前'
    } else if (time >= 24 * 60 * 60 && time < 30 * 24 * 60 * 60) {
      return parseInt(val / (24 * 60 * 60 * 1000), 10) + '天前'
    } else if (time >= 30 * 24 * 60 * 60 && time < 12 * 30 * 24 * 60 * 60) {
      return parseInt(val / (30 * 24 * 60 * 60 * 1000), 10) + '月前'
    } else if (time >= 12 * 30 * 24 * 60 * 60) {
      return parseInt(val / (12 * 30 * 24 * 60 * 60 * 1000), 10) + '年前'
    } else {
      return parseInt(val / 1000, 10) + '秒前'
    }
  },
  getMustpushPage() {
    const params = {
      materialId: this.data.currentMaterialId,
      pageNum: this.data.pageNum,
      pageSize: 5
    }
    webapi.getMustpushPage(params).then((res) => {
      if (res.code === 'K-000000') {
        if (res.context.sendMustPushVOPage.content.length === 0) {
          this.setData({
            hasEmptyList: true,
            hasLoadingOver: true,
            isLoading: false
          })
        } else {
          let sendMustPushData = this.data.sendMustPushVOPage
          res.context.sendMustPushVOPage.content.forEach(element => {
            element.timeInterval = this.getTime(element.timeInterval)
            element.shareCopyWriter = element.shareCopyWriter.replace('↵', '\n')
          })
          sendMustPushData = sendMustPushData.concat(res.context.sendMustPushVOPage.content)
          // sendMustPushData.forEach((element, index) => {
          //   sendMustPushData[index].timeInterval = this.getTime(element.timeInterval)
          //   sendMustPushData[index].shareCopyWriter = element.shareCopyWriter.replace('↵', '\n')
          // })
          this.setData({
            sendMustPushVOPage: sendMustPushData,
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
  getCustomerPromotionUrl(e) {
    let shareWriter = e.currentTarget.dataset.sharewriter
    if (shareWriter.indexOf('http') !== -1) {
      shareWriter = shareWriter.substring(0, shareWriter.lastIndexOf('http'))
    }
    const params = {
      promotionUrlRequestList: [{
        customerId: utils.getUserInfo().customerId === undefined ? '' : utils.getUserInfo().customerId,
        pidCreateType: 1,
        thirdPlatform: e.currentTarget.dataset.thirdplatform,
        goodsId: e.currentTarget.dataset.goodsid,
        materialUrl: e.currentTarget.dataset.materialurl,
        couponUrl: e.currentTarget.dataset.couponurl
      }]
    }
    webapi.getCustomerPromotionUrl(params).then((res) => {
      if (res.code === 'K-000000') {
        const content = shareWriter + res.context.promotionUrlList[0].split(',')[0]
        wx.showModal({
          title: '转链后文本',
          content,
          confirmText: '复制',
          confirmColor: '#FD4073',
          success(res) {
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
  /* E 请求数据接口 */
  onLoad() {
    wx.showLoading({
      title: '正在加载…',
      mask: true
    })
    this.getMustpushInfo()
  },
  onReachBottom() {
    if (this.data.hasEmptyList === false) {
      this.setData({
        isLoading: true,
        pageNum: this.data.pageNum + 1
      })
      this.getMustpushPage()
    }
  }
})
