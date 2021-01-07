import formatTime from "@src/utils/formatTime"
import http from "@src/http"

let commonParmas = {
  user_id: "",
  time: formatTime.getTheTime()
}

function toArr (obj) {
  let arr = []
  for (let i in obj) {
    arr.push(
      {
        attribute_key: i,
        attribute_value: obj[i]
      }
    )
  }
  return arr
}

let clickReport = (clickEvent, data, pulicSetting) => {
  let params = {
    event: clickEvent,
    attribute_list: toArr(Object.assign({}, commonParmas, data)),
    type: "click"
  }
  let obj = Object.assign({}, pulicSetting, params)
  http("clickReport", obj)
}


export default clickReport

