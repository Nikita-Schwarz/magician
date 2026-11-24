<script lang="ts" setup>
interface FaqItem {
  isOpen: boolean;
  question: string;
  answer: string;
}

const columns = ref<FaqItem[]>([
  {
    isOpen: true,
    question: 'Сколько длится ваше выступление?',
    answer: 'Длительность моего выступления занимает <strong>30-40</strong> минут',
  },
  {
    isOpen: true,
    question: 'Какое пространство/оборудование вам нужно?',
    answer: 'Из оборудования мне потребуется только небольшой стол',
  },
  {
    isOpen: true,
    question: 'Вовлекаете ли вы зрителей в фокусы?',
    answer:
      'Да, конечно. Любой зритель может поучаствовать в моей программе, многим хочется испытать магию на себе',
  },
  {
    isOpen: true,
    question: 'Какая стоимость выступления?',
    answer: '<strong>8 000 рублей</strong> + расходы на дорогу',
  },
  {
    isOpen: true,
    question: 'Есть ли возрастные ограничения?',
    answer: 'Ограничений нет, но если это детский праздник, то программа обговаривается заранее',
  },
  {
    isOpen: true,
    question: 'Нужна ли предоплата?',
    answer: 'Только в период сезонных заказов',
  },
  {
    isOpen: true,
    question: 'Нужно ли нам как-то готовиться к вашему выступлению?',
    answer: 'Единственная подготовка - взять с собой хорошее настроение и готовность удивляться',
  },
  {
    isOpen: true,
    question: 'Можете ли вы включить в шоу персональные моменты (для именинника, молодоженов)?',
    answer: 'Да, это можно все включить, обговаривается заранее',
  },
]);

const half = computed(() => Math.ceil(columns.value.length / 2));
const leftColumn = computed(() => columns.value.slice(0, half.value));
const rightColumn = computed(() => columns.value.slice(half.value));

// Плавная анимация высоты для аккордеона
const onEnter = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = '0';
  void element.offsetHeight;
  element.style.height = `${element.scrollHeight}px`;
};

const onAfterEnter = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = 'auto';
};

const onLeave = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = `${element.scrollHeight}px`;
  void element.offsetHeight;
  element.style.height = '0';
};
</script>

<template>
  <section class="container mx-auto mt-6 px-4">
    <h4 class="text-stone mb-12 text-center text-4xl font-bold">Частые вопросы</h4>

    <div class="grid grid-cols-1 items-start gap-x-16 gap-y-10 md:grid-cols-2">
      <div
        v-for="(col, colIdx) in [leftColumn, rightColumn]"
        :key="colIdx"
        class="flex flex-col gap-y-10"
      >
        <div v-for="(item, idx) in col" :key="idx">
          <button
            @click="item.isOpen = !item.isOpen"
            class="font-bree flex w-full items-center gap-4 pb-4 text-left"
          >
            <LucideChevronDown
              :class="item.isOpen ? 'rotate-180' : ''"
              class="stroke-primary size-8 shrink-0 transition-transform"
            />
            <span class="text-2xl font-medium">{{ item.question }}</span>
          </button>

          <Transition
            name="accordion"
            @enter="onEnter"
            @after-enter="onAfterEnter"
            @leave="onLeave"
          >
            <div
              v-show="item.isOpen"
              class="overflow-hidden transition-[height] duration-300 ease-in-out"
            >
              <div class="font-bree rounded-lg bg-stone-200 px-4 py-2 text-xl text-green-950">
                <p v-html="item.answer"></p>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>
