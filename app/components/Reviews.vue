<script setup lang="ts">
const containerRef = ref(null);
const slides = ref([
	{
		avatar: '/images/hero_img.jpg',
		grade: 5,
		name: 'Анастасия',
		description:
			'Это просто потрясающе! Великолепный артист! Проводили мероприятие, корпоратив 13.12.2025! Все гости в восторге! Мы так и не... Подробнее Это просто потрясающе! Великолепный артист! Проводили мероприятие, корпоратив 13.12.2025! Все гости в восторге! Мы так и не... Подробнее',
	},
	{
		avatar: '/images/hero_img.jpg',
		grade: 5,
		name: 'Юлия',
		description:
			'Роман молодец, мы спустя несколько дней, всё ещё обсуждаем его трюки))) Гости под впечатлением Роман, спасибо большое',
	},
]);

const swiper = useSwiper(containerRef, {
	centeredSlides: true,
	spaceBetween: 16,
	effect: 'coverflow',
	autoHeight: true,
	// loop: true,
});
</script>

<template>
	<div class="container mx-auto px-4 mt-6 pb-100">
		<h4 class="text-2xl font-bold mb-4 text-white text-center">Мои отзывы</h4>

		<div class="flex">
			<button @click="swiper.prev()">Prev</button>

			<ClientOnly>
				<swiper-container ref="containerRef" :init="false" class="w-70 mx-auto">
					<swiper-slide v-for="(slide, idx) in slides" :key="idx">
						<div
							class="rounded-2xl bg-black p-4 max-w-68 border-primary border"
						>
							<div class="flex gap-4 mb-4">
								<img
									:src="slide.avatar"
									:alt="slide.name"
									class="size-15 rounded-full object-cover"
								/>

								<div class="flex-1 flex flex-col justify-between">
									<h6>{{ slide.name }}</h6>

									<div class="flex gap-2">
										<LucideStar />
										<LucideStar />
										<LucideStar />
										<LucideStar />
										<LucideStar />
									</div>
								</div>
							</div>

							<p>
								{{ slide.description }}
							</p>
						</div>
					</swiper-slide>
				</swiper-container>
			</ClientOnly>

			<button @click="swiper.next()">Next</button>
		</div>
	</div>

	asdasd
</template>
