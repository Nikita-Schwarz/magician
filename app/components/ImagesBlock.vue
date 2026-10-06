<script setup lang="ts">
const containerRef = ref(null);
const slides = ref([
	{
		image: '/images/hero_img.jpg',
		title: 'Левитация предметов',
		description:
			'Законы физики больше не работают на этой сцене. Полный отрыв от реальности и гравитации.',
	},
	{
		image: '/images/hero_img.jpg',
		title: 'Чтение мыслей',
		description:
			'Интерактивное шоу, в котором фокусник заглянет в мысли зрителей прямо из зала.',
	},
	{
		image: '/images/hero_img.jpg',
		title: 'Ловкость рук',
		description:
			'Фокусы на расстоянии вытянутой руки. Вы не поверите собственным глазам.',
	},
]);

const swiper = useSwiper(containerRef, {
	pagination: {
		el: '.custom-swiper-pagination',
		clickable: true,
	},
	slidesPerView: 1.4,
	spaceBetween: 16,
	centeredSlides: true,
	// loop: true,
});
</script>

<template>
	<div class="container mx-auto px-4 mt-6">
		<h4 class="text-2xl font-bold mb-4 text-white text-center">
			Магия в действии
		</h4>

		<ClientOnly>
			<swiper-container ref="containerRef" :init="false">
				<swiper-slide
					v-for="(slide, idx) in slides"
					:key="idx"
					class="custom-slide"
				>
					<SliderMagicianCard v-bind="slide" />
				</swiper-slide>
			</swiper-container>
		</ClientOnly>

		<div class="custom-swiper-pagination flex justify-center gap-2 mt-4"></div>

		<p class="mt-4">Готовы удивить ваших гостей?</p>
	</div>
</template>

<style scoped>
.custom-slide {
	transform: scale(0.9);
	opacity: 0.5;
	transition:
		transform 0.4s ease,
		opacity 0.4s ease;
}

.custom-slide.swiper-slide-active {
	transform: scale(1);
	opacity: 1;
}

.custom-swiper-pagination :deep(.swiper-pagination-bullet) {
	width: 10px;
	height: 10px;
	background-color: var(--color-white);
	opacity: 0.3;
	border-radius: 9999px;
	transition: all 0.3s ease;
	cursor: pointer;
	margin: 0 !important;
}

.custom-swiper-pagination :deep(.swiper-pagination-bullet-active) {
	background-color: var(--color-primary);
	opacity: 1;
	width: 24px;
}
</style>
