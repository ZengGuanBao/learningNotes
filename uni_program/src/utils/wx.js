export function requestLogin() {
	return new Promise((resolve, reject) => {
		uni.login({
			provider: 'weixin',
			success: function(data) {
				resolve(data)
			},
			fail: function(err) {
				resolve(err)
			}
		})
	})
}
export function requestPay(data) {
	return new Promise((resolve, reject) => {
		uni.requestPayment({
			provider: 'wxpay',
			timeStamp: data.timeStamp,
			nonceStr: data.nonceStr,
			package: data.packageStr,
			signType: data.signType,
			paySign: data.paySign,
			success: function(res) {
				resolve(res)
			},
			fail: function(err) {
				let msg = '支付失败'
				if (err.errMsg === 'requestPayment:fail cancel') {
					msg = '取消支付'
				}
				console.log('pay fail', err)
				reject({
					msg
				})
			}
		});
	})
}
