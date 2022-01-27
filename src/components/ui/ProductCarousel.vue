<template>
	<swiper :auto-update="true" class="swiper mt-6" :options="swiperOptions" ref="productCarousel">
		<swiper-slide v-for="product in products" :key="product.id" class="h-full">
			<product-card :product="product" class="h-full"/>
		</swiper-slide>
	</swiper>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import ProductCard from './ProductCard.vue'

import 'swiper/swiper-bundle.css'

export default {
	props: {
		products: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			swiperOptions: {
				slidesPerView: 2,
				spaceBetween: 16,
				autoHeight: true,
				wrapperClass: 'swiper-wrapper items-stretch',
				breakpoints: {
					768: {
						slidesPerView: 4,
						spaceBetween: 32
					}
				}
			}
		}
	},
	components: {
		Swiper,
		SwiperSlide,
		ProductCard
	},
	directives: {
		swiper: directive
	},
	computed: {
		swiper() {
			return this.$refs.productCarousel.$swiper
		}
	},
	updated() {
		if( this.products.length > 1 ) {
			this.swiper.$wrapperEl.removeAttr('style') // trick to recreate wrapper height
		}
	}
}
</script>

<style>
	.swiper-wrapper.items-stretch {
		align-items: stretch !important;
	}
</style>
