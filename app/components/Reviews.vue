<script setup lang="ts">
const { pb, getFileUrl } = usePocketBase();
const containerRef = ref(null);

const { data: slides } = await useAsyncData('reviews', async () => {
  try {
    const records = await pb.collection('reviews').getFullList({ sort: 'order,-created' });
    return records.map((item) => ({
      id: item.id,
      avatar: item.avatar ? getFileUrl(item, item.avatar, '150x150') : null,
      grade: item.grade || 5,
      name: item.name,
      description: item.description,
      link: item.link || '',
    }));
  } catch {
    return [];
  }
});

const getSourceLabel = (url: string) => {
  if (url.includes('avito.ru')) return 'Отзыв на Авито';
  if (url.includes('vk.com')) return 'Отзыв во ВКонтакте';
  if (url.includes('yandex.')) return 'Отзыв на Яндекс';
  if (url.includes('2gis.')) return 'Отзыв в 2ГИС';
  return 'Оригинал отзыва';
};

const slidesCount = computed(() => slides.value?.length ?? 0);

const isBeginning = ref(true);
const isEnd = ref(false);

const swiper = useSwiper(containerRef, {
  centeredSlides: false,
  spaceBetween: 32,
  slidesPerView: 1,
  autoHeight: true,
  watchOverflow: true,

  breakpoints: {
    1024: {
      slidesPerView: Math.min(slidesCount.value, 2) || 1,
      spaceBetween: 48,
    },
    1280: {
      slidesPerView: Math.min(slidesCount.value, 4) || 1,
      spaceBetween: 48,
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
    breakpoint(s) {
      isBeginning.value = s.isBeginning;
      isEnd.value = s.isEnd;
    },
  },
});
</script>

<template>
  <section v-if="slidesCount" class="container mx-auto mt-6 px-4">
    <h4 class="text-stone mb-12 text-center text-4xl font-bold">Мои отзывы</h4>

    <div class="flex items-center justify-center gap-2 md:gap-8">
      <button
        v-if="slidesCount > 4"
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
        <swiper-container
          ref="containerRef"
          :init="false"
          class="w-full min-w-0"
          :class="{
            'max-w-xs': slidesCount === 1,
            'max-w-2xl': slidesCount === 2,
            'max-w-5xl': slidesCount === 3,
          }"
        >
          <swiper-slide v-for="slide in slides" :key="slide.id">
            <div
              class="border-border mx-auto flex h-full max-w-2xs flex-col justify-between rounded-2xl border-2 bg-black p-4"
            >
              <div>
                <div class="mb-4 flex gap-4">
                  <img
                    v-if="slide.avatar"
                    :src="slide.avatar"
                    :alt="slide.name"
                    class="size-15 rounded-full object-cover"
                  />
                  <div
                    v-else
                    class="bg-foreground flex size-15 items-center justify-center rounded-full"
                  >
                    <LucideUserRound class="size-10 rounded-full stroke-stone-500 object-cover" />
                  </div>

                  <div class="flex flex-1 flex-col gap-2">
                    <h6 class="font-bree">{{ slide.name }}</h6>

                    <div class="flex gap-2">
                      <LucideStar
                        v-for="star in 5"
                        :key="star"
                        class="stroke-primary size-4 stroke-1"
                        :class="
                          star <= slide.grade ? 'fill-primary' : 'fill-transparent opacity-30'
                        "
                      />
                    </div>
                  </div>
                </div>

                <p class="font-bree">
                  {{ slide.description }}
                </p>
              </div>

              <!-- Ссылка на источник (показывается только если заполнена в админке) -->
              <a
                v-if="slide.link"
                :href="slide.link"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary mt-4 inline-flex max-w-max items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
              >
                <span>{{ getSourceLabel(slide.link) }}</span>
                <LucideExternalLink class="size-3.5" />
              </a>
            </div>
          </swiper-slide>
        </swiper-container>
      </ClientOnly>

      <button
        v-if="slidesCount > 4"
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
