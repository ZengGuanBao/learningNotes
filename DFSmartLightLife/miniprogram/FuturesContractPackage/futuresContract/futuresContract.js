import utils from '../../utils/utils'
Page({
  data: {
    picker: ['螺纹钢2010', '豆粕2010', '粮油2010'],
    curCount: 1,
    curPrice: 0,
    recordData: [{
      time: '13:00:00',
      date: '2021-5-28',
      contractType: '螺纹钢2010',
      count: '10',
      price: '16999',
      mode: '加多'
    }]
  },
  bindKeyInput(e) {
    this.setData({
      curPrice: e.detail.value
    })
  },
  pickerChange(e) {
    this.setData({
      curIndex: e.detail.value,
    })
  },
  updateCount(e) {
    const mode = e.currentTarget.dataset.mode
    let count = mode === 'add' ? this.data.curCount+1 : this.data.curCount-1
    if (count < 1) {
      count = 1
    }
    this.setData({
      curCount: count,
    })
  },
  operaMode(e) {
    const mode = e.currentTarget.dataset.mode
    console.log(utils)
    this.setData({
      recordData: [{
        time: utils.formatTime(new Date()),
        date: utils.formatDate(new Date()),
        contractType: this.data.picker[this.data.curIndex],
        count: this.data.curCount,
        price: this.data.curPrice,
        mode: mode
      },...this.data.recordData]
    })
  },
  onShareAppMessage(e) {
    return {
      title: '期货操作记录',
      path: 'pages/futuresContract/futuresContract'
    }
  }
})