import webapi from './webapi'

module.exports = {
  getSession: (ctx) => {
    ctx.globalData.sessionKey = ''
    wx.login({
      async success(res) {
        const result = await webapi.getSessionKey({code: res.code})
        if (result.code === 'K-000000') {
          ctx.globalData.sessionKey = result.context
        }
      }
    })
  }
}
