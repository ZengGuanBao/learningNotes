import {
	request
} from '@/utils/http'

export function opinion(data = {}) {
	return request({
		method: 'POST',
		url: '/appapi/feedback/opinion',
		data
	})
}
