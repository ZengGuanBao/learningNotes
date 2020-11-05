import {
	request
} from '@/utils/http'

export function login(data = {}) {
	return request({
		method: 'POST',
		url: '/appapi/login',
		data
	})
}
