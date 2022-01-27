<template>
  <div id="app">
	<Header />
	<Hero />
	<div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
		<h2 class="text-2xl font-extrabold tracking-tight text-gray-900 capitalize">Featured</h2>
		<ProductCarousel :products="featured" />
	</div>
	<div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
		<h2 class="text-2xl font-extrabold tracking-tight text-gray-900 capitalize">New Arrivals</h2>
		<ProductList :products="products" />
	</div>
	<Cart />
  </div>
</template>

<script>
import Products from './api/products'

import Header from './components/layouts/Header.vue'
import Hero from './components/ui/Hero.vue'
import ProductList from './components/ui/ProductList.vue'
import ProductCarousel from './components/ui/ProductCarousel.vue'
import Cart from './components/ui/Cart.vue'

export default {
	name: 'App',
	components: {
		Header,
		Hero,
		ProductList,
		ProductCarousel,
		Cart
	},
	data() {
		return {
			products: [],
			featured: []
		}
	},
	methods: {
		async loadProducts() {
			this.products = await Products.list({limit: 8})
			this.featured = await Products.list({sort: 'desc'})
		}
	},
	async mounted(){
		this.loadProducts()
	}
}
</script>
