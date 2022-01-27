import { StoreApi } from "."

export default {
	async list (filter = {}) {
		const response = await StoreApi.get('products/', { params: filter })
		return response.data
	},
}
