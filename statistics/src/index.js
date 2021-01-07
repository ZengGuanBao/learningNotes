import pulicSetting from "@src/pulicParams/pulic"
import pageEvent from "./eventParams/pageParams"
import clickReport from "./eventParams/btnParams"
import http from "./http"

// 开发环境
if (process.env.RUN_ENV === 'dev_test') {
  console.log('****埋点处于开发环境****')
  // require('./static/js/vconsole.js')

}

// 测试环境
if (process.env.RUN_ENV === 'build_test') {
  console.log('****埋点处于测试环境****')
}

// 生产环境
if (process.env.RUN_ENV === 'build_prod') {
  console.log('****埋点处于生产环境****')
}

window.pageReport_HZ = () => {
  let pageInfo = pageEvent.getPageInfo()
  let pulicInfo = pulicSetting.getBrowserInfo()
  let params = Object.assign({}, pulicInfo, pageInfo, window._microspot)
  http("pageReport", params)
  sessionStorage.setItem("pageEventTitle", document.title) || ''; // 上一个访问页面 URL 地址
  sessionStorage.setItem("pageEventReffer", document.URL) || ''; // 上一个访问页面 URL 地址
}

window.clickReport_HZ = (ev, obj) => {
  let pageInfo = pageEvent.getPageInfo()
  let pulicInfo = pulicSetting.getBrowserInfo()
  let params = Object.assign({}, pulicInfo, pageInfo, window._microspot)
  clickReport(ev, obj, params)
}

