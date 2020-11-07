import create from '../../store/create'
import store from '../../store/store'

create(store, {
  data: {
    list: [false, false, false, false, false, false, false, false]
  },
  handleOpen(e) {
    const index = e.currentTarget.dataset.index
    const temp = 'list[' + index + ']'
    this.setData({
      [temp]: !this.data.list[index]
    })
  },
  phoneCall() {
    wx.makePhoneCall({
      phoneNumber: '400-6783-909'
    })
  }
})
