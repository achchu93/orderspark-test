import Vue from 'vue'

export const state = () => ({
	products: {},
	visible: false
})

export const getters = {
	itemList: (state) => {
		return Object.values(state.products)
	},
	itemsCount: (state) => {
		return Object.values(state.products).reduce( (total, product) => total + product.qty, 0 )
	},
	cartTotal: (state) => {
		return Object.values(state.products).reduce( (total, item) => total + ( parseFloat( item.product.price ) * item.qty ), 0 )
	},
	cartVisible: (state) => {
		return state.visible
	}
}

export const mutations = {
	init (state) {
		if(localStorage.getItem('storeCart')) {
			Vue.set(state, 'products', JSON.parse(localStorage.getItem('storeCart')))
		}
	},
	addProduct (state, product) {
		const key = product.id
		let qty = 1

		if (state.products[key]) {
			qty += state.products[key].qty
		}

		Vue.set(state.products, key, {
			product,
			qty: qty
		})
	},
	changeProductQty (state, { productKey, step }) {
		if (step < 0 && state.products[productKey].qty < 2) { // qty can't be less than 1
			return false
		}
		Vue.set(state.products[productKey], 'qty', state.products[productKey].qty + step)
	},
	removeProduct (state, { productKey }) {
		Vue.delete(state.products, productKey)
	},
	clear (state) {
		Vue.set(state, 'products', {})
	},
	toggleCart(state){
		Vue.set(state, 'visible', !state.visible)
	}
}

export const actions = {
}
