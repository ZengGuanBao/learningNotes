// const env = 'dev'
// const env = 'test'
const env = 'prod'
let apiHost
let imgHost
let hFiveHost
if (env === 'dev') {
  // apiHost = 'http://10.10.60.227:8082'
  // apiHost = 'http://10.10.88.15:8082'
  // apiHost = 'http://10.10.100.211:8082' // 吕亮
  // apiHost = 'http://10.10.30.71:8082' // 誉豪
  apiHost = 'http://10.10.100.214:8082' // 常贤
  imgHost = 'https://img.szstrkj.com'
  hFiveHost = 'http://10.10.100.164:8888/#' // 自己本地ip+端口
} else if (env === 'test') {
  // apiHost = 'http://10.10.60.227:8082'
  apiHost = 'https://mbff.szstrkj.com'
  imgHost = 'https://img.szstrkj.com'
  hFiveHost = 'http://qmhs.qmqb.net/h5/#'
} else {
  apiHost = 'https://mbff8.qmhs.vip'
  imgHost = 'https://img.qmhs.vip'
  hFiveHost = 'https://wx8.qmhs.vip/h5/#'
}
module.exports = {
  env,
  apiHost,
  imgHost,
  hFiveHost
}
