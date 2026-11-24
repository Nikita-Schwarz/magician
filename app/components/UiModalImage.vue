<!-- components/UiModalImage.vue -->
<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';

const store = useModalImageStore();
const { isOpen, src } = storeToRefs(store);
const { closeModalImage } = store;

const translateY = ref(0);
const opacity = ref(1);
let touchStartY = 0;
const swipeThreshold = 120;

const onTouchStart = (e: TouchEvent) => {
  if (e.touches.length > 0 && e.touches[0]) {
    touchStartY = e.touches[0].clientY;
  }
};

const onTouchMove = (e: TouchEvent) => {
  if (e.touches.length > 0 && e.touches[0]) {
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY;

    translateY.value = diff;
    const maxDrag = 250;
    opacity.value = Math.max(0.3, 1 - Math.abs(diff) / maxDrag);
  }
};

const onTouchEnd = () => {
  if (Math.abs(translateY.value) > swipeThreshold) {
    closeModalImage();
  }
  translateY.value = 0;
  opacity.value = 1;
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeModalImage();
};

onMounted(() => window.addEventListener('keydown', handleKeyDown));
onUnmounted(() => window.removeEventListener('keydown', handleKeyDown));

watch(isOpen, (newVal) => {
  if (newVal) {
    translateY.value = 0;
    opacity.value = 1;
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex touch-none items-center justify-center bg-black/95 backdrop-blur-md transition-colors duration-200 select-none"
        :style="{ backgroundColor: `rgba(0, 0, 0, ${0.95 * opacity})` }"
        @click="closeModalImage"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <!-- Кнопка ПК (крестик) -->
        <button
          @click.stop="closeModalImage"
          class="absolute top-6 right-6 z-50 hidden h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-zinc-800/50 text-white transition-colors hover:bg-zinc-700 active:scale-95 md:flex"
        >
          <svg
            xmlns="http://w3.org"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Индикатор мобильного свайпа -->
        <div
          class="pointer-events-none absolute top-4 right-0 left-0 flex flex-col items-center justify-center gap-1 opacity-40 md:hidden"
        >
          <div class="h-1 w-12 rounded-full bg-zinc-500"></div>
          <span class="text-[10px] tracking-widest text-zinc-400 uppercase"
            >тяните для закрытия</span
          >
        </div>

        <div
          class="relative flex max-h-full max-w-full cursor-default items-center justify-center p-4 will-change-transform"
          :style="{
            transform: `translateY(${translateY}px)`,
            transition: translateY === 0 ? 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none',
          }"
          @click.stop
        >
          <img
            :src="src"
            alt="Просмотр"
            class="pointer-events-none max-h-[82vh] max-w-full rounded-xl object-contain shadow-2xl md:max-h-[90vh]"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
