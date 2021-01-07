import http from "./http"

let uploader = function (url, params) {
  window.addEventListener('unload', logData(url, params), false);
  function logData (url, params) {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, JSON.stringify(params));
    } else {
      http(url, params)
    }
  }
}

export default uploader