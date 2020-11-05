// env: testing
// export const BASE_URL = 'http://xatest.hd-tech.info/crland-easylife'
// export const BASE_URL = 'http://kelenn.natapp1.cc/crland-easylife'
export const BASE_URL = 'https://ririxianapi.rrxiot.com/daily-fresh'
// export const BASE_URL = 'https://easylifecrmapi.mallsmart.cn/crland-easylife'

export const WEB_ROOT = 'https://crmadmindev.mallsmart.cn'
// export const WEB_ROOT = 'https://easylifecrmadmin.mallsmart.cn'

let lastRequestTask;
/**
 * 网络请求
 */
export function request(params, isToken = true) {
	return new Promise((resolve, reject) => {
		const url = `${BASE_URL}${params.url}`
		const data = params.data || {}
		const header = params.header || {}
		const method = params.method || 'POST'
		const loadingTitle = params.loadingTitle || '加载数据...'
		if (isToken) {
			// data.AccessToken = uni.getStorageSync('token')
			header.AccessToken = uni.getStorageSync('token')
		}
		uni.showLoading({
			title: loadingTitle,
			mask: false
		});
		lastRequestTask = uni.request({
			url,
			data,
			header,
			method,
			success: res => {
				uni.hideLoading()
				console.log('[' + url + '] [' + method + '] :', res.data)
				if (res.statusCode === 200) {
					if (res.data.code === 0) {
						resolve(res.data)
					} else if (res.data.code === 4011 || res.data.code === 4012) { // 需要登录
						const pages = getCurrentPages()
						const page = pages[pages.length - 1].route
						if (page !== 'pages/login/index') {
							uni.navigateTo({
								url: '/pages/login/index'
							});
						}
						reject(res.data)
					} else {
						reject(res.data)
					}
				} else {
					reject(res.data)
				}
			},
			fail: (e) => {
				uni.hideLoading()
				console.error('[' + url + '] [' + method + '] :', e)
				reject(e)
			}
		})
	})
}

export function abortTask() {
	if (lastRequestTask) {
		lastRequestTask.abort()
	}
}
