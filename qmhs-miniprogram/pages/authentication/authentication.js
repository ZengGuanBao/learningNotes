import create from '../../store/create'
import store from '../../store/store'
import utils from '../../utils/utils'
import webapi from '../../utils/webapi'

create(store, {
  data: {
    form: {
      name: '',
      idCard: ''
    },
    canAuthentication: false
  },
  // 确定认证
  async handleAuthentication() {
    if (this.data.canAuthentication) {
      if (utils.checkIdCard(this.data.form.idCard)) {
        wx.showLoading({
          title: '正在加载…',
          mask: true
        })
        const params = {
          realName: this.data.form.name,
          idCard: this.data.form.idCard
        }
        const result = await webapi.authentication(params)
        wx.hideLoading()
        if (result.code === 'K-000000') {
          wx.showToast({
            title: '认证成功',
            image: '../../assets/images/common/dialog-success.png',
            mask: true,
            duration: 2000,
            complete() {
              wx.redirectTo({
                url: '../../pages/withdrawal/withdrawal',
              })
            }
          })
        } else {
          wx.showToast({
            title: result.message,
            icon: 'none',
            duration: 2000
          })
        }
      } else {
        wx.showToast({
          title: '身份证格式错误',
          mask: false,
          icon: 'none',
          duration: 2000,
        })
      }
    }
  },
  watchName(e) {
    this.setData({
      'form.name': e.detail.value
    })
    this.watch()
  },
  watchIdCard(e) {
    this.setData({
      'form.idCard': e.detail.value
    })
    this.watch()
  },
  watch() {
    if (this.data.form.name && this.data.form.idCard) {
      this.setData({
        canAuthentication: true
      })
    } else {
      this.setData({
        canAuthentication: false
      })
    }
  }
})
