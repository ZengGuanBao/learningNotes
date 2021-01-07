//公共参数存放
import BrowserInfo from "@src/utils/getBrowserType.js"
import formatTime from "@src/utils/formatTime"

let obj = {}

obj.getBrowserInfo = () => {
  let info = {
    token: "",//请求鉴权标识，需先申请鉴权标识放可以调用接口
    channel_code: "",//渠道编码，fqy-分期易，lj-立借，qmqb-全民钱包
    client_type: "H5",//客户端类别，IOS-IOS，H5-H5,Android-Android
    os: navigator.userAgent,// 操作系统，H5,则记录浏览器版本
    operators: 'other',//other-其他
    version: "1.0",//接口版本号
    request_no: formatTime.serialNum(),//请求流水号，唯一,可用uuid
    session_id: "",//session标识，H5填写 
    type: "" //埋点类型，click-按钮点击事件，page-页面事件
  }
  return info
}

export default obj