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
  <!-- Добавлен ref="menuRef" на родительский контейнер -->
  <header ref="menuRef" class="sticky top-0 right-0 left-0 z-20 h-14 bg-stone-950 text-white">
    <nav class="container mx-auto h-full px-4">
      <div class="flex h-full w-full items-center justify-end">
        <!-- Кнопка бургер-меню (видима только на мобильных) -->
        <button
          @click="toggleMenu"
          class="relative z-30 flex h-8 w-8 flex-col items-center justify-center space-y-1.5 md:hidden"
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
        <ul class="hidden h-full w-full md:flex md:flex-row md:items-center md:justify-between">
          <li><a href="/home" class="hover:text-primary transition-colors">Мои работы</a></li>
          <li><a href="/catalog" class="hover:text-primary transition-colors">Отзывы</a></li>
          <li><a href="/about" class="hover:text-primary transition-colors">Вопросы</a></li>
          <li><a href="/contacts" class="hover:text-primary transition-colors">Контакты</a></li>
          <li>
            <a href="/contacts" class="hover:text-primary transition-colors">Узнать будущее</a>
          </li>
        </ul>

        <Transition name="menu-fade">
          <ul
            v-if="isOpen"
            class="absolute top-14 left-0 z-10 flex w-full flex-col border-t border-stone-800 bg-stone-950 p-4 md:hidden"
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
      </div>
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
