<script setup lang="ts">
const containerRef = ref(null);
const slides = ref([
  {
    avatar: '/images/hero_img.jpg',
    grade: 5,
    name: 'Анастасия',
    description:
      'Это просто потрясающе! Великолепный артист! Проводили мероприятие, корпоратив 13.12.2025! Все гости в восторге! Мы так и не... Подробнее Это просто потрясающе! Великолепный артист! Проводили мероприятие, корпоратив 13.12.2025! Все гости в восторге!',
  },
  {
    avatar: '/images/hero_img.jpg',
    grade: 5,
    name: 'Юлия',
    description:
      'Роман молодец, мы спустя несколько дней, всё ещё обсуждаем его трюки))) Гости под впечатлением Роман, спасибо большое',
  },
  {
    avatar: '/images/hero_img.jpg',
    grade: 5,
    name: 'Анастасия',
    description:
      'Это просто потрясающе! Великолепный артист! Проводили мероприятие, корпоратив 13.12.2025! Все гости в восторге! Мы так и не... Подробнее Это просто потрясающе! Великолепный артист! Проводили мероприятие, корпоратив 13.12.2025! Все гости в восторге!',
  },
  {
    avatar: '/images/hero_img.jpg',
    grade: 5,
    name: 'Юлия',
    description:
      'Роман молодец, мы спустя несколько дней, всё ещё обсуждаем его трюки))) Гости под впечатлением Роман, спасибо большое',
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
  centeredSlides: false,
  spaceBetween: 64,
  slidesPerView: 1,
  autoHeight: true,

  breakpoints: {
    1024: {
      slidesPerView: 2,
    },
    1280: {
      slidesPerView: 4,
    },
  },
});
</script>

<template>
  <div class="container mx-auto mt-6 px-4 pb-100">
    <h4 class="text-stone mb-12 text-center text-4xl font-bold">Мои отзывы</h4>

    <div class="flex items-center justify-between gap-8">
      <button
        v-if="slides.length > 4"
        @click="swiper.prev()"
        class="size-12 shrink-0 content-center rounded-full bg-stone-950 transition-opacity hover:cursor-pointer"
        :class="swiper.isBeginning.value ? 'opacity-30' : 'opacity-100'"
      >
        <LucideChevronLeft
          class="mx-auto size-8 transition-colors"
          :class="swiper.isBeginning.value ? 'stroke-white' : 'stroke-primary'"
        />
      </button>

      <ClientOnly>
        <swiper-container ref="containerRef" :init="false" class="min-w-0">
          <swiper-slide v-for="(slide, idx) in slides" :key="idx">
            <div class="border-primary mx-auto max-w-2xs rounded-2xl border bg-black p-4">
              <div class="mb-4 flex gap-4">
                <img
                  :src="slide.avatar"
                  :alt="slide.name"
                  class="size-15 rounded-full object-cover"
                />

                <div class="flex flex-1 flex-col gap-2">
                  <h6>{{ slide.name }}</h6>

                  <div
                    class="[&_svg]:fill-primary [&_svg]:stroke-primary flex gap-2 [&_svg]:size-4 [&_svg]:stroke-1"
                  >
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

      <button
        v-if="slides.length > 4"
        @click="swiper.next()"
        class="size-12 shrink-0 content-center rounded-full bg-stone-950 transition-opacity hover:cursor-pointer"
        :class="swiper.isEnd.value ? 'opacity-30' : 'opacity-100'"
      >
        <LucideChevronRight
          class="mx-auto size-8 transition-colors"
          :class="swiper.isEnd.value ? 'stroke-white' : 'stroke-primary'"
        />
      </button>
    </div>
  </div>
</template>
