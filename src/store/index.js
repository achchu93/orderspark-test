import Vue from 'vue'
import Vuex from 'vuex'

import * as cart from './cart'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		cart: {
			namespaced: true,
			...cart
		}
	}
})
