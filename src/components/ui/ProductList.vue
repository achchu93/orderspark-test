<template>
	<div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
		<product-card
			v-for="product in products"
			:key="product.id"
			:product="product"
		/>
	</div>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
	props: {
		products: {
			type: Array,
			required: true
		}
	},
	components: {
		ProductCard
	}
}
</script>
