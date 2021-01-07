let gettime = function (params) {
  let t = new Date()
  let Y = t.getFullYear()
  let M = polyfill(t.getMonth() + 1)
  let D = polyfill(t.getDate())
  let h = polyfill(t.getHours())
  let m = polyfill(t.getMinutes())
  let s = polyfill(t.getSeconds())

  switch (params) {
    // 流水号
    case "serialNum":
      return `${Y}${M}${D}${h}${m}${s}${parseInt((Math.random() * 10000))}`
    case "getTheTime":
      return `${Y}${M}${D}${h}${m}${s}`
  }
}

function polyfill (params) {
  if (+params < 10) {
    return `0${params}`
  } else {
    return params
  }
}

let formatTime = {
  getTheTime: () => {
    return gettime("getTheTime")
  },
  serialNum: () => {
    return gettime("serialNum")
  },
}

export default formatTime