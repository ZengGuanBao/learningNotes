import {
	request
} from '@/utils/http'

export function order(data = {}) {
	return request({
		method: 'POST',
		url: '/appapi/member/order',
		data
	})
}
