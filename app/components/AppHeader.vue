<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isOpen = ref(false);
const menuRef = ref<HTMLElement | null>(null);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const handleClickOutside = (event: MouseEvent) => {
  if (isOpen.value && menuRef.value && !menuRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <header
    ref="menuRef"
    class="relative z-40 container mx-auto flex h-14 items-center justify-between gap-4 px-4 text-white"
  >
    <NuxtImg src="/images/logoHeader.png" class="h-full" />

    <nav class="flex-1">
      <button
        @click="toggleMenu"
        class="relative z-30 ml-auto flex h-8 w-8 flex-col items-center justify-center space-y-1.5 lg:hidden"
        aria-label="Открыть меню"
      >
        <span
          class="block h-0.5 w-6 transform bg-current transition duration-300 ease-in-out"
          :class="{ 'translate-y-2 rotate-45': isOpen }"
        ></span>
        <span
          class="block h-0.5 w-6 bg-current transition duration-300 ease-in-out"
          :class="{ 'opacity-0': isOpen }"
        ></span>
        <span
          class="block h-0.5 w-6 transform bg-current transition duration-300 ease-in-out"
          :class="{ '-translate-y-2 -rotate-45': isOpen }"
        ></span>
      </button>

      <!-- Десктопное меню -->
      <div class="hidden h-full w-full lg:flex lg:flex-row lg:items-center lg:justify-between">
        <span></span>
        <ul class="flex gap-10">
          <li><a href="/home" class="hover:text-primary transition-colors">Мои работы</a></li>
          <li><a href="/catalog" class="hover:text-primary transition-colors">Отзывы</a></li>
          <li><a href="/about" class="hover:text-primary transition-colors">Вопросы</a></li>
          <li><a href="/contacts" class="hover:text-primary transition-colors">Контакты</a></li>
          <li>
            <a href="/contacts" class="hover:text-primary transition-colors">Узнать будущее</a>
          </li>
        </ul>
        <button
          class="bg-primary cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-amber-400"
        >
          Обсудить мероприятие
        </button>
      </div>

      <Transition name="menu-fade">
        <ul
          v-if="isOpen"
          class="absolute top-14 right-4 z-10 flex w-1/2 flex-col rounded-2xl border border-stone-800 bg-stone-950 p-4 md:hidden"
        >
          <li>
            <a
              href="/home"
              @click="isOpen = false"
              class="hover:text-primary block py-2 transition-colors"
              >Мои работы</a
            >
          </li>
          <li>
            <a
              href="/catalog"
              @click="isOpen = false"
              class="hover:text-primary block py-2 transition-colors"
              >Отзывы</a
            >
          </li>
          <li>
            <a
              href="/about"
              @click="isOpen = false"
              class="hover:text-primary block py-2 transition-colors"
              >Вопросы</a
            >
          </li>
          <li>
            <a
              href="/contacts"
              @click="isOpen = false"
              class="hover:text-primary block py-2 transition-colors"
              >Контакты</a
            >
          </li>
          <li>
            <a
              href="/contacts"
              @click="isOpen = false"
              class="hover:text-primary block py-2 transition-colors"
              >Узнать будущее</a
            >
          </li>
        </ul>
      </Transition>
    </nav>
  </header>
</template>

<style scoped>
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
