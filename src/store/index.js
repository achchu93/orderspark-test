import Vue from 'vue'
import Vuex from 'vuex'

import * as cart from './cart'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		cart: {
			namespaced: true,
			...cart
		}
	}
})

store.subscribe((mutation, state) => {
	// subscribe to update cart items on each mutation
	localStorage.setItem('storeCart', JSON.stringify(state.cart.products))
})

export default store
