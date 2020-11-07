import create from '../../store/create'

create({
  properties: {
    recommendClassifyList: {
      type: Array,
      value: []
    }
  },
  data: {
    animationData: {},
    classifyIndex: '0',
    currentThemeId: '',
    currentId: '',
    height: '',
    maskNone: true,
    intoindex: '',
    scrollLeft: ''
  },
  ready () {
    const that = this
    const obj = wx.createSelectorQuery().in(this)
    obj.selectAll('.classify-mask-block').boundingClientRect()
    obj.exec(function (rect) {
      that.setData({
        height: rect[0][0].height
      })
    })
  },
  methods: {
    changeClassifyIndex (e) {
      const curindex = e.currentTarget.dataset.curindex
      const themeId = e.currentTarget.dataset.themeid
      const id = e.currentTarget.dataset.id
      this.setData({
        classifyIndex: curindex,
        currentThemeId: themeId,
        currentId: id,
        intoindex: "text" + curindex
      })
      this.triggerEvent('getClassifyIndex', {
        classifyIndex: this.data.classifyIndex,
        currentThemeId: this.data.currentThemeId,
        currentId: this.data.currentId
      })
      this.easeOut()
    },
    easeIn () {
      this.animation = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease-in',
      })
      this.animation.translateY(this.data.height).step()
      this.setData({
        animationData: this.animation.export(),
        maskNone: false
      })
    },
    easeOut () {
      this.animation = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease-in',
      })
      this.animation.translateY(-(this.data.height)).step()
      this.setData({
        animationData: this.animation.export(),
        maskNone: true
      })
    }
  }
})
