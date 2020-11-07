import create from '../../store/create'
import store from '../../store/store'
import webapi from '../../utils/webapi'

create(store, {
  data: {
    videoList: [],
    pageNum: 1,
    hasLoadingOver: false,
    isLoading: false,
    hasEmptyList: false,
    indexCurrent: null
  },
  playVideo(e) {
    const curIdx = e.currentTarget.dataset.index
    this.setData({
      indexCurrent: curIdx
    })
  },
  videoErrorCallback(e) {
    console.log(e)
  },
  /* S 请求数据接口 */
  getUniversityPage() {
    const params = {
      pageNum: this.data.pageNum,
      pageSize: 10
    }
    webapi.getUniversityPage(params).then((res) => {
      if (res.code === 'K-000000') {
        if (res.context.nationalUniversityVOPage.content.length === 0) {
          this.setData({
            hasEmptyList: true,
            hasLoadingOver: true,
            isLoading: false
          })
        } else {
          let videoData = this.data.videoList
          videoData = videoData.concat(res.context.nationalUniversityVOPage.content)
          this.setData({
            videoList: videoData,
            isLoading: false
          })
        }
        wx.hideLoading({
          title: '正在加载…'
        })
        return true
      } else {
        wx.hideLoading({
          title: '正在加载…'
        })
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
        throw new Error(res.message)
      }
    }).catch(function (err) {
      console.log(err)
    })
  },
  /* E 请求数据接口 */
  onLoad() {
    wx.showLoading({
      title: '正在加载…',
      mask: true
    })
    this.getUniversityPage()
  },
  onReachBottom() {
    if (this.data.hasEmptyList === false) {
      this.setData({
        isLoading: true,
        pageNum: this.data.pageNum + 1
      })
      this.getUniversityPage()
    }
  }
})
