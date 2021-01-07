import axios from "axios"

let theProtocol = ""
function getProtocol () {
  if ('https:' === document.location.protocol) {
    return "https"
  } else {
    return "http"
  }
}

let urlStr = ""
axios.defaults.timeout = 50000

// 开发环境
if (process.env.RUN_ENV === 'dev_test') {
  urlStr = `://10.10.60.155:6736/hzed-pub-microspot/microspot/`
}
// 测试环境
if (process.env.RUN_ENV === 'build_test') {
  urlStr = `://10.10.60.155:6736/hzed-pub-microspot/microspot/`
}

// 生产环境
if (process.env.RUN_ENV === 'build_prod') {
  urlStr = `://pub.hzed.com/hzed-pub-microspot/microspot/`

}

// axios.post("urlStr", params)
axios.defaults.headers.common['Content-type'] = 'application/json; charset=UTF-8'
// axios.defaults.headers.common['Content-type'] = 'charset=UTF-8;application/x-www-form-urlencoded;application/json;'
axios.defaults.headers.common['Accept'] = 'application/json, text/plain, */*'
// 超时时间
axios.defaults.timeout = 5000
axios.defaults.retry = 5
axios.defaults.retryDelay = 1000


axios.interceptors.response.use(response => {
  console.log("date", response)
  let code = response.data.code
  let config = response.config;
  config.__times = config.__times || 0;
  if (code !== "0000") {
    if (config.__times < 5) {
      config.__times += 1
      return setTimeout(() => {
        axios(response.config);
      }, 1000)
    }
  }
},
  function axiosRetryInterceptor (err) {
    let config = err.config;
    console.log("config-->", config)
    // If config does not exist or the retry option is not set, reject
    if (!config || !config.retry) return Promise.reject(err);

    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;

    // Check if we've maxed out the total number of retries
    if (config.__retryCount >= config.retry) {
      // Reject with the error
      return Promise.reject(err);
    }

    // Increase the retry count
    config.__retryCount += 1;
    config.timeout = config.timeout * config.__retryCount
    // Create new promise to handle exponential backoff
    let backoff = new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, config.retryDelay || 1);
    });
    // Return the promise in which recalls axios to retry the request
    return backoff.then(function () {
      return axios(config);
    });
  }
);

let http = (method, params) => {
  console.log("params", params)
  theProtocol = getProtocol()
  // let urlStr = `${theProtocol}://pub.hzed.com/hzed-pub-microspot/microspot/`
  let url = `${theProtocol}${urlStr}${method}`
  axios.post(url, params,
    {
      // 单独配置
      retry: 5,
      retryDelay: 1500,
      // timeout: 5000,
    }
  )
  // axios({
  //   url: url,
  //   method: 'post',
  //   data: params,
  // }).then(res => res.data)
}

export default http
