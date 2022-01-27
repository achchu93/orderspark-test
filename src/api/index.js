import axios from 'axios'

export const StoreApi = axios.create({
	baseURL: 'https://fakestoreapi.com'
})
