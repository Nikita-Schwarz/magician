<script setup lang="ts">
const { pb, getFileUrl } = usePocketBase();
const containerRef = ref(null);

const { data: slides } = await useAsyncData('reviews', async () => {
  try {
    const records = await pb.collection('reviews').getFullList({ sort: 'order,-created' });
    return records.map((item) => ({
      id: item.id,
      avatar: item.avatar ? getFileUrl(item, item.avatar, '150x150') : '/images/hero_img.jpg',
      grade: item.grade || 5,
      name: item.name,
      description: item.description,
    }));
  } catch {
    return [];
  }
});

/*
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
]); */

const isBeginning = ref(true);
const isEnd = ref(false);

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

  on: {
    init(s) {
      isBeginning.value = s.isBeginning;
      isEnd.value = s.isEnd;
    },
    slideChange(s) {
      isBeginning.value = s.isBeginning;
      isEnd.value = s.isEnd;
    },
    // Срабатывает при изменении размера окна (breakpoints)
    breakpoint(s) {
      isBeginning.value = s.isBeginning;
      isEnd.value = s.isEnd;
    },
  },
});
</script>

<template>
  <section v-if="slides?.length" class="container mx-auto mt-6 px-4">
    <h4 class="text-stone mb-12 text-center text-4xl font-bold">Мои отзывы</h4>

    <div class="flex items-center justify-between gap-2 md:gap-8">
      <button
        v-if="slides.length > 4"
        :disabled="isBeginning"
        @click="swiper.prev()"
        class="size-8 shrink-0 content-center rounded-full bg-stone-950 transition-opacity hover:cursor-pointer disabled:cursor-default disabled:opacity-30 md:size-12"
      >
        <LucideChevronLeft
          class="mx-auto size-8 transition-colors"
          :class="isBeginning ? 'stroke-white' : 'stroke-primary'"
        />
      </button>

      <ClientOnly>
        <swiper-container ref="containerRef" :init="false" class="min-w-0">
          <swiper-slide v-for="slide in slides" :key="slide.id">
            <div class="border-border mx-auto max-w-2xs rounded-2xl border-2 bg-black p-4">
              <div class="mb-4 flex gap-4">
                <img
                  :src="slide.avatar"
                  :alt="slide.name"
                  class="size-15 rounded-full object-cover"
                />

                <div class="flex flex-1 flex-col gap-2">
                  <h6 class="font-bree">{{ slide.name }}</h6>

                  <div class="flex gap-2">
                    <LucideStar
                      v-for="star in 5"
                      :key="star"
                      class="stroke-primary size-4 stroke-1"
                      :class="star <= slide.grade ? 'fill-primary' : 'fill-transparent opacity-30'"
                    />
                  </div>
                </div>
              </div>

              <p class="font-bree">
                {{ slide.description }}
              </p>
            </div>
          </swiper-slide>
        </swiper-container>
      </ClientOnly>

      <button
        v-if="slides.length > 4"
        :disabled="isEnd"
        @click="swiper.next()"
        class="size-8 shrink-0 content-center rounded-full bg-stone-950 transition-opacity hover:cursor-pointer disabled:cursor-default disabled:opacity-30 md:size-12"
      >
        <LucideChevronRight
          class="mx-auto size-8 transition-colors"
          :class="isEnd ? 'stroke-white' : 'stroke-primary'"
        />
      </button>
    </div>
  </section>
</template>
