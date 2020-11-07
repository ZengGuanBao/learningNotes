module.exports = {
  hideHomeButton: () => {
    if (wx.canIUse('hideHomeButton')) {
      wx.hideHomeButton()
    }
  },
  hideShareMenu: () => {
    if (getApp().globalData.platform !== 'devtools') {
      wx.hideShareMenu()
    }
  },
  showShareMenu: () => {
    if (getApp().globalData.platform !== 'devtools') {
      wx.showShareMenu({
        withShareTicket: true,
      })
    }
  }
}
