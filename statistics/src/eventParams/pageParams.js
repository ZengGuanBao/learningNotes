let params = {};
// window
// if (window && window.screen) {
//   params.sh = window.screen.height || 0; // 屏幕高度
//   params.sw = window.screen.width || 0; // 屏幕宽度
//   params.cd = window.screen.colorDepth || 0; // 屏幕颜色深度
// }
// navigator
// if (navigator) {
//   params.lang = navigator.language || ''; // 语言
// }

// 页面统计
params.getPageInfo = () => {
  let pageInfo = {}
  if (document) {
    pageInfo.IP = document.domain || ''; // 域名
    pageInfo.current_page = sessionStorage.getItem("pageEventCurrentTitle") || document.title || 'undefind'; // 当前页面标题
    pageInfo.current_url = sessionStorage.getItem("pageEventCurrentUrl") || document.URL || ''; // 当前 URL 地址
    pageInfo.reffer_url = sessionStorage.getItem("pageEventReffer") || ''; // 上一个访问页面 URL 地址
    pageInfo.reffer_page = sessionStorage.getItem("pageEventTitle") || ''; // 上一个访问页面 URL 地址
    pageInfo.page_type = "open"
  }
  return pageInfo
}


export default params