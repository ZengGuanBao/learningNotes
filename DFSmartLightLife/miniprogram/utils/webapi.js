const http = require('./http')

module.exports = {
  // 号码归属地查询
  // https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=18520506195
  getMobileLocal: (params) => http.get('https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=' + params)
}

