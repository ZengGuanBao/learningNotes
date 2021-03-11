Page({
  data: {
    Adminstator: false
  },
  onLoad: function (e) {
    let name = e.id
    // 修改导航栏标题
    wx.setNavigationBarTitle({
      title: `欢迎，${name ? name : ''} 管理员`
    })
    this.IsAdminstator()
  },
  // 检查是否为管理员
  IsAdminstator () {
    wx.showLoading({
      title: '正在检验...',
      mask: true
    })
    let that = this
    wx.cloud.callFunction({
      name: 'InitInfo',
      data: {
        type: 'ADMIN'
      },success: res => {
        wx.hideLoading()
        if (res.result.total > 0) {
          that.setData({
            Adminstator: true
          })
        } else {
          // 提示权限不足，非管理员身份
          wx.showToast({
            title: '权限不足',
            icon: 'none',
            mask: true
          })
          // 跳转回个人中心
          wx.switchTab({
            url: '../../pages/mypage/mypage',
          })
        }
      },fail: err => {
        console.log('err', err)
      }
    })
  },
  // 跳转函数
  Navigate: function (e) {
    console.log(e)
    let url = e.currentTarget.dataset.url
    if (url == '../') {
      wx.showToast({
        title: '未开放',
        icon: 'none'
      })
      return
    } else {
      wx.navigateTo({
        url: `${url}`,
      })
    }
  }
})