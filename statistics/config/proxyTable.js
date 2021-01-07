const proxyTargets = [
  {
    targetName: "hzed-pub-microspot",
    target: "http://10.10.60.155:6736/",
  }
]

const proxies = {}
const BASE_URL = process.env.BASE_URL || ""

proxyTargets.forEach((proxyTarget) => {
  proxies[`/${proxyTarget.targetName}${BASE_URL}`] = {
    target: proxyTarget.target,
    pathRewrite: { [`/${proxyTarget.targetName}${BASE_URL}`]: proxyTarget.baseURL || BASE_URL || "" },
    changeOrigin: true,
    toProxy: false,
    prependPath: false,
  }
})

module.exports = proxies