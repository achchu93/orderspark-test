<template>
	<div class="group relative flex flex-col justify-between">
		<div class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 hover:shadow-xl lg:h-80 lg:aspect-none">
			<img 
				:src="product.image" 
				:alt="product.title" 
				class="w-full h-full object-center object-cover lg:w-full lg:h-full"
			/>
		</div>
		<div class="mt-4 flex justify-between">
			<div>
				<h3 class="text-sm text-gray-700">
					{{product.title}}
				</h3>
				<p class="mt-1 text-sm text-gray-500">{{product.category}}</p>
			</div>
			<p class="text-sm font-medium text-indigo-600 ml-2">{{product.price | formatPrice}}</p>
		</div>
		<button 
			class="block w-full bg-white hover:bg-indigo-600 hover:text-white text-indigo-600 border-2 hover:border-indigo-600 px-3 py-2 rounded uppercase font-medium mt-4"
			@click="addToCart(product)"
		>
			Add to cart
		</button>
	</div>
</template>

<script>
export default {
	props: {
		product: {
			type: Object,
			required: true
		}
	},
	methods: {
		addToCart(product){
			this.$store.commit('cart/addProduct', product)
		}
	}
}
</script>

