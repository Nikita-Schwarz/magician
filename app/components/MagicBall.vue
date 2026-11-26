<script setup lang="ts">
import IconTelegram from './icons/IconTelegram.vue';

const { pb } = usePocketBase();

// Запасной список предсказаний с макета
const fallbackPredictions = [
  '«Мои карты говорят: будет много смеха, аплодисментов и вопросов "Как он это сделал?!"»',
  '«Волшебный шар видит: кто-то из гостей обязательно спросит, не родственник ли я Гарри Поттеру»',
  '«Предсказание: после шоу как минимум 3 человека решат, что у них тоже есть магические способности»',
  '«Магия предсказывает: один из фокусов войдёт в семейные легенды и будет вспоминаться ещё 5 лет»',
  '«Шар шепчет: кто-то обязательно попросит "раскрой секрет хоть одного фокуса", но так и не узнает»',
  '«Прогноз: ваши гости забудут про телефоны на 45 минут (что в наше время — уже магия)»',
  '«Финальное предсказание: это будет не "ещё одно развлечение", а "то самое, что все запомнят"»',
  '«Шар предсказывает: будет момент, когда все гости одновременно скажут "ООООО!" — это бесплатно»',
  '«Шар показывает: 3 человека будут уверены, что видели подвох, но так и не поймут, в чём он»',
  '«Предсказание: количество "Как?!" и "Что?!" в минуту превысит все разумные пределы»',
  '«Шар шепчет: даже тот, кто "просто пришёл поесть", забудет про еду на 20 минут»',
];

const { data: predictions } = await useAsyncData('predictions', async () => {
  try {
    const records = await pb.collection('predictions').getFullList();
    return records.length ? records.map((r) => r.text) : fallbackPredictions;
  } catch {
    return fallbackPredictions;
  }
});

// Опционально: тянем ссылку на Telegram из коллекции contacts
const { data: telegramLink } = await useAsyncData('tg-contact', async () => {
  try {
    const record = await pb.collection('contacts').getFirstListItem('type="telegram"');
    return record?.href || 'https://t.me';
  } catch {
    return 'https://t.me';
  }
});

const STORAGE_KEY = 'magician_daily_prediction';
const DAY_MS = 24 * 60 * 60 * 1000;

const isAnimating = ref(false);
const currentPrediction = ref<string | null>(null);

// Проверяем, не получал ли пользователь предсказание за последние 24 часа
/* onMounted(() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as { text: string; timestamp: number };
      if (Date.now() - parsed.timestamp < DAY_MS && parsed.text) {
        currentPrediction.value = parsed.text;
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  } catch {
    // игнорируем ошибки доступа к localStorage
  }
}); */

// Координаты разлёта звёзд при «взрыве» шара
const burstStars = [
  { x: '-78px', y: '-54px', scale: 1.1, delay: '0ms' },
  { x: '82px', y: '-48px', scale: 0.9, delay: '40ms' },
  { x: '-90px', y: '18px', scale: 0.85, delay: '80ms' },
  { x: '88px', y: '24px', scale: 1.15, delay: '20ms' },
  { x: '-45px', y: '-82px', scale: 0.75, delay: '60ms' },
  { x: '48px', y: '-80px', scale: 1, delay: '90ms' },
  { x: '-55px', y: '68px', scale: 0.95, delay: '50ms' },
  { x: '60px', y: '64px', scale: 0.8, delay: '70ms' },
];

const handleBallClick = () => {
  // Блокируем повторный клик, если анимация идёт или предсказание на сегодня уже открыто
  if (isAnimating.value || currentPrediction.value) return;

  isAnimating.value = true;

  const list = predictions.value?.length ? predictions.value : fallbackPredictions;
  const randomIndex = Math.floor(Math.random() * list.length);
  const chosen = list[randomIndex];

  // Через 1.1 сек (после пика анимации) показываем текст справа и сохраняем на сутки
  setTimeout(() => {
    currentPrediction.value = chosen;
    isAnimating.value = false;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ text: chosen, timestamp: Date.now() }));
    } catch {
      // ignore
    }
  }, 1100);
};
</script>

<template>
  <section class="container mx-auto my-14 px-4">
    <div
      class="relative mx-auto grid max-w-5xl grid-cols-1 items-center gap-6 rounded-3xl px-4 py-10 md:grid-cols-[1fr_auto_1fr] md:gap-8"
    >
      <!-- 1. Левая колонка: постоянная плашка с призывом (прижата к шару) -->
      <div class="order-2 flex justify-center md:order-1 md:justify-end">
        <div
          class="font-bree max-w-64 rounded-xl bg-stone-200 px-4 py-3 text-center text-sm leading-snug text-green-950 shadow-lg md:text-left"
        >
          Нажмите на магический шар — узнайте предсказание для вашего мероприятия
        </div>
      </div>

      <!-- 2. Центральная колонка: шар (всегда строго по центру экрана) -->
      <div class="order-1 flex justify-center md:order-2">
        <button
          type="button"
          :disabled="isAnimating || Boolean(currentPrediction)"
          @click="handleBallClick"
          aria-label="Узнать предсказание магического шара"
          class="group relative flex size-36 shrink-0 items-center justify-center rounded-full focus:outline-none md:size-40"
          :class="
            currentPrediction
              ? 'cursor-default'
              : 'cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95'
          "
        >
          <!-- Внешнее пульсирующее сияние -->
          <span
            class="pointer-events-none absolute -inset-3 rounded-full bg-emerald-400/20 blur-xl transition-all duration-700"
            :class="{
              'scale-150 bg-emerald-300/60 blur-2xl': isAnimating,
              'bg-emerald-400/35': currentPrediction,
            }"
          />

          <!-- Звёзды-вспышки при клике -->
          <span
            v-for="(star, idx) in burstStars"
            :key="idx"
            class="burst-star pointer-events-none absolute text-amber-300"
            :class="{ 'is-bursting': isAnimating }"
            :style="{
              '--tx': star.x,
              '--ty': star.y,
              '--sc': star.scale,
              animationDelay: star.delay,
            }"
          >
            <svg
              class="size-5 fill-current drop-shadow-[0_0_6px_rgba(252,211,77,0.9)]"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
            </svg>
          </span>

          <!-- Декоративные постоянные звёздочки вокруг шара -->
          <svg
            class="pointer-events-none absolute -top-2 right-2 size-4 text-amber-300/80 transition-transform duration-700"
            :class="{ 'scale-125 rotate-180': isAnimating }"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M12 3L14 10L21 12L14 14L12 21L10 14L3 12L10 10L12 3Z" />
          </svg>
          <svg
            class="pointer-events-none absolute bottom-1 -left-2 size-5 text-amber-300/70 transition-transform duration-700"
            :class="{ 'scale-125 -rotate-180': isAnimating }"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M12 3L14 10L21 12L14 14L12 21L10 14L3 12L10 10L12 3Z" />
          </svg>
          <svg
            class="pointer-events-none absolute right-0 bottom-3 size-3.5 text-amber-300/75"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M12 3L14 10L21 12L14 14L12 21L10 14L3 12L10 10L12 3Z" />
          </svg>

          <!-- Сфера шара -->
          <span
            class="relative block size-full overflow-hidden rounded-full border border-emerald-300/30 bg-radial from-emerald-500 via-emerald-950 to-black shadow-[inset_0_-14px_26px_rgba(0,0,0,0.9),0_0_30px_rgba(16,185,129,0.25)]"
            :class="{ 'animate-ball-shake': isAnimating }"
          >
            <!-- Вращающийся внутренний туман/блеск -->
            <span
              class="inner-swirl pointer-events-none absolute -inset-4 opacity-80"
              :class="{ 'is-fast': isAnimating }"
            />

            <!-- Внутренние искры -->
            <span
              class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(167,243,208,0.55)_0%,transparent_45%),radial-gradient(circle_at_70%_65%,rgba(250,204,21,0.35)_0%,transparent_40%)] transition-transform duration-1000"
              :class="{ 'scale-125 rotate-180': isAnimating }"
            />

            <!-- Стеклянный блик сверху слева -->
            <span
              class="pointer-events-none absolute top-3 left-4 h-7 w-12 -rotate-35 rounded-full bg-linear-to-b from-white/55 to-transparent blur-[1px]"
            />
          </span>
        </button>
      </div>

      <!-- 3. Правая колонка: место всегда зарезервировано, ничего не прыгает -->
      <div class="order-3 flex min-h-44 items-center justify-center md:justify-start">
        <Transition
          enter-active-class="transition-all duration-500 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
        >
          <div v-if="currentPrediction" class="flex max-w-md flex-col items-center md:items-start">
            <!-- Карточка с выпавшим предсказанием -->
            <div
              class="font-bree rounded-xl bg-stone-200 px-5 py-3.5 text-base leading-snug text-green-950 shadow-lg md:text-lg"
            >
              {{ currentPrediction }}
            </div>

            <!-- Призыв и кнопка перехода в Telegram -->
            <div class="mt-4 flex flex-wrap items-center justify-center gap-4 md:justify-start">
              <span class="font-bree text-sm leading-tight text-stone-200">
                Проверим предсказание на<br />вашем празднике?
              </span>

              <a
                :href="telegramLink"
                target="_blank"
                rel="noopener noreferrer"
                class="bg-primary inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-black transition-transform hover:scale-105 hover:bg-amber-400"
              >
                <IconTelegram class="size-4 fill-black" />
                <span>Написать</span>
              </a>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Вращающийся внутренний вихрь/блеск внутри стеклянного шара */
.inner-swirl {
  background: conic-gradient(
    from 0deg,
    transparent 0%,
    rgba(52, 211, 153, 0.45) 25%,
    transparent 50%,
    rgba(250, 204, 21, 0.3) 75%,
    transparent 100%
  );
  border-radius: 9999px;
  filter: blur(8px);
  animation: swirl-spin 8s linear infinite;
}
.inner-swirl.is-fast {
  animation: swirl-spin 0.65s linear infinite;
  opacity: 1;
}
@keyframes swirl-spin {
  to {
    transform: rotate(360deg);
  }
}
/* Лёгкая дрожь шара во время зарядки */
@keyframes ball-shake {
  0%,
  100% {
    transform: scale(1) rotate(0deg);
  }
  25% {
    transform: scale(1.06) rotate(-4deg);
  }
  50% {
    transform: scale(1.08) rotate(4deg);
  }
  75% {
    transform: scale(1.05) rotate(-2deg);
  }
}
.animate-ball-shake {
  animation: ball-shake 0.55s ease-in-out 2;
}
/* Взрыв и разлёт звёзд при клике */
.burst-star {
  opacity: 0;
  transform: translate(0, 0) scale(0.2);
}
.burst-star.is-bursting {
  animation: star-burst 1.05s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes star-burst {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.2) rotate(0deg);
  }
  25% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(var(--tx), var(--ty)) scale(var(--sc)) rotate(160deg);
  }
}
</style>
