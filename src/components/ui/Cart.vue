<template>
	<div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" v-if="cartVisibility">
		<div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
			<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
			
			<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

			<div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-max sm:w-full">
				<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto" style="max-height: 35rem;">
					<div class="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg" v-if="cartItems.length">
						<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gray-50">
								<tr>
									<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Product
									</th>
									<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Price
									</th>
									<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Quantity
									</th>
									<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Total
									</th>
									<th scope="col" class="relative px-6 py-3">
										<span class="sr-only">Edit</span>
									</th>
								</tr>
							</thead>
							<tbody class="bg-white divide-y divide-gray-200">
								<tr v-for="item in cartItems" :key="item.product.id">
									<td class="px-6 py-4 whitespace-nowrap">
										<div class="flex items-center max-w-xs whitespace-normal">
											<div class="flex-shrink-0 h-10 w-10">
												<img class="h-10 w-10" :src="item.product.image" alt="" />
											</div>
											<div class="ml-4">
												<div class="text-sm font-medium text-gray-900">
												{{ item.product.title }}
												</div>
												<div class="text-sm text-gray-500">
													{{ item.product.category }}
												</div>
											</div>
										</div>
									</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<div class="text-sm text-gray-900">{{ item.product.price | formatPrice }}</div>
									</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<div class="flex justify-between justify-items-center">
											<button 
												type="button" 
												class="relative bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
												@click="decreaseQty(item.product)"
											>
												<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
													<path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
												</svg>
											</button>
											<span class="p-2 inline-flex text-xs leading-5 font-semibold text-green-800">
												{{ item.qty }}
											</span>
											<button 
												type="button" 
												class="relative bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
												@click="increaseQty(item.product)"
											>
												<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
													<path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
												</svg>
											</button>
										</div>
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{{ ( item.product.price * item.qty ) | formatPrice  }}
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										<button 
											type="button" 
											class="relative rounded-md p-2 inline-flex items-center justify-center text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
											@click="removeProduct({productKey: item.product.id})"
										>
											<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
											</svg>
										</button>
									</td>
								</tr>
							</tbody>
							<tfoot>
								<tr>
									<td scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Total
									</td>
									<td></td>
									<td></td>
									<td scope="col" class="px-6 py-3 text-left text-sm font-bold text-bold uppercase tracking-wider">
										{{ cartTotal | formatPrice }}
									</td>
								</tr>
							</tfoot>
						</table>
					</div>
					<div v-else>
						<div class="mx-auto flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
							</svg>
						</div>
						<div class="mt-3 text-center">
							<h3 class="text-lg leading-6 font-medium text-gray-900">
								Empty Cart
							</h3>
						</div>
					</div>
				</div>
				<div class="bg-gray-50 px-4 py-3">
					<div v-if="cartItems.length" class="sm:px-2 sm:flex sm:flex-row sm:justify-end">
						<button 
							type="button" 
							class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
							@click="toggleCart"
						>
						Continue
						</button>
						<button 
							type="button" 
							class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
							@click="clearCart"	
						>
						Clear Cart
						</button>
						<button 
							type="button" 
							class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
							@click="toggleCart"
						>
						Complete Order
						</button>
					</div>
					<div v-else class="sm:px-6 sm:flex sm:flex-row-reverse">
						<button 
							type="button" 
							class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
							@click="toggleCart"
						>
						Continue Shopping
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
	computed: {
		...mapGetters({
			cartItems: 'cart/itemList',
			cartVisibility: 'cart/cartVisible',
			cartTotal: 'cart/cartTotal'
		})
	},
	methods: {
		...mapMutations({
			toggleCart: 'cart/toggleCart',
			changeQty: 'cart/changeProductQty',
			clearCart: 'cart/clear',
			removeProduct: 'cart/removeProduct'
		}),
		increaseQty(product) {
			this.changeQty({
				productKey: product.id,
				step: +1
			})
		},
		decreaseQty(product) {
			this.changeQty({
				productKey: product.id,
				step: -1
			})
		}
	}
}
</script>
