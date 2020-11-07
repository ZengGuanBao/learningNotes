import create from '../../store/create'
import store from '../../store/store'
import {imgHost} from '../../config/index'

create(store, {
  data: {
    imgHost,
    indicatorDots: true,
    vertical: false,
    interval: 2000,
    duration: 500,
    currentIndex: 0,
    height: 2413
  },
  changeCurrent(e) {
    if (e.detail.current === 2) {
      this.setData({
        currentIndex: e.detail.current,
        height: 1830
      })
    } else {
      this.setData({
        currentIndex: e.detail.current,
        height: 2413
      })
    }
  },
  changeCurrentIndex(e) {
    const curindex = Number(e.currentTarget.dataset.curindex)
    if (curindex === 2) {
      this.setData({
        currentIndex: curindex,
        height: 1830
      })
    } else {
      this.setData({
        currentIndex: curindex,
        height: 2413
      })
    }
  },
  searchView() {
    wx.navigateTo({
      url: '../../pages/searchBar/searchBar'
    })
  }
})
