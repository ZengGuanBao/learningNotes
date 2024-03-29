import axios from 'axios'
import Utils from './Utils'
import router from '../../router'

// 是否正在刷新的标记
let isRefreshing = false
//重试队列
let requests = []

// 设置请求头token
const ajaxToken = function () {
  const userLoginInfo = Utils.getCookie('userLoginInfo')
  if (userLoginInfo) {
    axios.defaults.headers.common['sessionId'] = JSON.parse(userLoginInfo).sessionId // 登录成功后服务端生成并返回给客户端
    axios.defaults.headers.common['version'] = '1.1' // 接口版本号: 为了兼容不同版本的升级
    // axios.defaults.headers.common['imei'] = store.state.native.imei// 设备id
    // axios.defaults.headers.common['client'] = '3' // 客户端来源:1-安卓；2-苹果；3-H5
  }
}

// 超时时间
axios.defaults.timeout = 50000
// http请求拦截器
axios.interceptors.request.use(config => {
  ajaxToken()
  return config
}, error => {
  return Promise.reject(error)
})

// http响应拦截器
axios.interceptors.response.use(data => { // 响应成功关闭loading
  let code = Number(data.data.code)
  switch (code) {
    //约定code 409 token 过期
    case 409:
      if (!isRefreshing) {
        isRefreshing = true
        //调用刷新token的接口
        return refreshToken({ refreshToken: localStorage.getItem('refreshToken'), token: getToken() }).then(res => {
          const { token } = res.data
          // 替换token
          setToken(token)
          response.headers.Authorization = `${token}`
           // token 刷新后将数组的方法重新执行
          requests.forEach((cb) => cb(token))
          requests = [] // 重新请求完清空
          return service(response.config)
        }).catch(err => {
        //跳到登录页
          removeToken()
          router.push('/login')
          return Promise.reject(err)
        }).finally(() => {
          isRefreshing = false
        })
      } else {
        // 返回未执行 resolve 的 Promise
        return new Promise(resolve => {
          // 用函数形式将 resolve 存入，等待刷新后再执行
          requests.push(token => {
            response.headers.Authorization = `${token}`
            resolve(service(response.config))
          })
        })
      }
      return data
    case 40000006:
      // store.commit('SHOWTOAST', '登录超时，请重新登录！')
      setTimeout(() => {
        const param = { url: window.location.href }
        store.commit('goLogin', JSON.stringify(param))
      }, 2000)
      return data
    default:
      return data
  }
}, error => {
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    // 请求超时处理
    // store.commit('UPDATE_LOADING', false)
    // store.commit('SHOWTOAST', '请求超时，请稍后再试')
    router.push('/abnormal')
  } else if (error.response.status < 510 && error.response.status >= 500) {
    // store.commit('UPDATE_LOADING', false)
    // store.commit('SHOWTOAST', '服务器异常，请稍后再试')
    router.push('/abnormal')
  } else if (error.response.status === 404) {
    // store.commit('UPDATE_LOADING', false)
    // store.commit('SHOWTOAST', '没有找到对应的文件或目录')
    router.push('/apiNoFind')
  } else {
    return Promise.reject(error)
  }
})

let baseUrl = ''
export default {
  get: function (url, params) {
    ajaxToken()
    return axios.get(baseUrl + url, { params: params }).then(res => res.data)
  },
  post: function (url, params) {
    ajaxToken()
    return axios.post(baseUrl + url, params).then(res => res.data)
  },
  postForm: function (url, params) {
    ajaxToken()
    return axios({
      url: baseUrl + url,
      method: 'post',
      data: params,
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => res.data)
  },
  put: function (url, params) {
    ajaxToken()
    return axios.put(baseUrl + url, params).then(res => res.data)
  },
  putForm: function (url, params) {
    ajaxToken()
    return axios({
      url: baseUrl + url,
      method: 'put',
      data: params,
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => res.data)
  },
  delete: function (url, params) {
    ajaxToken()
    return axios.delete(baseUrl + url, params).then(res => res.data)
  },
  deleteForm: function (url, params) {
    ajaxToken()
    return axios({
      url: url,
      method: 'delete',
      data: params,
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => res.data)
  }
}
