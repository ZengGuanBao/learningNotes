import utils from './utils'

const {apiHost} = require('../config/index')

const wxPromisify = (fn) => (obj = {}) => new Promise((resolve, reject) => {
  obj.success = (res) => {
    resolve(res.data)
  }
  obj.fail = (res) => {
    // 失败
    reject(res)
  }
  fn(obj)
})
// 无论promise对象最后状态如何都会执行
// eslint-disable-next-line no-extend-native
Promise.prototype.finally = (callback) => {
  const constructor = this.constructor
  return this.then(
    // eslint-disable-next-line promise/no-nesting,promise/no-callback-in-promise
    (value) => constructor.resolve(callback()).then(() => value),
    // eslint-disable-next-line promise/no-nesting,promise/no-callback-in-promise
    (reason) => constructor.resolve(callback()).then(() => { throw reason }),
  )
}
/**
* 微信请求get方法
* url
* data 以对象的格式传入
*/
const getRequest = (url, data) => {
  const getRequest = wxPromisify(wx.request)
  return getRequest({
    url: apiHost + url,
    method: 'GET',
    data,
    header: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + utils.getUserInfo().token
    },
  })
}

/**
* 微信请求post方法封装
* url
* data 以对象的格式传入
*/
const postRequest = (url, data) => {
  const postRequest = wxPromisify(wx.request)
  return postRequest({
    url: apiHost + url,
    method: 'POST',
    data,
    header: {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + utils.getUserInfo().token
    },
  })
}

/**
 * 微信请求put方法封装
 * url
 * data 以对象的格式传入
 */
const putRequest = (url, data) => {
  const postRequest = wxPromisify(wx.request)
  return postRequest({
    url: apiHost + url,
    method: 'PUT',
    data,
    header: {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + utils.getUserInfo().token
    },
  })
}

/**
 * 微信请求put方法封装
 * url
 * data 以对象的格式传入
 */
const deleteRequest = (url) => {
  const postRequest = wxPromisify(wx.request)
  return postRequest({
    url: apiHost + url,
    method: 'DELETE',
    header: {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + utils.getUserInfo().token
    },
  })
}

module.exports = {
  post: postRequest,
  get: getRequest,
  put: putRequest,
  delete: deleteRequest
}
