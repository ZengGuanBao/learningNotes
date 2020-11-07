import create from '../../store/create'
import store from '../../store/store'
import webapi from '../../utils/webapi'

create(store, {
  data: {
    form: {
      id: '',
      name: '',
      bankNumber: '',
      bankName: ''
    },
    canSubmit: false
  },
  onLoad() {
    this.getBankUserInfo()
  },
  // 确定认证
  async handleSubmit() {
    if (this.data.canSubmit) {
      wx.showLoading({
        title: '正在加载…',
        mask: true
      })
      const params = {
        realName: this.data.form.name,
        cardNo: this.data.form.bankNumber,
        bankName: this.data.form.bankName,
      }

      if (this.data.form.id) {
        params.id = this.data.form.id
      }
      const result = await webapi.bankSaveOrUpdate(params)
      wx.hideLoading()
      if (result.code === 'K-000000') {
        wx.redirectTo({
          url: '../../pages/withdrawal/withdrawal',
        })
      } else {
        wx.showToast({
          title: result.message,
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  // 获取用户银行卡信息
  async getBankUserInfo() {
    wx.showLoading({
      title: '正在加载…',
      mask: true
    })
    const result = await webapi.findByCustomerId()
    wx.hideLoading()
    if (result.code === 'K-000000') {
      const bankInfo = result.context
      if (bankInfo) {
        this.data.form = {
          id: bankInfo.id,
          name: bankInfo.realName,
          bankNumber: bankInfo.cardNo,
          bankName: bankInfo.bankName,
        }
        this.setData({
          form: this.data.form,
        })
        this.watch()
      }
    } else {
      wx.showToast({
        title: result.message,
        icon: 'none',
        duration: 2000
      })
    }
  },
  async getBankInfoByNo() {
    this.data.form.bankName = ''
    this.setData({
      form: this.data.form
    })
    this.watch()
    if (this.data.form.bankNumber) {
      wx.showLoading({
        title: '正在加载…',
        mask: true
      })
      const params = {
        cardNo: this.data.form.bankNumber
      }
      const result = await webapi.checkCardNo(params)
      wx.hideLoading()
      if (result.code === 'K-000000') {
        if (result.context) {
          this.data.form.bankName = result.context
          this.setData({
            form: this.data.form
          })
          this.watch()
        }
      }
    }
  },
  watchName(e) {
    this.setData({
      'form.name': e.detail.value
    })
    this.watch()
  },
  watchBankNumber(e) {
    this.setData({
      'form.bankNumber': e.detail.value
    })
    this.watch()
  },
  watchBankName(e) {
    this.setData({
      'form.bankName': e.detail.value
    })
    this.watch()
  },
  watch() {
    if (this.data.form.name && this.data.form.bankNumber && this.data.form.bankName) {
      this.setData({
        canSubmit: true
      })
    } else {
      this.setData({
        canSubmit: false
      })
    }
  }
})
