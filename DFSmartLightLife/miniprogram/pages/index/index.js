
import webapi from '../../utils/webapi'
import auth from './../../utils/auth'
const app = getApp()
Page({
  data: {
    cardCur: 0,
    swiperList: [],
    iconList: [{
      icon: 'cardboardfill',
      color: 'red',
      badge: 0,
      name: '饿了么'
    }, {
      icon: 'recordfill',
      color: 'orange',
      badge: 0,
      name: '美团'
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '京东'
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 0,
      name: '通知'
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      badge: 0,
      name: '排行榜'
    }, {
      icon: 'clothesfill',
      color: 'blue',
      badge: 0,
      name: '皮肤'
    }],
    isShow: false,
    mobileInfo: {},
    rechList: [{
      rechDiscount: 0.93,
      rechPar: 50
    },{
      rechDiscount: 0.93,
      rechPar: 100
    },{
      rechDiscount: 0.93,
      rechPar: 200
    }],
    showModal: false,
    modalData: {
      mobile: '',
      rechPar: 0,
      rechDiscount: 0
    }
  },
  onLoad() {
    this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可
    this.initHomeBarner()
  },
  onShow() {
    // this.initWatch()
  },
  onHide() {
    // this.data.watchFunc.close()
  },
  bindKeyInput(e) {
    if (e.detail.value.length === 11) {
      webapi.getMobileLocal(e.detail.value).then(res => {
        let data = res.split('= ')[1].replace(/\s*/g,"")
        if (data !== '{}') {
          data = data.replaceAll("{", "{\"")
          data = data.replaceAll(":", "\":")
          data = data.replaceAll(",", ",\"")
          data = data.replaceAll("\'", "\"")
          this.setData({
            isShow: true,
            mobileInfo: JSON.parse(data)
          })
        } else {
          this.setData({
            isShow: false,
            mobileInfo: {}
          })
          wx.showToast({
            title: '您输入的号码有误，请重新输入',
            icon: 'none',
            duration: 2000
          })
        }
      }).catch(function (err) {
        console.log(err)
      })
    } else {
      this.setData({
        isShow: false,
        mobileInfo: {}
      })
    }
  },
  goRechMobile(e) {
    const rechPar = e.currentTarget.dataset.rechpar
    const rechDiscount = e.currentTarget.dataset.rechdiscount
    if (this.data.mobileInfo.telString) {
      this.setData({
        modalData: {
          mobile: this.data.mobileInfo.telString,
          rechPar: rechPar,
          rechDiscount: rechDiscount
        }
      })
      this.setModal()
    } else {
      wx.showToast({
        title: '请输入正确的号码',
        icon: 'none',
        duration: 2000
      })
    }
  },
  setModal() {
    this.setData({
      showModal: !this.data.showModal
    })
  },
  submit() {
    if (app.globalData.userLogin === true) {
      this.setModal()
    } else {
      wx.showToast({
        title: '请先前往授权登录',
        icon: 'none',
        duration: 1000
      })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/myPage/myPage'
        })
      }, 1000);
    }
  },
  initWatch() {
    const that = this
    const watchFunc = wx.cloud.database().collection('HomeBarner').limit(4).watch({
      onChange: function(snapshot) {
        console.log('docs\'s changed events', snapshot.docChanges)
        console.log('query result snapshot after the event', snapshot.docs)
        console.log('is init data', snapshot.type === 'init')
        that.initHomeBarner()
      },
      onError: function(err) {
        console.error('the watch closed because of error', err)
      }
    })
    this.setData({
      watchFunc: watchFunc
    })
  },
  initHomeBarner() {
    wx.cloud.callFunction({
      name: 'HomeSetting',
      data: {
        type: 'initHomeBarner'
      },success: res => {
        this.setData({
          swiperList: res.result.data
        })
      },fail: err => {
        console.log('err', err)
      }
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  }
})