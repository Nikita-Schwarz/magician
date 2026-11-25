<script setup lang="ts">
const { pb, getFileUrl } = usePocketBase();
const containerRef = ref(null);
const modalStore = useModalImageStore();

const { data: slides } = await useAsyncData('gallery', async () => {
  try {
    const records = await pb.collection('gallery').getFullList({ sort: 'order' });
    return records.map((item) => ({
      id: item.id,
      image: getFileUrl(item, item.image),
      title: item.title,
      description: item.description,
    }));
  } catch {
    return [];
  }
});

const swiper = useSwiper(containerRef, {
  pagination: {
    el: '.custom-swiper-pagination',
    clickable: true,
  },
  slidesPerView: 1,
  centeredSlides: false,
  loop: (slides.value?.length ?? 0) >= 8,

  autoplay: {
    delay: 4000,
    disableOnInteraction: true,
    pauseOnMouseEnter: true,
  },

  breakpoints: {
    1024: {
      slidesPerView: 2,
      centeredSlides: true,
    },
    1280: {
      slidesPerView: 3,
      centeredSlides: true,
    },
  },
});

const handleSlideClick = (image: string, idx: number) => {
  const instance = swiper.instance.value;
  if (!instance) return;

  const isClickedSlideActive =
    instance.clickedSlide && instance.clickedSlide.classList.contains('swiper-slide-active');

  if (isClickedSlideActive) {
    modalStore.openModalImage(image);
  } else {
    instance.slideToLoop(idx);
  }
};
</script>

<template>
  <section v-if="slides?.length" class="container mx-auto mt-12 px-4">
    <h4 class="mb-12 text-center text-4xl font-bold text-stone-200">Магия в действии</h4>

    <ClientOnly>
      <swiper-container ref="containerRef" :init="false">
        <swiper-slide
          v-for="(slide, idx) in slides"
          :key="slide.id"
          class="photos"
          @click="handleSlideClick(slide.image, idx)"
        >
          <SliderMagicianCard v-bind="slide" />
        </swiper-slide>
      </swiper-container>
    </ClientOnly>

    <div class="custom-swiper-pagination mt-4 flex justify-center gap-2"></div>

    <p class="font-bree mt-10 text-center">Готовы удивить ваших гостей?</p>
  </section>
</template>

<style scoped>
.photos {
  transform: scale(0.9);
  opacity: 0.5;
  transition:
    transform 0.4s ease,
    opacity 0.4s ease;
}

.swiper-slide-nect {
  transform: scale(0.5);
}

.photos.swiper-slide-active {
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
