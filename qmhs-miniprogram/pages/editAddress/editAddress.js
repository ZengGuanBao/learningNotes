import create from '../../store/create'
import store from '../../store/store'
import utils from '../../utils/utils'
import webapi from '../../utils/webapi'

create(store, {
  data: {
    canSave: false,
    form: {
      id: '',
      name: '', // 收货人姓名
      phone: '', // 收货人手机号
      area: { // 收货人地址省市区
        value: [],
        code: []
      },
      areaDetail: ''
    },
    name: ''
  },
  onLoad(options) {
    this.setData({
      'form.id': options.id === 'undefined' ? null : options.id
    })
  },
  onReady() {
    if (this.data.form.id) {
      this.getAddressInfo()
    }
  },
  // 获取收获地址信息
  async getAddressInfo() {
    wx.showLoading({
      title: '正在加载…',
      mask: true
    })
    const params = {
      id: this.data.form.id
    }
    const result = await webapi.getAddressInfoById(params)
    wx.hideLoading()
    if (result.code === 'K-000000') {
      const info = result.context
      this.data.form.name = info.consigneeName
      this.data.form.phone = info.consigneeNumber
      this.data.form.areaDetail = info.deliveryAddress
      this.data.form.area.code = [info.provinceId, info.cityId, info.areaId]
      this.data.form.area.value = [info.provinceName, info.cityName, info.areaName]
      this.setData({
        form: this.data.form
      })
      this.watch()
    } else {
      wx.showToast({
        title: result.message,
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 保存或修改地址信息
  async saveOrModifyAddress() {
    wx.showLoading({
      title: '正在加载…',
      mask: true
    })
    const params = {
      id: this.data.form.id,
      consigneeName: this.data.form.name,
      consigneeNumber: this.data.form.phone,
      provinceId: this.data.form.area.code[0],
      cityId: this.data.form.area.code[1],
      areaId: this.data.form.area.code[2],
      provinceName: this.data.form.area.value[0],
      cityName: this.data.form.area.value[1],
      areaName: this.data.form.area.value[2],
      deliveryAddress: this.data.form.areaDetail,
    }
    let result
    if (this.data.form.id) {
      result = await webapi.modifyAddress(params)
    } else {
      result = await webapi.saveAddress(params)
    }

    wx.hideLoading()
    if (result.code === 'K-000000') {
      wx.showToast({
        title: '保存成功',
        icon: 'none',
        duration: 2000,
        mask: true,
        success() {
          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            })
          }, 1000)
        }
      })
    } else {
      wx.showToast({
        title: result.message,
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 保存地址前数据校验
  handleSave() {
    if (this.data.canSave) {
      if (!utils.checkPhone(this.data.form.phone)) {
        wx.showToast({
          title: '手机格式错误',
          icon: 'none',
          duration: 2000,
          mask: true,
        })
      } else {
        this.saveOrModifyAddress()
      }
    }
  },
  bindRegionChange(e) {
    this.setData({
      'form.area.value': e.detail.value,
      'form.area.code': e.detail.code
    })
    this.watch()
  },
  watchInput(e) {
    const name = e.currentTarget.dataset.name
    const temp = `form.${name}`
    this.setData({
      [temp]: e.detail.value
    })
    this.watch()
  },
  watch() {
    const form = this.data.form
    if (form.name && form.phone && form.area.code.length && form.areaDetail) {
      this.setData({
        canSave: true
      })
    } else {
      this.setData({
        canSave: false
      })
    }
  }
})
