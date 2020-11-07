// 引入图片服务地址
import {imgHost} from '../config/index'

const loadImgError = () => {
  wx.hideLoading()
  wx.showToast({
    title: '加载失败，请稍后重试',
    icon: 'none',
    duration: 2000
  })
}
/**
 * @param canvas canvas
 * @param callback 回调函数获取画的图片临时地址
 * @param userProfileImg 用户微信头像图片地址
 * @param userName 用户微信昵称
 * @param commodityName 商品标题
 * @param commodityImg 商品主图
 * @param hasCoupon 是否有优惠券配合coupon使用
 * @param coupon 优惠券金额
 * @param commodityPrice 商品价格
 * @param commodityLinePrice 商品划线价格
 * @param miniprogramCodeImg 小程序二维码图片地址
 */
const drawCommodityImage = async (canvas, callback, userProfileImg, userName, commodityName, commodityImg, hasCoupon, coupon, commodityPrice, commodityLinePrice, miniprogramCodeImg) => {
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, 750, 1280)
  ctx.rect(0, 0, 750, 1280)
  let imgObj = canvas.createImage()
  let imgPo
  imgObj.src = imgHost + '/drawShare/bottom.png'
  imgPo = await new Promise((resolve) => {
    imgObj.onload = () => {
      resolve(imgObj)
    }
    imgObj.onerror = () => {
      loadImgError()
    }
  })
  ctx.drawImage(imgPo, 0, 0, 750, 1280)
  ctx.beginPath()
  ctx.save()
  ctx.arc(90, 100, 50, 0, 2 * Math.PI)
  ctx.clip()
  ctx.closePath()
  imgObj = canvas.createImage()
  imgObj.src = userProfileImg
  imgPo = await new Promise((resolve) => {
    imgObj.onload = () => {
      resolve(imgObj)
    }
    imgObj.onerror = () => {
      loadImgError()
    }
  })
  ctx.drawImage(imgPo, 40, 50, 100, 100)
  ctx.restore()
  ctx.fillStyle = '#999'
  ctx.font = '24px normal'
  ctx.fillText(userName, 161, 89)
  ctx.fillStyle = '#333'
  ctx.font = '30px normal'
  ctx.fillText('发现一个好物推荐给您啦', 161, 134)
  imgObj = canvas.createImage()
  imgObj.src = commodityImg
  imgPo = await new Promise((resolve) => {
    imgObj.onload = () => {
      resolve(imgObj)
    }
    imgObj.onerror = () => {
      loadImgError()
    }
  })
  ctx.drawImage(imgPo, 40, 190, 670, 670)
  ctx.fillText(commodityName.slice(0, 15), 40, 930)
  ctx.restore()
  if (commodityName.length > 29) {
    ctx.fillText(commodityName.slice(15, 29) + '...', 40, 974)
  } else {
    ctx.fillText(commodityName.slice(15, 29), 40, 974)
  }
  if (hasCoupon === true) {
    ctx.fillStyle = '#fff'
    ctx.font = '24px normal'
    const couponWith = ctx.measureText(coupon + '元优惠券').width
    imgObj = canvas.createImage()
    imgObj.src = '../../assets/images/pageIcon/draw_coupon.png'
    imgPo = await new Promise((resolve) => {
      imgObj.onload = () => {
        resolve(imgObj)
      }
      imgObj.onerror = () => {
        loadImgError()
      }
    })
    ctx.drawImage(imgPo, 40, 997, couponWith + 28, 32)
    ctx.fillText(coupon + '元优惠券', 54, 1021)
  }
  ctx.fillStyle = '#fD4073'
  ctx.font = '24px normal'
  ctx.fillText('¥', 40, 1101)
  ctx.font = '48px normal'
  ctx.fillText(commodityPrice, 61, 1102)
  const commodityPriceWith = ctx.measureText('' + commodityPrice).width
  let commodityLinePriceWith = 0
  if (hasCoupon === true) {
    ctx.font = '24px normal'
    ctx.fillText('券后', 61 + commodityPriceWith, 1100)
    commodityLinePriceWith = ctx.measureText('券后').width
  }
  ctx.fillStyle = '#999'
  ctx.font = '30px normal'
  ctx.fillText('¥' + commodityLinePrice, 61 + commodityPriceWith + commodityLinePriceWith + 8, 1100)
  const commodityLinePriceLineWith = ctx.measureText('¥' + commodityLinePrice).width
  ctx.fillRect(61 + commodityPriceWith + commodityLinePriceWith + 8, 1088, commodityLinePriceLineWith, 1)
  ctx.font = '22px normal'
  imgObj = canvas.createImage()
  imgObj.src = miniprogramCodeImg
  imgPo = await new Promise((resolve) => {
    imgObj.onload = () => {
      resolve(imgObj)
    }
    imgObj.onerror = () => {
      loadImgError()
    }
  })
  ctx.drawImage(imgPo, 545, 899, 164, 164)
  ctx.fillText('长按识别购买', 560, 1101)
  callback()
}
/**
 * @param canvas canvas
 * @param callback 回调函数获取画的图片临时地址
 * @param imgNo 分享小程序底图的序号
 * @param userProfileImg 用户微信头像图片地址
 * @param userName 用户微信昵称
 * @param miniprogramCodeImg 小程序二维码图片地址
 */
const drawMiniprogramImage = async (canvas, callback, imgNo, userProfileImg, userName, miniprogramCodeImg) => {
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, 750, 1334)
  ctx.rect(0, 0, 750, 1334)
  let imgObj = canvas.createImage()
  let imgPo
  imgObj.src = imgHost + '/drawShare/imgNo' + imgNo + '.png'
  imgPo = await new Promise((resolve) => {
    imgObj.onload = () => {
      resolve(imgObj)
    }
    imgObj.onerror = () => {
      loadImgError()
    }
  })
  ctx.drawImage(imgPo, 0, 0, 750, 1334, 0, 0, 750, 1334)
  ctx.restore()
  ctx.beginPath()
  ctx.moveTo(199, 37)
  if (imgNo === 1) {
    ctx.fillStyle = '#DC0C27'// 矩形填充颜色
  } else if (imgNo === 2) {
    ctx.fillStyle = '#186ABD'
  } else if (imgNo === 3) {
    ctx.fillStyle = '#561B79'
  } else if (imgNo === 0) {
    ctx.fillStyle = '#EC5228'
  }
  ctx.lineTo(595, 37)
  ctx.arc(595, 72, 35, Math.PI * 1.5, Math.PI * 2)
  ctx.lineTo(594, 72)
  ctx.arc(595, 72, 35, 0, Math.PI * 0.5)
  ctx.lineTo(199, 107)
  ctx.arc(199, 72, 35, Math.PI * 0.5, Math.PI)
  ctx.lineTo(164, 72)
  ctx.arc(199, 72, 35, Math.PI, Math.PI * 1.5)
  ctx.fill()
  ctx.restore()
  ctx.beginPath()
  ctx.save()
  ctx.arc(163, 72, 42, 0, 2 * Math.PI)
  ctx.clip()
  imgObj = canvas.createImage()
  imgObj.src = userProfileImg
  imgPo = await new Promise((resolve) => {
    imgObj.onload = () => {
      resolve(imgObj)
    }
    imgObj.onerror = () => {
      loadImgError()
    }
  })
  ctx.drawImage(imgPo, 121, 30, 84, 84)
  ctx.closePath()
  ctx.restore()
  ctx.fillStyle = '#fff'
  ctx.font = '24px normal'
  if (userName && userName.length > 5) {
    ctx.fillText(userName.slice(0, 5) + '... 邀请你注册全民划算', 224, 80)
  } else {
    ctx.fillText(userName + '邀请你注册全民划算', 224, 80)
  }
  ctx.restore()
  ctx.beginPath()
  ctx.save()
  ctx.arc(375, 1143, 70, 0, 2 * Math.PI)
  ctx.clip()
  imgObj = canvas.createImage()
  imgObj.src = miniprogramCodeImg
  imgPo = await new Promise((resolve) => {
    imgObj.onload = () => {
      resolve(imgObj)
    }
    imgObj.onerror = () => {
      loadImgError()
    }
  })
  ctx.drawImage(imgPo, 305, 1073, 140, 140)
  ctx.restore()
  callback()
}
module.exports = {
  drawCommodityImage,
  drawMiniprogramImage
}
