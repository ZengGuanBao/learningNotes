module.exports = {
  // 检验手机号
  checkPhone: (phone) => /^1[3456789]\d{9}$/.test(phone),
  // 校验身份证
  checkIdCard: (idCard) => /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard),
  // 判断是否登录
  checkIsLogin: () => !!(wx.getStorageSync('userInfo').token),
  // 保存微信信息
  setWxUserInfo: (wxUserInfo) => {
    wx.setStorageSync('wxUserInfo', wxUserInfo)
  },
  // 保存用户信息
  setUserInfo: (userInfo) => {
    wx.setStorageSync('userInfo', userInfo)
  },
  // 获取微信信息
  getWxUserInfo: () => wx.getStorageSync('wxUserInfo'),
  // 获取用户信息
  getUserInfo: () => wx.getStorageSync('userInfo'),
  // 清除所有用户信息
  clearAllUserInfo: () => {
    wx.clearStorageSync()
  },
  // 版本比较
  compareVersion: (v1, v2) => {
    v1 = v1.split('.')
    v2 = v2.split('.')
    const len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }

    for (let i = 0; i < len; i++) {
      const num1 = parseInt(v1[i], 10)
      const num2 = parseInt(v2[i], 10)

      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }
    return 0
  },
  // 登录成功后
  loginSuccess(wxUserInfo, userInfo) {
    this.setWxUserInfo(wxUserInfo)
    this.setUserInfo(userInfo)
    wx.showToast({
      title: '登录成功',
      image: '../../assets/images/common/dialog-success.png',
      duration: 2000,
      complete() {
        const loginRedirect = getApp().globalData.loginRedirect
        if (loginRedirect === 'personal') {
          wx.switchTab({
            url: '/pages/personal/personal'
          })
        } else if (loginRedirect === 'member') {
          wx.switchTab({
            url: '/pages/member/member'
          })
        } else if (loginRedirect === 'goodsDetail') {
          const pages = getCurrentPages()
          const routeName = 'pages/commodityDetail/commodityDetail'
          if (pages[pages.length - 4] && pages[pages.length - 4].route === routeName) {
            wx.navigateBack({
              delta: 3
            })
          } else if (pages[pages.length - 3] && pages[pages.length - 3].route === routeName) {
            wx.navigateBack({
              delta: 2
            })
          } else if (pages[pages.length - 2] && pages[pages.length - 2].route === routeName) {
            wx.navigateBack({
              delta: 1
            })
          }
        }
      }
    })
    // 是否获取过首页分享小程序码
    if (this.getMiniprogramCode() === '') {
      getApp().getInviteWxaCode()
    }
  },
  // 防抖
  debounce: (func, wait) => {
    let timer
    return () => {
      clearTimeout(timer)
      timer = setTimeout(func, wait)
    }
  },
  getWxVersion: () => wx.getSystemInfoSync().SDKVersion,
  // 保存首页分享小程序码
  setMiniprogramCode: (miniprogramCode) => wx.setStorageSync('miniprogramCode', miniprogramCode),
  getMiniprogramCode: () => wx.getStorageSync('miniprogramCode'),
}
