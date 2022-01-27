import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'

import './assets/app.css'

Vue.config.productionTip = false

Vue.filter('formatPrice', function (value) {
	if (!value) return ''
	value = parseFloat(value)
	return `$${value.toFixed(2)}`
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
